/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/adminAuth';
import { getWindowsCredential, fetchUserEmail, refreshAccessToken } from '@/lib/antigravityPool';

export async function POST(req: Request) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  try {
    console.log('Attempting to import active Windows credentials...');
    const credJsonStr = await getWindowsCredential();
    if (!credJsonStr) {
      return NextResponse.json(
        { error: '未在 Windows 凭据管理器中找到 "gemini:antigravity" 凭据。请确保您已登录。' },
        { status: 404 }
      );
    }

    let credData: any;
    try {
      credData = JSON.parse(credJsonStr);
    } catch {
      return NextResponse.json(
        { error: '解析凭据 JSON 失败。' },
        { status: 500 }
      );
    }

    const refreshToken = credData?.token?.refresh_token;
    if (!refreshToken) {
      return NextResponse.json(
        { error: '凭据中未找到 refresh_token。' },
        { status: 400 }
      );
    }

    // Resolve email dynamically
    let email = 'unknown@gmail.com';
    try {
      const { access_token } = await refreshAccessToken(refreshToken);
      email = await fetchUserEmail(access_token);
    } catch (emailErr: any) {
      console.warn('Failed to dynamically resolve email for imported credentials:', emailErr.message);
    }

    // Check if account already exists
    const existing = await prisma.account.findFirst({
      where: { refreshToken },
    });

    if (existing) {
      return NextResponse.json({
        success: true,
        message: '凭据已存在于数据库中',
        account: {
          id: existing.id,
          name: existing.name,
          email: existing.email,
          status: existing.status,
        }
      });
    }

    // Create new account entry
    const name = email !== 'unknown@gmail.com' ? `Keyring Account (${email.split('@')[0]})` : 'Imported Keyring Account';
    const account = await prisma.account.create({
      data: {
        name,
        email,
        refreshToken,
        status: 'active',
      }
    });

    return NextResponse.json({
      success: true,
      message: '凭据成功导入！',
      account: {
        id: account.id,
        name: account.name,
        email: account.email,
        status: account.status,
      }
    });
  } catch (error) {
    console.error('Failed to import local credential:', error);
    const message = error instanceof Error ? error.message : 'Import failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

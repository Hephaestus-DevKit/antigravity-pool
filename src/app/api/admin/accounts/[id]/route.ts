/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/adminAuth';
import { fetchUserEmail, refreshAccessToken } from '@/lib/antigravityPool';

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;
    if (id === 'fallback-ai-studio') {
      return NextResponse.json({ error: 'System fallback account cannot be deleted.' }, { status: 403 });
    }
    await prisma.account.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting account:', error);
    const message = error instanceof Error ? error.message : 'Failed to delete account';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  try {
    const { id } = await params;
    if (id === 'fallback-ai-studio') {
      return NextResponse.json({ error: 'System fallback account cannot be modified.' }, { status: 403 });
    }
    const body = await req.json();
    const name = typeof body.name === 'string' ? body.name.trim() : undefined;
    const refreshToken = typeof body.refreshToken === 'string' ? body.refreshToken.trim() : undefined;
    const status = typeof body.status === 'string' ? body.status.trim() : undefined;

    const data: any = {};
    if (name !== undefined) data.name = name;
    if (status !== undefined) data.status = status;

    if (refreshToken !== undefined && refreshToken !== '') {
      data.refreshToken = refreshToken;
      try {
        console.log(`Resolving email dynamically for updated refresh token...`);
        const { access_token } = await refreshAccessToken(refreshToken);
        data.email = await fetchUserEmail(access_token);
        console.log(`Resolved email: ${data.email}`);
      } catch (err: any) {
        console.warn('Failed to dynamically fetch email from updated refresh token:', err.message);
      }
    }

    const updated = await prisma.account.update({
      where: { id },
      data,
    });

    return NextResponse.json({
      id: updated.id,
      name: updated.name,
      email: updated.email,
      status: updated.status,
      lastUsed: updated.lastUsed.toISOString(),
      usageCount: updated.usageCount,
      hasRefreshToken: !!updated.refreshToken,
      quotaStatus: updated.quotaStatus,
      quotaResetAt: updated.quotaResetAt ? updated.quotaResetAt.toISOString() : null,
      quotaMessage: updated.quotaMessage,
      quotaCheckedAt: updated.quotaCheckedAt ? updated.quotaCheckedAt.toISOString() : null,
      leaseUntil: updated.leaseUntil ? updated.leaseUntil.toISOString() : null,
    });
  } catch (error) {
    console.error('Error updating account:', error);
    const message = error instanceof Error ? error.message : 'Failed to update account';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

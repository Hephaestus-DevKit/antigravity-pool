import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/adminAuth';

export async function GET(req: Request) {
  const unauthorized = requireAdmin(req);
  if (unauthorized) return unauthorized;

  try {
    const logs = await prisma.requestLog.findMany({
      orderBy: { timestamp: 'desc' },
      take: 10,
      include: {
        account: {
          select: { name: true }
        }
      }
    });

    const normalized = logs.map((log) => ({
      id: log.id,
      accountId: log.accountId,
      model: log.model,
      statusCode: log.statusCode,
      latency: log.latency,
      promptTokens: log.promptTokens,
      completionTokens: log.completionTokens,
      error: log.error,
      timestamp: log.timestamp.toISOString(),
      account: log.account,
    }));

    return NextResponse.json(normalized);
  } catch (error) {
    console.error('Error fetching logs:', error);
    return NextResponse.json({ error: 'Failed to fetch logs' }, { status: 500 });
  }
}

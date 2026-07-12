import { NextResponse } from 'next/server';

/**
 * A deliberately unauthenticated liveness endpoint for container orchestrators.
 * It must not expose account, quota, or configuration data.
 */
export function GET() {
  return NextResponse.json({ status: 'ok' });
}

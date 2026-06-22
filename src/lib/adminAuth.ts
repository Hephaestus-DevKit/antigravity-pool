import { NextResponse } from 'next/server';

const LOCALHOST_HOSTNAMES = new Set([
  'localhost',
  '127.0.0.1',
  '[::1]',
  '::1',
  '[::]',
]);

function isLocalhost(req: Request): boolean {
  try {
    const url = new URL(req.url);
    const clientIp = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '';
    // If a forwarding header exists and doesn't point to loopback, it's not a local connection
    const isLocalIp = !clientIp || clientIp === '127.0.0.1' || clientIp === '::1' || clientIp === '::ffff:127.0.0.1';
    return LOCALHOST_HOSTNAMES.has(url.hostname) && isLocalIp;
  } catch {
    return true;
  }
}

export function requireAdmin(req: Request): NextResponse | null {
  // Unconditional localhost bypass for local developer convenience
  if (isLocalhost(req)) return null;

  const token = process.env.ADMIN_TOKEN;
  if (!token) {
    return NextResponse.json(
      { error: 'Set ADMIN_TOKEN to enable remote admin access' },
      { status: 401 }
    );
  }

  const auth = req.headers.get('authorization') || '';
  const bearer = auth.toLowerCase().startsWith('bearer ') ? auth.slice(7) : '';
  const headerToken = req.headers.get('x-antigravity-pool-token') || req.headers.get('x-codex-pool-token') || '';

  if (bearer === token || headerToken === token) return null;

  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

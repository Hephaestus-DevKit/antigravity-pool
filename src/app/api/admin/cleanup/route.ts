import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const { spawn } = await import('child_process');
    const child = spawn('node', ['scripts/clean-cache.js'], {
      cwd: process.cwd(),
      detached: true,
      stdio: 'pipe',
    });

    // Don't wait for completion; return immediately
    setTimeout(() => {
      child.unref(); // Allow parent to exit without waiting
    }, 100);

    return NextResponse.json(
      {
        status: 'cleanup_started',
        message: 'Cache cleanup script initiated. Check /var/log/codex-clean.log for progress.',
        startedAt: new Date().toISOString(),
      },
      { status: 202 } // 202 Accepted (async operation)
    );
  } catch (error) {
    console.error('Cleanup error:', error);
    return NextResponse.json(
      { error: 'Failed to start cleanup', details: String(error) },
      { status: 500 }
    );
  }
}

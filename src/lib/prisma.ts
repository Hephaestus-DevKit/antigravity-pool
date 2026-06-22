/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Auto-seed and configure SQLite for concurrency
if (typeof window === 'undefined') {
  // Optimize SQLite journal mode and busy timeout for concurrent access
  prisma.$queryRawUnsafe('PRAGMA journal_mode=WAL;').catch((err) => {
    console.warn('[Prisma] Failed to enable WAL mode:', err.message);
  });
  prisma.$queryRawUnsafe('PRAGMA busy_timeout=5000;').catch((err) => {
    console.warn('[Prisma] Failed to set busy_timeout:', err.message);
  });

  prisma.account.count().then(async (count) => {
    if (count === 0) {
      console.log('[Antigravity Pool] Database is empty. Attempting auto-seeding from local keyring...');
      try {
        const { getWindowsCredential, fetchUserEmail, refreshAccessToken } = await import('./antigravityPool');
        const credJsonStr = await getWindowsCredential();
        if (credJsonStr) {
          const credData = JSON.parse(credJsonStr);
          const refreshToken = credData?.token?.refresh_token;
          if (refreshToken) {
            let email = 'unknown@gmail.com';
            try {
              const { access_token } = await refreshAccessToken(refreshToken);
              email = await fetchUserEmail(access_token);
            } catch (err: any) {
              console.warn('[Antigravity Pool] Auto-seed userinfo resolve failed:', err.message);
            }
            const name = email !== 'unknown@gmail.com' ? `Keyring Account (${email.split('@')[0]})` : 'Imported Keyring Account';
            await prisma.account.create({
              data: {
                name,
                email,
                refreshToken,
                status: 'active',
              }
            });
            console.log(`[Antigravity Pool] ✅ Auto-seeded active account successfully: ${email}`);
          }
        } else {
          console.log('[Antigravity Pool] No active keyring credentials found to auto-seed.');
        }
      } catch (err) {
        console.error('[Antigravity Pool] Failed to auto-seed database:', err);
      }
    }
  }).catch((err) => {
    console.error('[Antigravity Pool] Database count query failed:', err);
  });
}

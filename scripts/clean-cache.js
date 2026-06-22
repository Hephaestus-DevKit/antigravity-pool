#!/usr/bin/env node
/**
 * Clean up Next.js build cache and temporary logs to reclaim disk space
 * Run: npm run clean:cache
 */

const fs = require('fs').promises;
const path = require('path');

const NEXT_CACHE_DIR = path.resolve(process.cwd(), '.next', 'cache');
const SCRATCH_DIR = path.resolve(process.cwd(), 'scratch');

async function getDirSize(dirPath) {
  let size = 0;
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      if (entry.isDirectory()) {
        size += await getDirSize(fullPath);
      } else {
        const stat = await fs.stat(fullPath);
        size += stat.size;
      }
    }
  } catch {}
  return size;
}

async function main() {
  console.log('🧹 Cleaning Antigravity Pool cache and temp files...\n');

  // 1. Clean Next.js build cache
  let nextCacheCleaned = false;
  try {
    const size = await getDirSize(NEXT_CACHE_DIR);
    if (size > 0) {
      await fs.rm(NEXT_CACHE_DIR, { recursive: true, force: true });
      nextCacheCleaned = true;
      console.log(`  ✓ Removed .next/cache (~${(size / 1024 / 1024).toFixed(1)}MB)`);
    } else {
      console.log('  - Next.js build cache is empty.');
    }
  } catch (err) {
    console.log('  - Next.js build cache directory does not exist.');
  }

  // 2. Clean scratch scripts/files older than 7 days
  let scratchCleaned = 0;
  const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
  try {
    const entries = await fs.readdir(SCRATCH_DIR, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isFile() && entry.name.endsWith('.js')) {
        const fullPath = path.join(SCRATCH_DIR, entry.name);
        const stat = await fs.stat(fullPath);
        if (Date.now() - stat.mtimeMs > MAX_AGE_MS) {
          await fs.rm(fullPath);
          scratchCleaned++;
          console.log(`  ✓ Removed old scratch script: ${entry.name}`);
        }
      }
    }
  } catch (err) {
    // Scratch dir doesn't exist
  }

  console.log(`\n📊 Summary:`);
  console.log(`   - Next.js build cache cleaned: ${nextCacheCleaned ? 'Yes' : 'No'}`);
  console.log(`   - Old scratch files cleaned: ${scratchCleaned}`);
  console.log(`\n✨ Done!`);
}

main().catch(console.error);

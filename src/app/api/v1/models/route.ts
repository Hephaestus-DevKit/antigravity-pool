import { NextResponse } from 'next/server';
import { MODEL_MAP } from '@/lib/antigravityPool';

export async function GET() {
  const models = Object.keys(MODEL_MAP).map((modelId) => ({
    id: modelId,
    object: 'model',
    created: Math.floor(Date.now() / 1000),
    owned_by: 'google-companion-pool',
    context_length: modelId.includes('pro') || modelId.includes('sonnet') || modelId.includes('opus') ? 1048576 : 1048576,
  }));

  return NextResponse.json({
    object: 'list',
    data: models,
  });
}

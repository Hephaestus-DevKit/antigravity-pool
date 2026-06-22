import { NextResponse } from 'next/server';
import { MODEL_MAP } from '@/lib/antigravityPool';

export async function GET(_req: Request, { params }: { params: Promise<{ model: string }> }) {
  const { model } = await params;

  if (!MODEL_MAP[model] && !Object.values(MODEL_MAP).includes(model)) {
    return NextResponse.json({ error: { message: `Model '${model}' not found`, type: 'invalid_request_error' } }, { status: 404 });
  }

  return NextResponse.json({
    id: model,
    object: 'model',
    created: Math.floor(Date.now() / 1000),
    owned_by: 'google-companion-pool',
    context_length: model.includes('pro') || model.includes('sonnet') || model.includes('opus') ? 1048576 : 1048576,
  });
}

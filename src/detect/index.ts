import { contentTypeInferrer } from './contentType.ts';
import { extensionInferrer }   from './extension.ts';
import type { Ctx, MediaDescriptor } from '../types.ts';

const inferrers = [contentTypeInferrer, extensionInferrer];

export function runInfer(ctx: Ctx): MediaDescriptor {
  for (const infer of inferrers) {
    const result = infer(ctx);
    if (result) return result;
  }
  return { type: 'buffer', mime: ctx.headers['content-type'] ?? '', subtype: '' };
}

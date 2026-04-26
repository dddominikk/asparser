import { buildCtx } from './ctx.ts';
import { resolve }   from './registry.ts';
import type { Ctx }  from '../types.ts';

export class ResponseError extends Error {
  constructor(public readonly ctx: Ctx) {
    super(`HTTP ${ctx.status} for ${ctx.url.href}`);
  }
}

export class NoHandlerError extends Error {
  constructor(public readonly ctx: Ctx) {
    super(`No entry for ${ctx.url.href} (${ctx.media?.mime ?? 'unknown'})`);
  }
}

export async function readRemote(
  url: string,
  { fetch: _fetch = fetch }: { fetch?: typeof fetch } = {}
): Promise<unknown> {
  const response = await _fetch(url);
  const ctx      = buildCtx(response, url);

  if (!ctx.ok) throw new ResponseError(ctx);

  const entry = ctx.media ? resolve(ctx.media.type) : undefined;
  if (!entry) throw new NoHandlerError(ctx);

  if (ctx.media!.type === 'buffer') {
    return (entry.parser as (r: Response) => Promise<ArrayBuffer>)(response);
  }

  let text = await response.text();
  for (const proc of entry.processors) text = proc(text);
  return (entry.parser as (t: string) => unknown)(text);
}

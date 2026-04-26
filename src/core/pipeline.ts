import { resolve } from './registry.ts';
import type { Ctx } from '../types.ts';

function buildCtx(response: Response, url: string): Ctx {
  const headers  = Object.fromEntries(response.headers.entries());
  const urlObj   = new URL(url);
  const rawCt    = headers['content-type'] ?? '';
  const mime     = rawCt.split(';')[0].trim();
  return {
    url:      urlObj,
    headers,
    mime,
    ext:      urlObj.pathname.match(/\.[^./]+$/)?.[0] ?? '',
    status:   response.status,
    ok:       response.ok,
    response,
  };
}

export class ResponseError extends Error {
  constructor(public readonly ctx: Ctx) {
    super(`HTTP ${ctx.status} for ${ctx.url.href}`);
  }
}

export class NoHandlerError extends Error {
  constructor(public readonly ctx: Ctx) {
    super(`No plugin matched for ${ctx.url.href} (mime: ${ctx.mime || 'none'}, ext: ${ctx.ext || 'none'})`);
  }
}

export async function readRemote(
  url: string,
  { fetch: _fetch = fetch }: { fetch?: typeof fetch } = {}
): Promise<unknown> {
  const response = await _fetch(url);
  const ctx      = buildCtx(response, url);

  if (!ctx.ok) throw new ResponseError(ctx);

  const plugin = resolve(ctx);
  if (!plugin) throw new NoHandlerError(ctx);

  if (plugin.mediaType === 'buffer') {
    return (plugin.parser as (r: Response) => Promise<ArrayBuffer>)(response);
  }

  let text = await response.text();
  for (const proc of plugin.processors) text = proc(text);
  return (plugin.parser as (t: string) => unknown)(text);
}

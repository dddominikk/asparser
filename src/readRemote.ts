import { resolve } from './registry.ts';
import { parseContentType } from './contentType.ts';
import type { Ctx } from './types.ts';

export class ResponseError extends Error {
  constructor(public readonly ctx: Ctx) {
    super(`HTTP ${ctx.status} for ${ctx.url.href}`);
  }
}

export class NoHandlerError extends Error {
  constructor(public readonly ctx: Ctx) {
    super(`No handler matched for ${ctx.url.href} (${ctx.contentType.mime})`);
  }
}

export async function readRemote(
  url: string,
  { fetch: _fetch = fetch }: { fetch?: typeof fetch } = {}
): Promise<unknown> {
  const response = await _fetch(url);
  const headers  = Object.fromEntries(response.headers.entries());

  const ctx: Ctx = {
    url:         new URL(url),
    headers,
    contentType: parseContentType(headers['content-type']),
    ext:         new URL(url).pathname.match(/\.[^.]+$/)?.[0] ?? '',
    status:      response.status,
    ok:          response.ok,
    response,
  };

  if (!ctx.ok) throw new ResponseError(ctx);

  const handler = resolve(ctx);
  if (!handler) throw new NoHandlerError(ctx);

  return handler.parse(response, ctx);
}

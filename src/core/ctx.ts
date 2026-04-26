import { runInfer } from '../detect/index.ts';
import type { Ctx }  from '../types.ts';

export function buildCtx(response: Response, url: string): Ctx {
  const headers = Object.fromEntries(response.headers.entries());
  const urlObj  = new URL(url);
  const partial: Ctx = {
    url:      urlObj,
    headers,
    media:    null,
    ext:      urlObj.pathname.match(/\.[^.]+$/)?.[0] ?? '',
    status:   response.status,
    ok:       response.ok,
    response,
  };
  partial.media = runInfer(partial);
  return partial;
}

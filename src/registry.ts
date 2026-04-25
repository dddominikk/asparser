import type { Ctx, Handler, MatchFn, ParseFn } from './types.ts';

const handlers: Handler[] = [];

export function register<T>(name: string, match: MatchFn, parse: ParseFn<T>): void {
  handlers.push({ name, match, parse } as Handler);
}

export function deregister(name: string): void {
  const i = handlers.findIndex(h => h.name === name);
  if (i !== -1) handlers.splice(i, 1);
}

export function resolve(ctx: Ctx): Handler | undefined {
  return handlers.find(h => h.match(ctx));
}

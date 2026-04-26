import type { Ctx, Plugin } from '../types.ts';

const plugins = new Map<string, Plugin>();

export function use(plugin: Plugin): void  { plugins.set(plugin.name, plugin); }
export function remove(name: string): void { plugins.delete(name); }

export function resolve(ctx: Ctx): Plugin | undefined {
  for (const p of plugins.values())
    if (ctx.mime && p.mimes.includes(ctx.mime)) return p;

  for (const p of plugins.values())
    for (const m of p.mimes)
      if (m.endsWith('/*') && ctx.mime.startsWith(m.slice(0, -1))) return p;

  for (const p of plugins.values())
    if (ctx.ext && p.extensions.includes(ctx.ext)) return p;

  for (const p of plugins.values())
    if (p.mediaType === 'buffer') return p;
}

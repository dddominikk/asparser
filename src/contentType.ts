import type { ParsedContentType } from './types.ts';

export function parseContentType(raw = ''): ParsedContentType {
  const [mime = '', ...rest] = raw.split(';');
  const [type = '', subtype = ''] = mime.trim().split('/');
  const params = Object.fromEntries(
    rest.flatMap(p => {
      const [k, v] = p.trim().split('=');
      return k ? [[k.trim(), (v ?? '').trim()]] : [];
    })
  );
  return { mime: mime.trim(), type, subtype, params };
}

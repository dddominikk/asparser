import type { Inferrer, MediaDescriptor, ParsedContentType } from '../types.ts';

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

const OBJECT_MIMES = new Set([
  'application/json',
  'application/jsonc',
  'application/ld+json',
  'application/geo+json',
]);

export const contentTypeInferrer: Inferrer = (ctx): MediaDescriptor | null => {
  const ct = parseContentType(ctx.headers['content-type']);
  if (!ct.mime) return null;
  if (OBJECT_MIMES.has(ct.mime) || ct.subtype === 'json') {
    return { type: 'object', mime: ct.mime, subtype: ct.subtype };
  }
  if (ct.type === 'text') {
    return { type: 'string', mime: ct.mime, subtype: ct.subtype };
  }
  return null;
};

import type { Inferrer, MediaDescriptor, MediaType } from '../types.ts';

const EXT_MAP: Record<string, MediaType> = {
  '.json':  'object',
  '.jsonc': 'object',
  '.txt':   'string',
  '.md':    'string',
  '.csv':   'string',
  '.tsv':   'string',
  '.xml':   'string',
};

export const extensionInferrer: Inferrer = (ctx): MediaDescriptor | null => {
  const type = EXT_MAP[ctx.ext];
  if (!type) return null;
  return { type, mime: '', subtype: ctx.ext.slice(1) };
};

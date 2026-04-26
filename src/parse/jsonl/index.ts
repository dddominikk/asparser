import type { Plugin } from '../../types.ts';

export const jsonl: Plugin<'object'> = {
  name:       'jsonl',
  mediaType:  'object',
  mimes:      ['application/jsonl', 'application/x-ndjson'],
  extensions: ['.jsonl', '.ndjson'],
  processors: [],
  parser:     (text) => `${text}`.split(/\n+/).flatMap((line) => JSON.parse(`${line}`.trim())) as object,
};

export default jsonl;

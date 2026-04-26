import type { Plugin } from '../../types.ts';

export const text: Plugin<'string'> = {
  name:       'text',
  mediaType:  'string',
  mimes:      ['text/*'],
  extensions: ['.txt', '.md', '.csv', '.tsv', '.xml'],
  processors: [],
  parser:     (t) => t,
};

export default text;

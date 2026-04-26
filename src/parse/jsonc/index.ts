import { stripComments } from '../../process/stripComments.ts';
import type { Plugin }   from '../../types.ts';

export const jsonc: Plugin<'object'> = {
  name:       'jsonc',
  mediaType:  'object',
  mimes:      ['application/jsonc'],
  extensions: ['.jsonc'],
  processors: [stripComments],
  parser:     (text) => JSON.parse(text) as object,
};

export default jsonc;

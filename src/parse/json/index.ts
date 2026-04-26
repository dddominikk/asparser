import type { Plugin } from '../../types.ts';

export const json: Plugin<'object'> = {
  name:       'json',
  mediaType:  'object',
  mimes:      ['application/json', 'application/ld+json', 'application/geo+json'],
  extensions: ['.json'],
  processors: [],
  parser:     (text) => JSON.parse(text) as object,
};

export default json;

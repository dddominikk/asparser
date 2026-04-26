import type { Plugin } from '../../types.ts';

export const binary: Plugin<'buffer'> = {
  name:       'binary',
  mediaType:  'buffer',
  mimes:      [],
  extensions: [],
  processors: [],
  parser:     (r) => r.arrayBuffer(),
};

export default binary;

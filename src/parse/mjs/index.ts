import type { Plugin } from '../../types.ts';

export const mjs: Plugin<'object'> = {
  name:       'mjs',
  mediaType:  'object',
  mimes:      ['text/javascript', 'application/javascript'],
  extensions: ['.mjs', '.js'],
  processors: [],
  parser:     (text) =>
    import(`data:application/javascript;base64,${btoa(unescape(encodeURIComponent(text)))}`),
};

export default mjs;

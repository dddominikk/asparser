import type { MatchFn, ParseFn } from '../types.ts';

export const name = 'text';

export const match: MatchFn = ({ contentType, ext }) =>
  contentType.type === 'text' ||
  ['.txt', '.md', '.csv', '.tsv', '.xml'].includes(ext);

export const parse: ParseFn<string> = (response) => response.text();

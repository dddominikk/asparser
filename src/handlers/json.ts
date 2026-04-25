import type { MatchFn, ParseFn } from '../types.ts';

export const name = 'json';

export const match: MatchFn = ({ contentType, ext }) =>
  contentType.mime === 'application/json' ||
  contentType.subtype === 'json' ||
  ext === '.json';

export const parse: ParseFn = (response) => response.json();

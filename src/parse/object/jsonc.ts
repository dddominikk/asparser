import type { Parser } from '../../types.ts';

export const parse: Parser<'object'> = (text) => JSON.parse(text) as object;

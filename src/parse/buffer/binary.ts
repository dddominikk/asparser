import type { Parser } from '../../types.ts';

export const parse: Parser<'buffer'> = (response) => response.arrayBuffer();

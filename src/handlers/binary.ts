import type { MatchFn, ParseFn } from '../types.ts';

export const name = 'binary';

export const match: MatchFn = () => true;

export const parse: ParseFn<ArrayBuffer> = (response) => response.arrayBuffer();

import type { Processor } from '../types.ts';

export const stripComments: Processor = (body) =>
  body
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/[^\r\n]*/g, '');

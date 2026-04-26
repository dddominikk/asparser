import { readRemote }  from './core/pipeline.ts';
import { use, remove } from './core/registry.ts';

export function createFrp() {
  return { readRemote, use, remove };
}

export type { Ctx, MediaType, Plugin, Processor, Parser, ParserResult } from './types.ts';

import { readRemote } from './core/pipeline.ts';
import { register, deregister } from './core/registry.ts';

export function createFrp() {
  return { readRemote, register, deregister };
}

export type {
  Ctx,
  MediaDescriptor,
  MediaType,
  Entry,
  Inferrer,
  Processor,
  Parser,
  ParserResult,
} from './types.ts';

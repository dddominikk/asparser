import { register } from './registry.ts';
import * as json   from './handlers/json.ts';
import * as text   from './handlers/text.ts';
import * as binary from './handlers/binary.ts';

register(json.name,   json.match,   json.parse);
register(text.name,   text.match,   text.parse);
register(binary.name, binary.match, binary.parse);

export { readRemote, ResponseError, NoHandlerError } from './readRemote.ts';
export { register, deregister } from './registry.ts';
export type { Ctx, Handler, ParsedContentType } from './types.ts';

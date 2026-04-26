import { createFrp }             from './index.ts';
import { parse as parseJson }    from './parse/object/json.ts';
import { parse as parseText }    from './parse/string/text.ts';
import { parse as parseBinary }  from './parse/buffer/binary.ts';
import { stripComments }         from './process/stripComments.ts';

const frp = createFrp();

// stripComments is a no-op on plain JSON; enables .jsonc / JSON-with-comments support
frp.register('object', { processors: [stripComments], parser: parseJson });
frp.register('string', { processors: [],              parser: parseText });
frp.register('buffer', { processors: [],              parser: parseBinary });

export const { readRemote, register, deregister } = frp;
export default frp;

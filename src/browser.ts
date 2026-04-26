import { createFrp } from './index.ts';
import { json }       from './parse/json/index.ts';
import { jsonl }      from './parse/jsonl/index.ts';
import { text }       from './parse/text/index.ts';
import { binary }     from './parse/binary/index.ts';

const frp = createFrp();
[json, jsonl, text, binary].forEach(p => frp.use(p));

export const { readRemote, use, remove } = frp;
export default frp;

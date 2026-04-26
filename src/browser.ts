import { Parse, binary } from "./core/loadParsers.ts";
import { createFrp } from "./index.ts";

const frp = createFrp();
[Parse.json, Parse.jsonl, Parse.text, binary].forEach((p) => frp.use(p));

export const { readRemote, use, remove } = frp;
export default frp;

import { readdirSync }    from 'node:fs';
import { fileURLToPath }  from 'node:url';
import { join, dirname }  from 'node:path';
import { createFrp }      from './index.ts';
import type { Plugin }    from './types.ts';

const frp = createFrp();

const parseDir = join(dirname(fileURLToPath(import.meta.url)), 'parse');
const dirs     = readdirSync(parseDir, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

const plugins = await Promise.all(
  dirs.map(d => import(`./parse/${d}/index.ts`).then((m: { default: Plugin }) => m.default))
);

plugins.forEach(p => frp.use(p));

export const { readRemote, use, remove } = frp;
export default frp;

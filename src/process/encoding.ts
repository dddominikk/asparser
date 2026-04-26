const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
const NOT_BASE64 = /[^A-Z0-9+/=]/i;

export function isBase64(str: string, { maxSafety = false } = {}): boolean {
  if (typeof str !== 'string') return false;
  const len = str.length;
  if (!len || len % 4 !== 0 || NOT_BASE64.test(str)) return false;

  const pad = str.indexOf('=');
  if (pad !== -1 && pad !== len - 1 && !(pad === len - 2 && str[len - 1] === '='))
    return false;

  if (maxSafety)
    try { return btoa(atob(str)) === str; } catch { return false; }

  return true;
}

export function toBase64(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let out = '';
  for (let i = 0; i < bytes.length; i += 3) {
    const b1 = bytes[i];
    const b2 = bytes[i + 1];
    const b3 = bytes[i + 2];
    out += ALPHABET[b1 >> 2];
    out += ALPHABET[((b1 & 3) << 4) | ((b2 ?? 0) >> 4)];
    out += b2 === undefined ? '=' : ALPHABET[((b2 & 15) << 2) | ((b3 ?? 0) >> 6)];
    out += b3 === undefined ? '=' : ALPHABET[b3 & 63];
  }
  return out;
}

export function fromBase64(str: string): string {
  const clean = str.replace(/[^A-Za-z0-9+/=]/g, '');
  if (clean.length % 4 !== 0) throw new Error('Invalid Base64 string length.');

  const bytes: number[] = [];
  for (let i = 0; i < clean.length; i += 4) {
    const e1 = ALPHABET.indexOf(clean[i]);
    const e2 = ALPHABET.indexOf(clean[i + 1]);
    const e3 = clean[i + 2] === '=' ? 0 : ALPHABET.indexOf(clean[i + 2]);
    const e4 = clean[i + 3] === '=' ? 0 : ALPHABET.indexOf(clean[i + 3]);

    if (e1 < 0 || e2 < 0 || (clean[i + 2] !== '=' && e3 < 0) || (clean[i + 3] !== '=' && e4 < 0))
      throw new Error('Invalid Base64 character.');

    bytes.push((e1 << 2) | (e2 >> 4));
    if (clean[i + 2] !== '=') bytes.push(((e2 & 15) << 4) | (e3 >> 2));
    if (clean[i + 3] !== '=') bytes.push(((e3 & 3) << 6) | e4);
  }
  return new TextDecoder('utf-8', { fatal: true }).decode(new Uint8Array(bytes));
}

export function decodeEncoding(text: string): string {
  if (isBase64(text)) return fromBase64(text);
  return text;
}

export type Encoding = 'utf8' | 'base64';

export function prepare(text: string, { encoding }: { encoding?: Encoding } = {}): string {
  if (encoding === 'base64') return fromBase64(text);
  if (encoding === 'utf8')   return text;
  // auto-detect: base64 blobs decode, plain text (json, html, etc.) passes through
  return decodeEncoding(text);
}

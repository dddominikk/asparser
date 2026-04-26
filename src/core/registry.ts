import type { MediaType, Entry } from '../types.ts';

const entries = new Map<MediaType, Entry>();

export function register<K extends MediaType>(type: K, entry: Entry<K>): void {
  entries.set(type, entry as Entry);
}

export function deregister(type: MediaType): void {
  entries.delete(type);
}

export function resolve(type: MediaType): Entry | undefined {
  return entries.get(type);
}

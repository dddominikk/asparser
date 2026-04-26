export type MediaType = 'object' | 'string' | 'buffer';

export type ParserResult = { object: object; string: string; buffer: ArrayBuffer };

export interface MediaDescriptor {
  type:    MediaType;
  mime:    string;
  subtype: string;
}

export interface ParsedContentType {
  mime:    string;
  type:    string;
  subtype: string;
  params:  Record<string, string>;
}

export interface Ctx {
  url:      URL;
  headers:  Record<string, string>;
  media:    MediaDescriptor | null;
  ext:      string;
  status:   number;
  ok:       boolean;
  response: Response;
}

export type Inferrer  = (ctx: Ctx) => MediaDescriptor | null;
export type Processor = (body: string) => string;
export type Parser<K extends MediaType = MediaType> =
  K extends 'buffer'
    ? (response: Response) => Promise<ArrayBuffer>
    : (text: string) => ParserResult[K] | Promise<ParserResult[K]>;

export interface Entry<K extends MediaType = MediaType> {
  processors: Processor[];
  parser:     Parser<K>;
}

export type MediaType = 'object' | 'string' | 'buffer';

export type ParserResult = { object: object; string: string; buffer: ArrayBuffer };

export interface Ctx {
  url:      URL;
  headers:  Record<string, string>;
  mime:     string;
  ext:      string;
  status:   number;
  ok:       boolean;
  response: Response;
}

export type Processor = (body: string) => string;

export type Parser<K extends MediaType = MediaType> =
  K extends 'buffer'
    ? (response: Response) => Promise<ArrayBuffer>
    : (text: string) => ParserResult[K] | Promise<ParserResult[K]>;

export interface Plugin<K extends MediaType = MediaType> {
  name:       string;
  mediaType:  K;
  mimes:      string[];
  extensions: string[];
  processors: Processor[];
  parser:     Parser<K>;
}

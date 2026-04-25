export interface ParsedContentType {
  mime:    string;
  type:    string;
  subtype: string;
  params:  Record<string, string>;
}

export interface Ctx {
  url:         URL;
  headers:     Record<string, string>;
  contentType: ParsedContentType;
  ext:         string;
  status:      number;
  ok:          boolean;
  response:    Response;
}

export type MatchFn = (ctx: Ctx) => boolean;
export type ParseFn<T = unknown> = (response: Response, ctx: Ctx) => Promise<T>;

export interface Handler<T = unknown> {
  name:  string;
  match: MatchFn;
  parse: ParseFn<T>;
}

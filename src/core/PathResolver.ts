export type PathInput = { path: string };

export type ResolvedPath<R = string> = {
  raw:  R;
  path: string;
};

export type ResolveFn<R = string>   = (path: string) => Promise<R>;
export type TransformFn<R = string> = (raw: R, path: string) => R | Promise<R>;

export class PathResolver<R = string> {
  readonly name: string;
  private readonly _resolve:   ResolveFn<R>;
  private readonly _transform: TransformFn<R> | undefined;

  constructor(name: string, resolve: ResolveFn<R>, transform?: TransformFn<R>) {
    this.name       = name;
    this._resolve   = resolve;
    this._transform = transform;
  }

  async resolvePath(input: PathInput): Promise<ResolvedPath<R>> {
    const resolved = await this._resolve(input.path);
    const raw      = this._transform
      ? await this._transform(resolved, input.path)
      : resolved;
    return { raw, path: input.path };
  }

  resolvePaths(...inputs: PathInput[]): Promise<ResolvedPath<R>>[] {
    return inputs.map((input) => this.resolvePath(input));
  }
}

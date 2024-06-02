// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parse<T = any>(json: string): T {
  return JSON.parse(json) as T;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function body<T = any>(response: Response): Promise<T> {
  return response.json() as Promise<T>;
}

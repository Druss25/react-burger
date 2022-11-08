export class HttpError extends Error {
  response: Response;

  constructor(response: Response) {
    const { status, statusText } = response;

    super(statusText || String(status));

    this.name = "HttpError";
    this.response = response;
  }
}

async function _fetch<T>(path: string, config: RequestInit): Promise<T> {
  const request = new Request(path, config);
  const response = await fetch(request);

  if (!response.ok && response.status !== 403) {
    throw new HttpError(response);
  }

  return response.json().catch(() => ({}));
}

export async function get<T>(path: string, config?: RequestInit): Promise<T> {
  const init = { method: "get", ...config };
  return await _fetch<T>(path, init);
}

export async function post<T, U>(
  path: string,
  body: T,
  config?: RequestInit
): Promise<U> {
  const init = { method: "post", body: JSON.stringify(body), ...config };
  return await _fetch<U>(path, init);
}

export async function put<T, U>(
  path: string,
  body: T,
  config?: RequestInit
): Promise<U> {
  const init = { method: "put", body: JSON.stringify(body), ...config };
  return await _fetch<U>(path, init);
}

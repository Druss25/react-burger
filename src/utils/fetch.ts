import { baseUrl } from './constants'

async function _api<T>(path: string, config: RequestInit): Promise<T> {
  const url = baseUrl + path
  const request = new Request(url, config)
  const response = await fetch(request)

  if (!response.ok) {
    throw new Error('Что-то пошло не так !')
  }

  return response.json().catch(() => ({}))
}

export async function get<T>(path: string, config?: RequestInit): Promise<T> {
  const init = { method: 'GET', ...config }
  return await _api<T>(path, init)
}

export async function post<T>(path: string, config?: RequestInit): Promise<T> {
  const init = { method: 'POST', ...config }
  return await _api<T>(path, init)
}

export async function patch<T, U>(path: string, body: T, config?: RequestInit): Promise<U> {
  const init = { method: 'PATCH', body: JSON.stringify(body), ...config }
  return await _api<U>(path, init)
}

import { useCallback, useEffect, useRef } from 'react'

export const CONNECTING = 'CONNECTING'
export const OPEN = 'OPEN'
export const CLOSING = 'CLOSING'
export const CLOSED = 'CLOSED'

export const socketStates = {
  0: CONNECTING,
  1: OPEN,
  2: CLOSING,
  3: CLOSED,
}

export const useSocket = (url: string, options: any) => {
  const ws = useRef<WebSocket | null>(null)

  const connect = useCallback(
    (token: string | null) => {
      const fullUrl = token === null ? `${url}` : `${url}?token=${token}`

      ws.current = new WebSocket(fullUrl)

      ws.current.onmessage = event => {
        if (typeof options.onMessage === 'function') {
          options.onMessage(event)
        }
      }

      ws.current.onopen = event => {
        if (typeof options.onConnect === 'function') {
          options.onConnect(event)
        }
      }

      ws.current.onerror = event => {
        if (typeof options.onError === 'function') {
          options.onError(event)
        }
      }

      ws.current.onclose = event => {
        if (typeof options.onDisconnect === 'function') {
          options.onDisconnect(event)
        }
      }
    },
    [url, options],
  )

  useEffect(() => {
    if (ws.current) {
      if (typeof options.onMessage === 'function') {
        ws.current.onmessage = options.onMessage
      }

      if (typeof options.onConnect === 'function') {
        ws.current.onopen = options.onConnect
      }
      if (typeof options.onError === 'function') {
        ws.current.onerror = options.onError
      }
      if (typeof options.onDisconnect === 'function') {
        ws.current.onclose = options.onDisconnect
      }
    }
  }, [options, ws])

  useEffect(() => {
    return () => {
      if (ws.current && typeof ws.current.close === 'function') {
        ws.current.close()
      }
    }
  }, [])

  const sendData = useCallback(
    (message: any) => {
      ws.current?.send(JSON.stringify(message))
    },
    [ws],
  )

  return { connect, sendData }
}

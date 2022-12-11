import { AnyAction, Dispatch, MiddlewareAPI } from 'redux'

type TwsAction = {
  [key: string]: string
}

export const authSocketMiddleware = (wsUrl: string, wsActions: TwsAction) => {
  return (store: MiddlewareAPI<Dispatch>) => {
    let socket: WebSocket | null = null

    return (next: Dispatch) => (action: AnyAction) => {
      const { dispatch, getState } = store
      const { isAuth } = getState().auth

      const { type } = action
      const { wsInit, wsClose, onOpen, onClose, onError, onMessage } = wsActions
      if (type === wsInit && isAuth) {
        const getToken = localStorage.getItem('accessToken') as string
        const token = getToken.split(' ')[1].trim()
        socket = new WebSocket(`${wsUrl}?token=${token}`)
      }

      if (type === wsClose) {
        socket?.close()
      }

      if (socket) {
        socket.onopen = (event: Event) => {
          dispatch({ type: onOpen, payload: event })
        }

        socket.onerror = (event: Event) => {
          dispatch({ type: onError, payload: event })
        }

        socket.onmessage = (event: MessageEvent) => {
          const { data } = event
          const parsedData = JSON.parse(data)
          const { success, ...restParsedData } = parsedData
          dispatch({ type: onMessage, payload: restParsedData })
        }

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event })
        }
      }

      next(action)
    }
  }
}

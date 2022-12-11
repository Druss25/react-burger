import { AnyAction } from 'redux'

type TwsAction = {
  [key: string]: string
}

export const authSocketMiddleware = (wsUrl: string, wsActions: TwsAction) => {
  return (store: any) => {
    let socket: WebSocket | null = null

    return (next: any) => (action: AnyAction) => {
      const { dispatch, getState } = store
      const { isAuth } = getState().auth

      const { type } = action
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions
      if (type === wsInit && isAuth) {
        const getToken = localStorage.getItem('accessToken') as string
        const token = getToken.split(' ')[1].trim()
        socket = new WebSocket(`${wsUrl}?token=${token}`)
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

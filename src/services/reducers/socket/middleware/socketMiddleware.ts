import { AnyAction } from 'redux'

type TwsAction = {
  [key: string]: string
}

export const socketMiddleware = (wsUrl: string, wsActions: TwsAction) => {
  return (store: any) => {
    let socket: WebSocket | null = null

    return (next: any) => (action: AnyAction) => {
      const {
        dispatch,
        // getState
      } = store
      // const { isAuth } = getState().auth
      // console.log(isAuth)
      const { type } = action
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions
      if (type === wsInit) {
        // socket = new WebSocket(`${wsUrl}?token=${user.token}`)
        socket = new WebSocket(wsUrl)
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

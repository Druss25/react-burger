import { AnyAction, Dispatch } from 'redux'

type TwsAction = {
  [key: string]: string
}

type IState = {
  dispatch: Dispatch<AnyAction>
}

export const socketMiddleware = (wsUrl: string, wsActions: TwsAction) => {
  return (store: IState) => {
    let socket: WebSocket | null = null
    let isConnect = false

    return (next: Dispatch) => (action: AnyAction) => {
      const { dispatch } = store
      const { type } = action
      const { wsInit, wsClose, onOpen, onClose, onError, onMessage } = wsActions

      if (type === wsInit && !isConnect) {
        isConnect = true
        socket = new WebSocket(wsUrl)
      }

      if (type === wsClose) {
        socket?.close()
        isConnect = false
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

        socket.onclose = (event: Event) => {
          if (isConnect) isConnect = false
          dispatch({ type: onClose, payload: event })
        }
      }

      next(action)
    }
  }
}

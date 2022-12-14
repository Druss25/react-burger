export const WS_CONNECTION_START = 'WS_CONNECTION_START'
export const WS_CONNECTION_STOP = 'WS_CONNECTION_STOP'
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS'
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR'
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED'
export const WS_GET_MESSAGE = 'WS_GET_MESSAGE'

export const wsOrderActions = {
  wsInit: WS_CONNECTION_START,
  wsClose: WS_CONNECTION_STOP,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
}

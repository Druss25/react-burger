import { AnyAction, applyMiddleware, legacy_createStore as createStore } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import rootReducer from './rootReducer'
import { socketMiddleware } from './../reducers/socket/middleware/socketMiddleware'
import { authSocketMiddleware } from '../reducers/socket/middleware/authSocketMiddleware'

import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from '../reducers/socket/orders/wsActionsTypes'

import {
  WS_AUTH_CONNECTION_CLOSED,
  WS_AUTH_CONNECTION_ERROR,
  WS_AUTH_CONNECTION_START,
  WS_AUTH_CONNECTION_SUCCESS,
  WS_AUTH_GET_MESSAGE,
} from '../reducers/socket/history/wsActionsTypes'

const wsOrderUrl = 'wss://norma.nomoreparties.space/orders/all'
const wsHistoryUrl = 'wss://norma.nomoreparties.space/orders'

const wsOrderActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
}

const wsHistoryActions = {
  wsInit: WS_AUTH_CONNECTION_START,
  onOpen: WS_AUTH_CONNECTION_SUCCESS,
  onClose: WS_AUTH_CONNECTION_CLOSED,
  onError: WS_AUTH_CONNECTION_ERROR,
  onMessage: WS_AUTH_GET_MESSAGE,
}

const initialStore = {}

export const store = createStore(
  rootReducer,
  initialStore,
  composeWithDevTools(
    applyMiddleware(
      thunk,
      socketMiddleware(wsOrderUrl, wsOrderActions),
      authSocketMiddleware(wsHistoryUrl, wsHistoryActions),
    ),
  ),
)
export type AppDispatch = typeof store.dispatch
export type ReduxState = ReturnType<typeof rootReducer>
export type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>
export type TypedThunk<ReturnType = void> = ThunkAction<ReturnType, ReduxState, unknown, AnyAction>
export const useAppDispatch = () => useDispatch<TypedDispatch>()
export const useAppSelector: TypedUseSelectorHook<ReduxState> = useSelector

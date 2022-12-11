import { AnyAction, applyMiddleware, legacy_createStore as createStore } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension'
import thunk, { ThunkAction, ThunkDispatch, ThunkMiddleware } from 'redux-thunk'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import rootReducer from './rootReducer'
import { socketMiddleware } from './../reducers/socket/middleware/socketMiddleware'
import { authSocketMiddleware } from '../reducers/socket/middleware/authSocketMiddleware'
import { wsOrderActions } from '../reducers/socket/orders/wsActionsTypes'
import { wsHistoryActions } from '../reducers/socket/history/wsActionsTypes'
import { wsHistoryUrl, wsOrderUrl } from '../../utils/constants'

const initialStore = {}

export const store = createStore(
  rootReducer,
  initialStore,
  composeWithDevTools(
    applyMiddleware(
      thunk as ThunkMiddleware<ReduxState>,
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

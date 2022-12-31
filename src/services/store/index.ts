import { applyMiddleware, legacy_createStore as createStore } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension'
import thunk, { ThunkMiddleware } from 'redux-thunk'
import { ReduxState, rootReducer } from './rootReducer'
import { socketMiddleware } from './../reducers/socket/middleware/socketMiddleware'
import { authSocketMiddleware } from '../reducers/socket/middleware/authSocketMiddleware'
import { wsOrderActions } from '../reducers/socket/orders/wsActionsTypes'
import { wsHistoryActions } from '../reducers/socket/history/wsActionsTypes'
import { wsHistoryUrl, wsOrderUrl } from '../../utils/constants'

export const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(
    applyMiddleware(
      thunk as ThunkMiddleware<ReduxState>,
      socketMiddleware(wsOrderUrl, wsOrderActions),
      authSocketMiddleware(wsHistoryUrl, wsHistoryActions),
    ),
  ),
)

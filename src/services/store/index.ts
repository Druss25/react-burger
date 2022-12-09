import { AnyAction, applyMiddleware, legacy_createStore as createStore } from 'redux'
import { composeWithDevTools } from '@redux-devtools/extension'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import rootReducer from './rootReducer'

const initialStore = {}

export const store = createStore(
  rootReducer,
  initialStore,
  composeWithDevTools(applyMiddleware(thunk)),
)
export type AppDispatch = typeof store.dispatch
export type ReduxState = ReturnType<typeof rootReducer>
export type TypedDispatch = ThunkDispatch<ReduxState, any, AnyAction>
export type TypedThunk<ReturnType = void> = ThunkAction<ReturnType, ReduxState, unknown, AnyAction>
export const useAppDispatch = () => useDispatch<TypedDispatch>()
export const useAppSelector: TypedUseSelectorHook<ReduxState> = useSelector

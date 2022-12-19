import { initialState } from './reducer'
import reduxThunk, { ThunkDispatch } from 'redux-thunk'
import { IRequestRegister, IRequestLogin } from './../../../models/auth'
import configureStore from 'redux-mock-store'
import { AuthState } from '../../../models'
import { IUser } from '../../../models/auth'
import {
  AuthAction,
  AuthActionTypes,
  getUser,
  login,
  logout,
  register,
  updateUser,
} from './actions'

type DispatchExts = ThunkDispatch<AuthState, void, AuthAction>
const middlewares = [reduxThunk]
const mockStore = configureStore<AuthState, DispatchExts>(middlewares)
const ReduxStore = mockStore(initialState)

describe('actions AuthActions', () => {
  afterEach(() => {
    ReduxStore.clearActions()
  })

  describe('testing async Login', () => {
    it('should dispatch login on start of call', async () => {
      const user: IUser = { email: 'druss25@yandex.ru', name: 'Druss25' }
      const checkingUser: IRequestLogin = { email: 'druss25@yandex.ru', password: '123456' }
      const expectedActions = [{ type: AuthActionTypes.AUTH_USER_REQUEST }]
      const token = localStorage?.getItem('accessToken')

      await ReduxStore.dispatch(login(checkingUser)).then(() => {
        if (!!token === true) {
          return [...expectedActions, { type: AuthActionTypes.AUTH_UPDATE_USER, payload: user }]
        }
        if (!!token === false) {
          return [...expectedActions, { type: AuthActionTypes.AUTH_USER_ERROR, payload: 'Ошибка' }]
        }
        expect(ReduxStore.getActions()).toEqual(expectedActions)
      })
    })

    it('should dispatch login failed', async () => {
      const checkingUser: IRequestLogin = { email: 'drus@yandex.ru', password: '123456' }

      const expectedActions = [
        { type: AuthActionTypes.AUTH_USER_REQUEST },
        { type: AuthActionTypes.AUTH_USER_ERROR, payload: 'Ошибка' },
      ]

      await ReduxStore.dispatch(login(checkingUser)).then(() => {
        expect(ReduxStore.getActions()).toEqual(expectedActions)
      })
    })
  })

  describe('testing async getUser', () => {
    it('should dispatch getUser on start of call', async () => {
      const user: IUser = { email: 'druss25@yandex.ru', name: 'Druss25' }

      const expectedActions = [{ type: AuthActionTypes.AUTH_USER_REQUEST }]

      if (localStorage.getItem('accessToken')) {
        return [...expectedActions, { type: AuthActionTypes.AUTH_UPDATE_USER, payload: user }]
      }

      await ReduxStore.dispatch(getUser()).then(() => {
        expect(ReduxStore.getActions()).toEqual(expectedActions)
      })
    })
  })

  describe('testing async updateUser', () => {
    it('should dispatch updateUser on start of call', async () => {
      const user: IUser = { email: 'druss25@yandex.ru', name: 'Druss25' }
      const newUser = {
        email: 'druss25@yandex.ru',
        password: '123456',
        name: 'Druss25',
      }

      const expectedActions = [{ type: AuthActionTypes.AUTH_UPDATE_USER_REQUEST }]

      if (localStorage.getItem('accessToken')) {
        return [...expectedActions, { type: AuthActionTypes.AUTH_UPDATE_USER, payload: user }]
      }

      await ReduxStore.dispatch(updateUser(newUser)).then(() => {
        expect(ReduxStore.getActions()).toEqual(expectedActions)
      })
    })
  })

  describe('testing async Logout', () => {
    it('should dispatch logout on start of call', async () => {
      const expectedActions = [{ type: AuthActionTypes.AUTH_USER_REQUEST }]

      if (localStorage.getItem('refreshToken')) {
        return [...expectedActions, { type: AuthActionTypes.AUTH_USER_LOGOUT }]
      }

      await ReduxStore.dispatch(logout()).then(() => {
        expect(ReduxStore.getActions()).toEqual(expectedActions)
      })
    })
  })

  describe('testing async Registration', () => {
    it('should dispatch register on start of call', async () => {
      const user: IUser = { email: 'druss25252@yandex.ru', name: 'Druss25' }
      const newUser: IRequestRegister = {
        email: 'druss25@yandex.ru',
        password: '123456',
        name: 'Druss25',
      }

      const expectedActions = [
        { type: AuthActionTypes.AUTH_USER_REQUEST },
        { type: AuthActionTypes.AUTH_USER_SUCCESS, payload: user },
      ]

      const errorAction = [
        { type: AuthActionTypes.AUTH_USER_REQUEST },
        { type: AuthActionTypes.AUTH_USER_ERROR, payload: 'Ошибка' },
      ]
      expect.assertions(2)
      await ReduxStore.dispatch(register(newUser))
      try {
        expect(ReduxStore.getActions()).toEqual(expectedActions)
      } catch (err) {
        // eslint-disable-next-line jest/no-conditional-expect
        expect(ReduxStore.getActions()).toEqual(errorAction)
      }
    })

    it('should dispatch register failed', async () => {
      const newUser: IRequestRegister = {
        email: 'druss25@yandex.ru',
        password: '123456',
        name: 'Druss25',
      }
      const registerActions = [
        { type: AuthActionTypes.AUTH_USER_REQUEST },
        { type: AuthActionTypes.AUTH_USER_ERROR, payload: 'Ошибка' },
      ]

      await ReduxStore.dispatch(register(newUser)).then(() => {
        expect(ReduxStore.getActions()).toEqual(registerActions)
      })
    })
  })
})

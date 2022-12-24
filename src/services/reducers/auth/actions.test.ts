import thunk, { ThunkDispatch } from 'redux-thunk'
import configureStore from 'redux-mock-store'
import fetchMock from 'jest-fetch-mock'
import { initialState } from './reducer'
import { AuthState } from '../../../models'
import {
  AuthAction,
  AuthActionTypes,
  forgotPassword,
  login,
  logout,
  register,
  resetPassword,
  updateUser,
} from './actions'
import { IRequestLogin } from '../../../models/auth'
import { removeTokens, saveTokens } from '../../../utils/api'

fetchMock.enableMocks()

type DispatchExts = ThunkDispatch<AuthState, void, AuthAction>
const mockStore = configureStore<AuthState, DispatchExts>([thunk])
const store = mockStore(initialState)

const responseData = {
  success: true,
  accessToken:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjc3NDExOWI1MThhMDAxYmI3ZGMyYSIsImlhdCI6MTY3MTg1ODk3OSwiZXhwIjoxNjcxODYwMTc5fQ.NfZ_7IVLo8T2xj-HrN3QT9YKHZjXwsu1kngCDjrNg7g',
  refreshToken: '320fd59c2a49fe76f6790ea1483441b9d2c5740e893e8f7e23995ed2d74d4c745fd644464082e1dd',
  user: {
    email: 'druss25@yandex.ru',
    name: 'Druss25',
  },
}

describe('actions Auth', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })

  afterEach(() => {
    store.clearActions()
    jest.restoreAllMocks()
  })

  describe('testing Login', () => {
    it('should dispatch Login success', async () => {
      const checkingUser: IRequestLogin = { email: 'druss25@yandex.ru', password: '123456' }
      const accessToken = responseData.accessToken
      const refreshToken = responseData.refreshToken
      const savedTokens = jest.fn((accessToken: string, refreshToken: string) =>
        saveTokens(accessToken, refreshToken),
      )
      const expectedActions = [
        { type: AuthActionTypes.AUTH_USER_REQUEST },
        { type: AuthActionTypes.AUTH_USER_SUCCESS, payload: responseData.user },
      ]

      fetchMock.mockResponseOnce(JSON.stringify(responseData))

      return await store.dispatch(login(checkingUser)).then(() => {
        savedTokens(accessToken, refreshToken)
        expect(store.getActions()).toEqual(expectedActions)
      })
    })

    it('should dispatch Login failed', async () => {
      const checkingUser: IRequestLogin = { email: 'druss25@yandex.ru', password: '12345678' }
      const expectedActions = [
        { type: AuthActionTypes.AUTH_USER_REQUEST },
        { type: AuthActionTypes.AUTH_USER_ERROR, payload: 'Неверное имя или пароль' },
      ]

      fetchMock.mockResponseOnce(JSON.stringify({ success: false }))

      return await store.dispatch(login(checkingUser)).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })
  })

  describe('testing Registration', () => {
    it('should dispatch Register success', async () => {
      const fakeData = { email: '', name: '', password: '' }
      const accessToken = responseData.accessToken
      const refreshToken = responseData.refreshToken
      const savedTokens = jest.fn((accessToken: string, refreshToken: string) =>
        saveTokens(accessToken, refreshToken),
      )
      const expectedActions = [
        { type: AuthActionTypes.AUTH_USER_REQUEST },
        { type: AuthActionTypes.AUTH_USER_SUCCESS, payload: responseData.user },
      ]

      fetchMock.mockResponseOnce(JSON.stringify(responseData))

      return await store.dispatch(register(fakeData)).then(() => {
        savedTokens(accessToken, refreshToken)
        expect(store.getActions()).toEqual(expectedActions)
      })
    })

    it('should dispatch Register failed', async () => {
      const fakeData = { email: '', name: '', password: '' }
      const expectedActions = [
        { type: AuthActionTypes.AUTH_USER_REQUEST },
        { type: AuthActionTypes.AUTH_USER_ERROR, payload: 'Что-то пошло не так' },
      ]

      fetchMock.mockResponseOnce(JSON.stringify({ success: false }))

      return await store.dispatch(register(fakeData)).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })
  })

  describe('testing Logout', () => {
    it('should dispatch Logout success', async () => {
      const removedTokens = jest.fn(() => removeTokens())
      const expectedActions = [
        { type: AuthActionTypes.AUTH_USER_REQUEST },
        { type: AuthActionTypes.AUTH_USER_LOGOUT },
      ]

      fetchMock.mockResponseOnce(JSON.stringify({ success: true }))

      return await store.dispatch(logout()).then(() => {
        removedTokens()
        expect(store.getActions()).toEqual(expectedActions)
      })
    })

    it('should dispatch Logout failed', async () => {
      const expectedActions = [{ type: AuthActionTypes.AUTH_USER_REQUEST }]

      fetchMock.mockResponseOnce(JSON.stringify({ success: false }))

      return await store.dispatch(logout()).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })
  })

  describe('testing updateUser', () => {
    it('should dispatch updateUser success', async () => {
      const fakeData = { email: '', name: '' }
      const expectedActions = [
        { type: AuthActionTypes.AUTH_UPDATE_USER_REQUEST },
        { type: AuthActionTypes.AUTH_UPDATE_USER, payload: responseData.user },
      ]

      fetchMock.mockResponseOnce(JSON.stringify(responseData))

      return await store.dispatch(updateUser(fakeData)).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })

    it('should dispatch updateUser failed', async () => {
      const fakeData = { email: '', name: '' }
      const expectedActions = [{ type: AuthActionTypes.AUTH_UPDATE_USER_REQUEST }]

      fetchMock.mockResponseOnce(JSON.stringify({ success: false }))

      return await store.dispatch(updateUser(fakeData)).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })
  })

  describe('testing ResetPassword', () => {
    it('should dispatch resetPassword success', async () => {
      const fakeData = { email: '' }
      const expectedActions = [
        { type: AuthActionTypes.AUTH_USER_REQUEST },
        { type: AuthActionTypes.AUTH_RESET_PASSWORD },
      ]

      fetchMock.mockResponseOnce(JSON.stringify({ success: true }))

      return await store.dispatch(resetPassword(fakeData)).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })

    it('should dispatch resetPassword failed', async () => {
      const fakeData = { email: '' }
      const expectedActions = [{ type: AuthActionTypes.AUTH_USER_REQUEST }]

      fetchMock.mockResponseOnce(JSON.stringify({ success: false }))

      return await store.dispatch(resetPassword(fakeData)).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })
  })

  describe('testing forgotPassword', () => {
    it('should dispatch forgotPassword success', async () => {
      const fakeData = { password: '', token: '' }
      const expectedActions = [
        { type: AuthActionTypes.AUTH_USER_REQUEST },
        { type: AuthActionTypes.AUTH_FORGOT_PASSWORD },
      ]

      fetchMock.mockResponseOnce(JSON.stringify({ success: true }))

      return await store.dispatch(forgotPassword(fakeData)).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })

    it('should dispatch forgotPassword failed', async () => {
      const fakeData = { password: '', token: '' }
      const expectedActions = [{ type: AuthActionTypes.AUTH_USER_REQUEST }]

      fetchMock.mockResponseOnce(JSON.stringify({ success: false }))

      return await store.dispatch(forgotPassword(fakeData)).then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
    })
  })
})

import { RootStore } from './../../../models/index'
import { AuthState } from '../../../models'
import { authSelector, isLoadingSelector, userSelector } from './selectors'

const fakeData = {
  user: { email: 'druss25@yandex.ru', name: 'Druss25' },
  isLoading: false,
  isAuth: false,
  isReset: false,
  hasError: false,
  message: null,
}

const auth: AuthState = {
  user: fakeData.user,
  isLoading: false,
  isAuth: false,
  isReset: false,
  hasError: false,
  message: null,
}

describe('selectors Auth', () => {
  it('should return authSelector', () => {
    const result = authSelector({ auth } as RootStore)
    expect(result).toEqual(fakeData)
  })

  it('should return userSelector', () => {
    const result = userSelector({ auth } as RootStore)
    expect(result).toEqual(fakeData.user)
  })

  it('should return isLoadingSelector', () => {
    const result = isLoadingSelector({ auth } as RootStore)
    expect(result).toBe(false)
  })
})

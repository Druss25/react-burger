import { initialState } from './reducer'
import configureStore from 'redux-mock-store'
import thunk, { ThunkDispatch } from 'redux-thunk'
import { BurgerState } from '../../../models'
import { addToBurger, BurgerAction, BurgerActionTypes } from './actions'

const mockIngredient = {
  _id: '60d3b41abdacab0026a733c6',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0,
}

type DispatchExts = ThunkDispatch<BurgerState, void, BurgerAction>
const mockStore = configureStore<BurgerState, DispatchExts>([thunk])
const store = mockStore(initialState)

describe('testing action burger', () => {
  afterEach(() => {
    store.clearActions()
    jest.restoreAllMocks()
  })

  it('action BURGER_ADD', () => {
    const expectedActions = {
      type: BurgerActionTypes.BURGER_ADD,
      payload: mockIngredient,
    }

    store.dispatch(addToBurger(mockIngredient))
    const action = store.getActions()
    expect(action[0].type).toEqual(expectedActions.type)
  })
})

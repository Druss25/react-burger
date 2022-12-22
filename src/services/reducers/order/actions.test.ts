import thunk, { ThunkDispatch } from 'redux-thunk'
import configureStore from 'redux-mock-store'
import fetchMock from 'jest-fetch-mock'
import { initialState } from './reducer'
import { getOrder, OrderAction, OrderActionTypes } from './actions'
import { IIngredients, OrderState } from '../../../models'

fetchMock.enableMocks()

type DispatchExts = ThunkDispatch<OrderState, void, OrderAction>
const mockStore = configureStore<OrderState, DispatchExts>([thunk])
const store = mockStore(initialState)

interface IOrderResponse {
  success: Readonly<boolean>
  name: Readonly<string>
  order: {
    ingredients: ReadonlyArray<IIngredients>
    _id: Readonly<string>
    owner: {
      name: Readonly<string>
      email: Readonly<string>
      createdAt: Readonly<string>
      updatedAt: Readonly<string>
    }
    status: Readonly<string>
    name: Readonly<string>
    createdAt: Readonly<string>
    updatedAt: Readonly<string>
    number: Readonly<number>
    price: Readonly<number>
  }
}

const ingredients: string[] = [
  '60d3b41abdacab0026a733c7',
  '60d3b41abdacab0026a733c9',
  '60d3b41abdacab0026a733d4',
]

const orderResponse: IOrderResponse = {
  success: true,
  name: 'Астероидный бессмертный флюоресцентный бургер',
  order: {
    ingredients: [
      {
        _id: '60d3b41abdacab0026a733c7',
        name: 'Флюоресцентная булка R2-D3',
        type: 'bun',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
        __v: 0,
      },
      {
        _id: '60d3b41abdacab0026a733c9',
        name: 'Мясо бессмертных моллюсков Protostomia',
        type: 'main',
        proteins: 433,
        fat: 244,
        carbohydrates: 33,
        calories: 420,
        price: 1337,
        image: 'https://code.s3.yandex.net/react/code/meat-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png',
        __v: 0,
      },
      {
        _id: '60d3b41abdacab0026a733d4',
        name: 'Сыр с астероидной плесенью',
        type: 'main',
        proteins: 84,
        fat: 48,
        carbohydrates: 420,
        calories: 3377,
        price: 4142,
        image: 'https://code.s3.yandex.net/react/code/cheese.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/cheese-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/cheese-large.png',
        __v: 0,
      },
    ],
    _id: '63a4397f99a25c001cd6bfbe',
    owner: {
      name: 'Druss25',
      email: 'druss25@yandex.ru',
      createdAt: '2022-11-06T08:45:05.900Z',
      updatedAt: '2022-12-19T11:13:01.977Z',
    },
    status: 'done',
    name: 'Астероидный бессмертный флюоресцентный бургер',
    createdAt: '2022-12-22T11:03:27.963Z',
    updatedAt: '2022-12-22T11:03:28.404Z',
    number: 35235,
    price: 6467,
  },
}

describe('actions getOrder', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })
  afterEach(() => {
    store.clearActions()
    jest.restoreAllMocks()
  })

  it('should dispatch getOrder success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(orderResponse))

    const expectedActions = [
      { type: OrderActionTypes.ORDER_REQUEST },
      { type: OrderActionTypes.ORDER_SUCCESS, payload: orderResponse },
    ]

    expect(orderResponse.success).toBe(true)

    return await store.dispatch(getOrder(ingredients)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('should dispatch getIngredients failed', async () => {
    fetchMock.mockReject(() => Promise.reject())

    const expectedActions = [
      { type: OrderActionTypes.ORDER_REQUEST },
      { type: OrderActionTypes.ORDER_ERROR },
    ]

    return await store.dispatch(getOrder(ingredients)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

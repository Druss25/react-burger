import thunk, { ThunkDispatch } from 'redux-thunk'
import configureStore from 'redux-mock-store'
import fetchMock from 'jest-fetch-mock'
import { dataFake } from './../../../utils/data'
import { IngredientsState } from '../../../models'
import { getIngredients, IngredientsAction, IngredientsActionTypes } from './actions'
import { initialState } from './reducer'

fetchMock.enableMocks()

type DispatchExts = ThunkDispatch<IngredientsState, void, IngredientsAction>
const mockStore = configureStore<IngredientsState, DispatchExts>([thunk])
const store = mockStore(initialState)

describe('actions getIngredients', () => {
  beforeEach(() => {
    fetchMock.resetMocks()
  })
  afterEach(() => {
    store.clearActions()
    jest.restoreAllMocks()
  })

  it('should dispatch getIngredients success', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(dataFake))

    const expectedActions = [
      { type: IngredientsActionTypes.GET_INGREDIENTS_REQUEST },
      { type: IngredientsActionTypes.GET_INGREDIENTS_SUCCESS, payload: dataFake.data },
    ]

    return await store.dispatch(getIngredients()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
      expect(dataFake.success).toEqual(true)
    })
  })

  it('should dispatch getIngredients failed', async () => {
    fetchMock.mockReject(() => Promise.reject('Server is down'))

    const expectedActions = [
      { type: IngredientsActionTypes.GET_INGREDIENTS_REQUEST },
      { type: IngredientsActionTypes.GET_INGREDIENTS_ERROR },
    ]

    return await store.dispatch(getIngredients()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

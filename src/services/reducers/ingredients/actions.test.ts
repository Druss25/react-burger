import configureStore from 'redux-mock-store'
import reduxThunk, { ThunkDispatch } from 'redux-thunk'
import { IngredientsState } from '../../../models'
import { getIngredients, IngredientsAction, IngredientsActionTypes } from './actions'
import { dataFake } from '../../../utils/data'

type DispatchExts = ThunkDispatch<IngredientsState, void, IngredientsAction>
const middlewares = [reduxThunk]
const mockStore = configureStore<IngredientsState, DispatchExts>(middlewares)
const store = mockStore()

describe('actions getIngredients', () => {
  it('should dispatch getIngredients on start of call', async () => {
    const expectedActions = [
      { type: IngredientsActionTypes.GET_INGREDIENTS_REQUEST },
      { type: IngredientsActionTypes.GET_INGREDIENTS_SUCCESS, payload: dataFake.data },
    ]

    await store.dispatch(getIngredients()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

// ThunkDispatch<IngredientsState, unknown, IngredientsAction>

import { Dispatch } from 'redux'
import { IIngredients } from '../../../models'
import * as fetch from '../../../utils/fetch'

export const name = 'ingredients'

export enum IngredientsActionTypes {
  GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST',
  GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS',
  GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR',
}

interface getIngredientsAction {
  type: IngredientsActionTypes.GET_INGREDIENTS_REQUEST
}

interface getIngredientsSuccess {
  type: IngredientsActionTypes.GET_INGREDIENTS_SUCCESS
  payload: IIngredients[]
}

interface getIngredientsError {
  type: IngredientsActionTypes.GET_INGREDIENTS_ERROR
}

export type IngredientsAction = getIngredientsAction | getIngredientsSuccess | getIngredientsError

interface IResponseGetIngredient {
  data: [data: IIngredients]
  success: boolean
}

export const getIngredients = () => async (dispatch: Dispatch<IngredientsAction>) => {
  dispatch({
    type: IngredientsActionTypes.GET_INGREDIENTS_REQUEST,
  })
  return await fetch
    .get<IResponseGetIngredient>('/ingredients', {
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    })
    .then(res => {
      if (res.success) {
        dispatch({
          type: IngredientsActionTypes.GET_INGREDIENTS_SUCCESS,
          payload: res.data,
        })
      }
    })
    .catch(error => {
      dispatch({
        type: IngredientsActionTypes.GET_INGREDIENTS_ERROR,
      })
    })
}

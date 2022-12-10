import { combineReducers } from 'redux'
import { authReducer } from '../reducers/auth/reducer'
import { ingredientsReducer } from '../reducers/ingredients/reducer'
import { burgerReducer } from '../reducers/burger/reducer'
import { orderReducer } from '../reducers/order/reducer'
import { ingredientModalReducer } from '../reducers/ingredient-modal/reducer'
import { wsReducer } from '../reducers/socket/orders/wsReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  ingredients: ingredientsReducer,
  burger: burgerReducer,
  order: orderReducer,
  ingredientDetailModal: ingredientModalReducer,
  orders: wsReducer,
})

export default rootReducer

import { RootStore } from '../../../../models'
import { name } from './wsActions'

export const getOrdersSelector = (state: RootStore) => state[name].messages.orders
export const isConnected = (state: RootStore) => state[name].wsConnected

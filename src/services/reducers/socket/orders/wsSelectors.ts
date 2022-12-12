import { RootStore } from '../../../../models'
import { name } from './wsActions'

export const getOrdersSelector = (state: RootStore) => state[name].messages.orders
export const getTotalOrders = (state: RootStore) => state[name].messages.total
export const getTotalTodayOrders = (state: RootStore) => state[name].messages.totalToday
export const isConnected = (state: RootStore) => state[name].wsConnected

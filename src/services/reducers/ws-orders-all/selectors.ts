import { RootStore } from '../../../models'
import { name } from './actions'

export const getOrdersSelector = (state: RootStore) => state[name].orders
export const getTotalOrders = (state: RootStore) => state[name].total
export const getTotalTodayOrders = (state: RootStore) => state[name].totalToday

// export const numberOrderSelector = (state: RootStore) => state[name].data?.order?.number

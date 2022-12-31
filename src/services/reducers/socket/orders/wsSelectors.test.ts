import { ISocketMessage, RootStore } from '../../../../models'
import { mockDataOrders } from './data'
import { getOrdersSelector, getTotalOrders, getTotalTodayOrders, isConnected } from './wsSelectors'

const orders: ISocketMessage = {
  messages: mockDataOrders,
  wsConnected: false,
}

describe('selectors', () => {
  it('should return getOrdersSelector', () => {
    const result = getOrdersSelector({ orders } as RootStore)
    expect(result).toBe(mockDataOrders.orders)
  })

  it('should return getTotalOrders', () => {
    const result = getTotalOrders({ orders } as RootStore)
    expect(result).toBe(mockDataOrders.total)
  })

  it('should return getTotalTodayOrders', () => {
    const result = getTotalTodayOrders({ orders } as RootStore)
    expect(result).toBe(mockDataOrders.totalToday)
  })

  it('should return isConnected', () => {
    const result = isConnected({ orders } as RootStore)
    expect(result).toBe(false)
  })
})

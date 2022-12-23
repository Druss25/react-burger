import { ISocketMessage, RootStore } from '../../../../models'
import { mockDataOrders } from '../orders/data'
import { getOrdersSelector, isConnected } from './wsSelectors'

const history: ISocketMessage = {
  messages: mockDataOrders,
  wsConnected: false,
}

describe('selectors', () => {
  it('should return getOrdersSelector', () => {
    const result = getOrdersSelector({ history } as RootStore)
    expect(result).toBe(mockDataOrders.orders)
  })

  it('should return isConnected', () => {
    const result = isConnected({ history } as RootStore)
    expect(result).toBe(false)
  })
})

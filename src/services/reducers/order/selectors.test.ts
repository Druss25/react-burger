import { OrderState, RootStore } from '../../../models'
import { isLoadingOrderSelector, numberOrderSelector } from './selectors'

const fakeData = {
  success: true,
  name: '',
  order: {
    number: 3456,
  },
  message: '',
}

const order: OrderState = {
  data: fakeData,
  isLoading: false,
  error: null,
}

describe('selectors', () => {
  it('should return isLoadingOrderSelector', () => {
    const result = isLoadingOrderSelector({ order } as RootStore)
    expect(result).toBe(false)
  })

  it('should return numberOrderSelector', () => {
    const result = numberOrderSelector({ order } as RootStore)
    expect(result).toEqual(fakeData.order.number)
  })
})

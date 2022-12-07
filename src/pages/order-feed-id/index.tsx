import React from 'react'
import { TOrder } from '../order-feed'

const data: TOrder = {
  createdAt: '2022-12-07T11:43:08.764Z',
  ingredients: ['60d3b41abdacab0026a733c7', '60d3b41abdacab0026a733cd', '60d3b41abdacab0026a733c7'],
  name: 'Space флюоресцентный бургер',
  number: 32652,
  status: 'done',
  updatedAt: '2022-12-07T11:43:09.239Z',
  _id: '63907c4c99a25c001cd64d92',
}

const OrderFeedId = () => {
  const ls = data
  return <div>OrderFeedId</div>
}

export default OrderFeedId

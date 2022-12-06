import React from 'react'
import { TMessageData } from '../../pages/order-feed'
import OrderElement from '../OrderElement/OrderElement'

import styles from './OrderList.module.css'

const OrderList: React.FC<TMessageData> = ({ orders }) => {
  React.useEffect(() => {
    return console.log('orders:', orders)
    //// eslint-disable-next-line
  }, [orders])

  return (
    <div className={`${styles.wrapper} custom-scroll`}>
      <OrderElement />
    </div>
  )
}

export default OrderList

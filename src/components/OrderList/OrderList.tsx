import React from 'react'
import { TMessageData } from '../../pages/order-feed'
import OrderElement from '../OrderElement/OrderElement'

import styles from './OrderList.module.css'

const OrderList: React.FC<TMessageData> = ({ orders }) => {
  const order = orders[0]
  return (
    <div className={`${styles.wrapper} custom-scroll`}>
      <OrderElement {...order} />
    </div>
  )
}

export default OrderList

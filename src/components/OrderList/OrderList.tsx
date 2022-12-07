import React from 'react'
import { TMessageData } from '../../pages/order-feed'
import OrderElement from '../OrderElement/OrderElement'

import styles from './OrderList.module.css'

const OrderList: React.FC<TMessageData> = ({ orders }) => {
  return (
    <div className={`${styles.wrapper} custom-scroll pr-2`}>
      {orders.map((order, index) => (
        <OrderElement {...order} key={index} />
      ))}
    </div>
  )
}

export default OrderList

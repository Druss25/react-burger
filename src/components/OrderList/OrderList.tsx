import React from 'react'
import { useAppSelector } from '../../services/store'
import OrderElement from '../OrderElement/OrderElement'

import styles from './OrderList.module.css'

const OrderList: React.FC = () => {
  const orders = useAppSelector(state => state.wsOrderAll.orders)

  return (
    <div className={`${styles.wrapper} custom-scroll pr-2`}>
      {orders.map((order, index) => (
        <OrderElement {...order} key={index} />
      ))}
    </div>
  )
}

export default OrderList

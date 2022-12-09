import React from 'react'
import { getOrdersSelector } from '../../services/reducers/ws-orders-all/selectors'
import { useAppSelector } from '../../services/store'
import OrderElement from '../OrderElement/OrderElement'

import styles from './OrderList.module.css'

const OrderList: React.FC = () => {
  const orders = useAppSelector(getOrdersSelector)

  return (
    <div className={`${styles.wrapper} custom-scroll pr-2`}>
      {orders.map((order, index) => (
        <OrderElement {...order} key={index} />
      ))}
    </div>
  )
}

export default OrderList

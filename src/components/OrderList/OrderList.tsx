import React from 'react'
import { Link } from 'react-router-dom'
import { getOrdersSelector } from '../../services/reducers/ws-orders-all/selectors'
import { useAppSelector } from '../../services/store'
import OrderElement from '../OrderElement/OrderElement'

import styles from './OrderList.module.css'

const OrderList: React.FC = () => {
  const orders = useAppSelector(getOrdersSelector)

  return (
    <div className={`${styles.wrapper} custom-scroll pr-2`}>
      {orders.map(order => (
        <Link
          to={{
            pathname: `/feed/${order.number}`,
          }}
          key={order.number}
          className={styles.link}
        >
          <OrderElement {...order} />
        </Link>
      ))}
    </div>
  )
}

export default OrderList

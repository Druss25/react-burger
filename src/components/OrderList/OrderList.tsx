import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAppSelector } from '../../hook/redux-hook'
import { getOrdersSelector } from '../../services/reducers/socket/orders/wsSelectors'
import OrderElement from '../OrderElement/OrderElement'
import Spinner from '../Spinner/Spinner'

import styles from './OrderList.module.css'

const OrderList: React.FC = () => {
  const orders = useAppSelector(getOrdersSelector)
  const location = useLocation()
  const isStatus = false

  if (!orders) return <Spinner />

  return (
    <div className={`${styles.wrapper} custom-scroll pr-2`}>
      {orders.map(order => (
        <Link
          to={{
            pathname: `/feed/${order.number}`,
            state: { background: location },
          }}
          key={order.number}
          className={styles.link}
        >
          <OrderElement order={order} isStatus={isStatus} />
        </Link>
      ))}
    </div>
  )
}

export default OrderList

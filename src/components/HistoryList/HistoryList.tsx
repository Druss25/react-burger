import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAppSelector } from '../../hook/redux-hook'
import { getOrdersSelector } from '../../services/reducers/socket/history/wsSelectors'
import OrderElement from '../OrderElement/OrderElement'
import Spinner from '../Spinner/Spinner'

import styles from './HistoryList.module.css'

const HistoryList: React.FC = () => {
  const orders = useAppSelector(getOrdersSelector).sort((a, b) => (a.number < b.number ? 1 : -1))
  const location = useLocation()
  const isStatus = true

  if (!orders) return <Spinner />

  return (
    <>
      {orders.map(order => (
        <Link
          to={{
            pathname: `/profile/orders/${order.number}`,
            state: { background: location },
          }}
          key={order.number}
          className={styles.link}
        >
          <OrderElement order={order} isStatus={isStatus} />
        </Link>
      ))}
    </>
  )
}

export default HistoryList

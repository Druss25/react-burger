import React from 'react'
import OrderDetails from '../../components/OrderDetails/OrderDetails'
import Spinner from '../../components/Spinner/Spinner'
import { useAppDispatch, useAppSelector } from '../../hook/redux-hook'
import { WS_AUTH_CONNECTION_START } from '../../services/reducers/socket/history/wsActionsTypes'
import { getOrdersSelector } from '../../services/reducers/socket/history/wsSelectors'
import { isConnected } from '../../services/reducers/socket/history/wsSelectors'

import styles from './order-history-id.module.css'

const OrderHistoryById: React.FC = () => {
  const dispatch = useAppDispatch()
  const orders = useAppSelector(getOrdersSelector)
  const wsConnected = useAppSelector(isConnected)

  React.useEffect(() => {
    if (!wsConnected) dispatch({ type: WS_AUTH_CONNECTION_START })
    // eslint-disable-next-line
  }, [])

  if (!orders) return <Spinner />

  return (
    <div className={styles.wrapper}>
      <OrderDetails orders={orders} />
    </div>
  )
}

export default OrderHistoryById

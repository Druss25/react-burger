import React from 'react'
import { useAppDispatch, useAppSelector } from '../../hook/redux-hook'
import { getOrdersSelector, isConnected } from '../../services/reducers/socket/orders/wsSelectors'
import { WS_CONNECTION_START } from '../../services/reducers/socket/orders/wsActionsTypes'
import Spinner from '../../components/Spinner/Spinner'
import OrderDetails from '../../components/OrderDetails/OrderDetails'

import styles from './order-feed-id.module.css'

const OrderFeedId: React.FC = () => {
  const dispatch = useAppDispatch()
  const orders = useAppSelector(getOrdersSelector)
  const wsConnected = useAppSelector(isConnected)

  React.useEffect(() => {
    if (!wsConnected) dispatch({ type: WS_CONNECTION_START })
    // eslint-disable-next-line
  }, [])

  if (!orders) return <Spinner />

  return (
    <div className={styles.wrapper}>
      <OrderDetails orders={orders} />
    </div>
  )
}

export default OrderFeedId

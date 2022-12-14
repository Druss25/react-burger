import React from 'react'
import { useDispatch } from 'react-redux'
import OrderList from '../../components/OrderList/OrderList'
import OrderStatistic from '../../components/OrderStatistic/OrderStatistic'
import Spinner from '../../components/Spinner/Spinner'
import { useAppSelector } from '../../hook/redux-hook'
import {
  WS_CONNECTION_START,
  WS_CONNECTION_STOP,
} from '../../services/reducers/socket/orders/wsActionsTypes'
import { getOrdersSelector, isConnected } from '../../services/reducers/socket/orders/wsSelectors'

import styles from './order-feed.module.css'

const OrderFeedPage: React.FC = () => {
  const dispatch = useDispatch()
  const orders = useAppSelector(getOrdersSelector)
  const wsConnected = useAppSelector(isConnected) || false

  const wsClose = React.useCallback(() => {
    if (wsConnected) dispatch({ type: WS_CONNECTION_STOP })
  }, [dispatch, wsConnected])

  React.useEffect(() => {
    if (!wsConnected) dispatch({ type: WS_CONNECTION_START })
    return () => wsClose()
    // eslint-disable-next-line
  }, [])

  if (!orders) return <Spinner />

  return (
    <section className={styles.wrapper}>
      <h3 className="text text_type_main-large mt-10 mb-5">Лента заказов</h3>
      <div className={styles.content}>
        <OrderList />
        <OrderStatistic />
      </div>
    </section>
  )
}

export default OrderFeedPage

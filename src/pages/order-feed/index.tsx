import React from 'react'
import { useDispatch } from 'react-redux'
import OrderList from '../../components/OrderList/OrderList'
import OrderStatistic from '../../components/OrderStatistic/OrderStatistic'
import Spinner from '../../components/Spinner/Spinner'
import { WS_CONNECTION_START } from '../../services/reducers/socket/orders/wsActionsTypes'
import { getOrdersSelector, isConnected } from '../../services/reducers/socket/orders/wsSelectors'
import { useAppSelector } from '../../services/store'

import styles from './order-feed.module.css'

const OrderFeedPage: React.FC = () => {
  const dispatch = useDispatch()
  const orders = useAppSelector(getOrdersSelector)
  const wsConnected = useAppSelector(isConnected) || false

  React.useEffect(() => {
    if (!wsConnected) dispatch({ type: WS_CONNECTION_START })
    // eslint-disable-next-line
  }, [wsConnected])

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

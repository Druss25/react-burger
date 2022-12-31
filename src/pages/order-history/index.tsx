import React from 'react'
import { useDispatch } from 'react-redux'
import HistoryList from '../../components/HistoryList/HistoryList'
import Spinner from '../../components/Spinner/Spinner'
import { useAppSelector } from '../../hook/redux-hook'
import {
  WS_AUTH_CONNECTION_START,
  WS_AUTH_CONNECTION_STOP,
} from '../../services/reducers/socket/history/wsActionsTypes'
import { getOrdersSelector, isConnected } from '../../services/reducers/socket/history/wsSelectors'

import styles from './order-history.module.css'

const OrdersHistoryPage: React.FC = () => {
  const dispatch = useDispatch()
  const orders = useAppSelector(getOrdersSelector)
  const wsConnected = useAppSelector(isConnected) || false

  const wsClose = React.useCallback(() => {
    if (wsConnected) dispatch({ type: WS_AUTH_CONNECTION_STOP })
  }, [dispatch, wsConnected])

  React.useEffect(() => {
    if (!wsConnected) dispatch({ type: WS_AUTH_CONNECTION_START })
    return () => wsClose()
    // eslint-disable-next-line
  }, [])

  if (!orders) return <Spinner />

  return (
    <>
      <div className={styles.subtitle}>
        <p className="text text_type_main-default text_color_inactive">
          В этом разделе вы можете просмотреть свою историю заказов
        </p>
      </div>
      <div className={`${styles.wrapper} custom-scroll pr-2`}>
        <HistoryList />
      </div>
    </>
  )
}

export default OrdersHistoryPage

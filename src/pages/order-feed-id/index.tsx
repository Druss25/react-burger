import React from 'react'
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../services/store'
import useIngredients from '../../hook/useIngredients'
import { getOrdersSelector, isConnected } from '../../services/reducers/socket/orders/wsSelectors'
import { WS_CONNECTION_START } from '../../services/reducers/socket/orders/wsActionsTypes'

import styles from './order-feed-id.module.css'
import Spinner from '../../components/Spinner/Spinner'
import OrderDetails from '../../components/OrderDetails/OrderDetails'

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
      <OrderDetails />
    </div>
  )
}

export default OrderFeedId

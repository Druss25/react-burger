import React from 'react'
import OrderList from '../../components/OrderList/OrderList'
import OrderStatistic from '../../components/OrderStatistic/OrderStatistic'
import { useSocket } from '../../hook/useSocket'
import { getWSOrderAll } from '../../services/reducers/ws-orders-all/actions'
import { getTotalOrders } from '../../services/reducers/ws-orders-all/selectors'
import { useAppDispatch, useAppSelector } from '../../services/store'

import styles from './order-feed.module.css'

const OrderFeedPage: React.FC = () => {
  const wsUrl = 'wss://norma.nomoreparties.space/orders/all'
  const dispatch = useAppDispatch()
  const isLoading = useAppSelector(getTotalOrders)

  const processEvent = React.useCallback(
    (event: MessageEvent) => {
      const json = JSON.parse(event.data)
      if (json.success === true) {
        dispatch(getWSOrderAll(json))
      }
    },
    [dispatch],
  )

  const { connect } = useSocket(wsUrl, { onMessage: processEvent })

  React.useEffect(() => {
    connect(null)
    // eslint-disable-next-line
  }, [])

  return (
    <section className={styles.wrapper}>
      {!!isLoading && (
        <>
          <h3 className="text text_type_main-large mt-10 mb-5">Лента заказов</h3>
          <div className={styles.content}>
            <OrderList />
            <OrderStatistic />
          </div>
        </>
      )}
    </section>
  )
}

export default OrderFeedPage

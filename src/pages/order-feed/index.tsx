import React from 'react'
import OrderList from '../../components/OrderList/OrderList'
import OrderStatistic from '../../components/OrderStatistic/OrderStatistic'
import { useSocket } from '../../hook/useSocket'

import styles from './order-feed.module.css'

export type TMessageData = {
  orders: ReadonlyArray<TOrder>
  success: Readonly<boolean>
  total: Readonly<number>
  totalToday: Readonly<number>
  event: Readonly<string>
}

export type TOrder = {
  _id: Readonly<string>
  ingredients: ReadonlyArray<string>
  status: Readonly<string>
  number: Readonly<number>
  name: Readonly<string>
  createdAt: Readonly<string>
  updatedAt: Readonly<string>
}

const OrderFeedPage: React.FC = () => {
  const [ingredients, setIngredients] = React.useState<TMessageData>()
  const wsUrl = 'wss://norma.nomoreparties.space/orders/all'

  const processEvent = React.useCallback((event: MessageEvent) => {
    const normalizedMessage = JSON.parse(event.data)
    if (normalizedMessage.success === true) {
      setIngredients(normalizedMessage)
      console.log(normalizedMessage)
    }
  }, [])

  const { connect } = useSocket(wsUrl, {
    onMessage: processEvent,
  })

  React.useEffect(() => {
    connect('')
    // eslint-disable-next-line
  }, [])

  return (
    <section className={styles.wrapper}>
      <h3 className="text text_type_main-large mt-10 mb-5">Лента заказов</h3>
      <div className={styles.content}>
        {typeof ingredients !== 'undefined' && (
          <>
            <OrderList {...ingredients} />
            <OrderStatistic {...ingredients} />
          </>
        )}
      </div>
    </section>
  )
}

export default OrderFeedPage

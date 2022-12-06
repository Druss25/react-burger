import React from 'react'
import OrderList from '../../components/OrderList/OrderList'
import OrderStatistic from '../../components/OrderStatistic/OrderStatistic'

import styles from './order-feed.module.css'

export type TMessageData = {
  orders: TOrder[] | null
  success: Readonly<boolean>
  total: Readonly<number>
  totalToday: Readonly<number>
  event: Readonly<string>
}

export type TOrder = {
  _id: Readonly<string>
  ingredients: Array<string>
  status: Readonly<string>
  name: Readonly<string>
  createdAt: Readonly<string>
}

const OrderFeedPage: React.FC = () => {
  const [ingredients, setIngredients] = React.useState<TMessageData>()

  const ws = React.useRef<WebSocket | null>(null)
  const wsUrl = 'wss://norma.nomoreparties.space/orders/all'

  const onMessage = React.useCallback(() => {
    if (!ws.current) return
    ws.current.onmessage = event => {
      const message = JSON.parse(event.data)
      if (message.success) {
        setIngredients(message)
        console.log(message)
      }
    }
  }, [])

  React.useEffect(() => {
    ws.current = new WebSocket(wsUrl)
    ws.current.onopen = () => console.log('Соединение открыто')
    ws.current.onclose = () => console.log('Соединение закрыто')
    onMessage()
    return () => ws.current?.close()
  }, [ws, onMessage])

  return (
    <section className={styles.wrapper}>
      <h3 className="text text_type_main-large mt-10 mb-5">Лента заказов</h3>
      <div className={styles.content}>
        {typeof ingredients !== 'undefined' && (
          <>
            <OrderList {...ingredients} />
            <OrderStatistic />
          </>
        )}
      </div>
    </section>
  )
}

export default OrderFeedPage

import React from 'react'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useParams } from 'react-router-dom'
// import { useAppSelector } from '../../services/store'
import { TOrder } from '../../services/reducers/ws-orders-all/types'

import styles from './order-feed-id.module.css'

const data: TOrder = {
  createdAt: '2022-12-07T11:43:08.764Z',
  ingredients: ['60d3b41abdacab0026a733c7', '60d3b41abdacab0026a733cd', '60d3b41abdacab0026a733c7'],
  name: 'Space флюоресцентный бургер',
  number: 32652,
  status: 'done',
  updatedAt: '2022-12-07T11:43:09.239Z',
  _id: '63907c4c99a25c001cd64d92',
}

type TParams = {
  orderId: string
}

const OrderFeedId = () => {
  const { orderId } = useParams<TParams>()
  // const orders = useAppSelector(state => state.wsOrderAll.orders)

  // const getOrder = React.useCallback(() => {
  //   return orders.filter(item => item.number === Number(orderId))
  // }, [orders, orderId])

  // const order = getOrder()

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <span className={`${styles.text_center} text text_type_digits-default mb-10`}>
          #{orderId}
        </span>
        <span className="text text_type_main-medium mb-3">{data.name}</span>
        <span className={`${styles.status} text text_type_main-default mb-15`}>
          {data.status === 'done' ? 'Выполнен' : 'В работе'}
        </span>
        <span className="text text_type_main-medium mb-6">Состав:</span>

        <div
          className={`${styles.list_items} custom-scroll ${
            data.ingredients.length > 4 ? `${styles.scroll}` : `${styles.no_scroll}`
          }`}
        >
          {/* ---- */}
          <div className={styles.items}>
            <div className={styles.images}>
              <img src="https://code.s3.yandex.net/react/code/bun-01-mobile.png" alt="images" />
            </div>
            <span className="text text_type_main-default">Флюоресцентная булка R2-D3</span>
            <div className={styles.price}>
              <span className="text text_type_digits-default pr-2">2&nbsp;x&nbsp;988</span>
              <div className={styles.df_center}>
                <CurrencyIcon type="primary" />
              </div>
            </div>
          </div>
          {/* ---- */}
        </div>

        <div className={`${styles.footer} mt-10`}>
          <span className="text text_type_main-default text_color_inactive">Вчера, 15:42</span>
          <div className={styles.footer_image}>
            <span className="text text_type_digits-default mr-2">510</span>
            <div className={styles.df_center}>
              <CurrencyIcon type="primary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderFeedId

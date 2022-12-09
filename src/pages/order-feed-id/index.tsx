import React from 'react'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../services/store'
import useIngredients from '../../hook/useIngredients'
import { getOrdersSelector } from '../../services/reducers/ws-orders-all/selectors'
import { getOrderByNumber } from '../../services/reducers/ws-orders-all/actions'
import date from 'date-and-time'

import styles from './order-feed-id.module.css'

type TParams = {
  id: string
}

type TStatusOrder = {
  [key: string]: string
}
const statusOrder = { created: 'Отменен', pending: 'Готовиться', done: 'Выполнен' } as TStatusOrder

const OrderFeedId = () => {
  const { id } = useParams<TParams>()
  const dispatch = useAppDispatch()
  const orders = useAppSelector(getOrdersSelector)
  const order = orders.filter(item => item.number === Number(id))[0]
  const { summa, noDoubleIngredients, counts } = useIngredients(order.ingredients)

  const getOrder = React.useCallback(
    (orderId: string) => {
      dispatch(getOrderByNumber(orderId))
    },
    [dispatch],
  )

  React.useEffect(() => {
    getOrder(id)
    // eslint-disable-next-line
  }, [])

  const now = new Date(order.updatedAt)

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <span className={`${styles.text_center} text text_type_digits-default mb-10`}>#{id}</span>
        <span className="text text_type_main-medium mb-3">{order.name}</span>
        <span className={`${styles.status} text text_type_main-default mb-15`}>
          {statusOrder[`${order.status}`]}
        </span>
        <span className="text text_type_main-medium mb-6">Состав:</span>
        <div
          className={`${styles.list_items} custom-scroll ${
            order.ingredients.length > 3 ? `${styles.scroll}` : `${styles.no_scroll}`
          }`}
        >
          {noDoubleIngredients.map((ingredient, index) => (
            <div className={styles.items} key={index}>
              <div className={styles.images}>
                <img src={ingredient.image_mobile} alt={ingredient.name} />
              </div>
              <span className="text text_type_main-default">{ingredient.name}</span>
              <div className={styles.price}>
                <span className="text text_type_digits-default pr-2">
                  {counts[`${ingredient._id}`]}&nbsp;x&nbsp;{ingredient.price}
                </span>
                <div className={styles.df_center}>
                  <CurrencyIcon type="primary" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={`${styles.footer} mt-10`}>
          <span className="text text_type_main-default text_color_inactive">
            {date.format(now, 'DD.MM.YYYY HH:mm [i-GMT]ZZ')}
          </span>
          <div className={styles.footer_image}>
            <span className="text text_type_digits-default mr-2">{summa}</span>
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

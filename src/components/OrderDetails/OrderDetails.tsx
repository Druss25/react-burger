import React from 'react'
import { useParams } from 'react-router-dom'
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import useIngredients from '../../hook/useIngredients'
import { TOrder } from '../../services/reducers/socket/orders/types'
import { statusOrder } from '../../utils/constants'
import Spinner from '../Spinner/Spinner'

import styles from './OrderDetails.module.css'

interface TParams {
  id: string
}

interface TProps {
  orders: TOrder[]
}

const OrderDetails: React.FC<TProps> = ({ orders }) => {
  const { id } = useParams<TParams>()

  const order = React.useMemo(
    () => orders?.filter(item => item.number === Number(id), 0)[0],
    [orders, id],
  )

  // const order = orders?.filter(item => item.number === Number(id), 0)[0]
  const { summa, noDoubleIngredients, counts } = useIngredients(order?.ingredients)

  if (!orders || !order || !summa) return <Spinner />

  return (
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
          <FormattedDate date={new Date(order.createdAt)} />
        </span>
        <div className={styles.footer_image}>
          <span className="text text_type_digits-default mr-2">{summa}</span>
          <div className={styles.df_center}>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetails

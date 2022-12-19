import React from 'react'
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components'
import { TOrder } from '../../services/reducers/ws-orders-all/types'
import useIngredients from '../../hook/useIngredients'

import styles from './OrderElement.module.css'
import { statusOrder } from '../../utils/constants'

type TProps = {
  order: TOrder
  isStatus: boolean
}

const OrderElement: React.FC<TProps> = ({ order, isStatus }) => {
  const { number, name, ingredients, createdAt } = order
  const { summa, noDoubleIngredients } = useIngredients(ingredients)

  return (
    <div className={styles.wrapper}>
      <div className={styles.subtitle}>
        <span className="text text_type_digits-default">#{number}</span>
        <span className="text text_type_main-default text_color_inactive">
          <FormattedDate date={new Date(createdAt)} />
        </span>
      </div>
      <h3 className="text text_type_main-medium pt-6">{name}</h3>
      {isStatus && (
        <p
          className={`text text_type_main-default pt-2 ${
            order.status === 'done' ? `${styles.activate}` : ``
          }`}
        >
          {statusOrder[`${order.status}`]}
        </p>
      )}
      <div className={styles.content}>
        {/* -------------   !!! Переписать этот блок   -----------*/}
        <div className={`${styles.image_list} pt-6`}>
          {/* <div className={styles.image_item}>
            <p className="text text_type_digits-default">+3</p>
          </div> */}
          {noDoubleIngredients.reverse().map(
            (ingredient, index) =>
              index < 5 && (
                <div className={styles.image_item} key={ingredient._id}>
                  <img src={ingredient.image_mobile} alt={ingredient.name} />
                </div>
              ),
          )}
        </div>
        {/* ------------------------------------------------------ */}
        <div className={styles.currency}>
          <span className="text text_type_digits-default ml-6 mr-2">{summa}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}

export default OrderElement

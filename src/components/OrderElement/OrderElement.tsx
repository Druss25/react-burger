import React from 'react'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import date from 'date-and-time'
import { TOrder } from '../../services/reducers/ws-orders-all/types'
import useIngredients from '../../hook/useIngredients'

import styles from './OrderElement.module.css'

const OrderElement: React.FC<Readonly<TOrder>> = props => {
  const { number, name, ingredients, updatedAt } = props
  const { summa, noDoubleIngredients } = useIngredients(ingredients)
  const now = new Date(updatedAt)

  return (
      <div className={styles.wrapper}>
        <div className={styles.subtitle}>
          <span className="text text_type_digits-default">#{number}</span>
          <span className="text text_type_main-default text_color_inactive">
            {date.format(now, 'DD.MM.YYYY HH:mm [i-GMT]ZZ')}
          </span>
        </div>
        <h3 className="text text_type_main-medium">{name}</h3>
        <div className={styles.content}>
          {/* -------------   !!! Переписать этот блок   -----------*/}
          <div className={styles.image_list}>
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

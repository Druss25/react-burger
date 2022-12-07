import React from 'react'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import date from 'date-and-time'
import { TOrder } from '../../pages/order-feed'
import { useAppSelector } from '../../services/store'
import { ingredientsSelector } from '../../services/reducers/ingredients/selectors'
import { IIngredients } from '../../models'

import styles from './OrderElement.module.css'

const OrderElement: React.FC<TOrder> = props => {
  const getIngredients = useAppSelector(ingredientsSelector)
  const { number, name, ingredients, updatedAt } = props
  const now = new Date(updatedAt)

  const fullIngredients = React.useCallback(
    (ingredients: Array<string>) => {
      return ingredients
        .map(ingredient => getIngredients.filter(item => item._id === ingredient))
        .flat()
    },
    [getIngredients],
  )

  const orderIngredients = fullIngredients(ingredients)

  const noDoubleIngredients = orderIngredients
    .filter((item, index) => orderIngredients.indexOf(item) === index)
    .reverse()

  const summaIngredients = orderIngredients.reduce(
    (total: number, value: IIngredients) => total + value.price,
    0,
  )

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
          {noDoubleIngredients.map(
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
          <span className="text text_type_digits-default ml-6 mr-2">{summaIngredients}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}

export default OrderElement

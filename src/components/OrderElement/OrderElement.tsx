import React from 'react'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import date from 'date-and-time'
import { TOrder } from '../../pages/order-feed'
import { useAppSelector } from '../../services/store'
import { ingredientsSelector } from '../../services/reducers/ingredients/selectors'
import { IIngredients } from '../../models'

import styles from './OrderElement.module.css'

const OrderElement: React.FC<Readonly<TOrder>> = props => {
  const getIngredients = useAppSelector(ingredientsSelector)
  const { number, name, ingredients, updatedAt } = props
  const now = new Date(updatedAt)

  const fullIngredients = React.useCallback(
    (ingredients: ReadonlyArray<string>) =>
      ingredients.map(ingredient => getIngredients.filter(item => item._id === ingredient)).flat(),
    [getIngredients],
  )

  // const orderIngredients = fullIngredients(ingredients)

  const totalPrice = React.useCallback(
    (ingredients: ReadonlyArray<IIngredients>) =>
      ingredients.reduce((total: number, value) => total + value.price, 0),
    [],
  )

  const summa = totalPrice(getIngredients)

  const noDoubleIngredients = fullIngredients(ingredients)
    .filter((item, index) => fullIngredients(ingredients).indexOf(item) === index)
    .reverse()

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
          <span className="text text_type_digits-default ml-6 mr-2">{summa}</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}

export default OrderElement

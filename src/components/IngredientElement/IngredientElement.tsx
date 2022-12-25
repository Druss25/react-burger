import React from 'react'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { TargetDropType } from '../../utils/constants'
import { useDrag } from 'react-dnd'
import { IIngredients } from '../../models'

import styles from './IngredientElement.module.css'

type TProps = {
  id: string
  ingredient: Readonly<IIngredients>
  counter: number
  onClick: (ingredient: IIngredients) => void
}

const IngredientElement: React.FC<TProps> = ({ id, ingredient, counter, onClick }) => {
  const { name, price, image } = ingredient
  const [{ opacity }, dragRef] = useDrag({
    type: TargetDropType.ADD_INGREDIENT,
    item: { ...ingredient },
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  })

  const handleClick = (e: Event) => {
    e.preventDefault()
    onClick(ingredient)
  }

  return (
    <>
      <div
        id={id}
        ref={dragRef}
        className={`${styles.wrapper} constructor-element__row`}
        onClick={() => handleClick}
        style={{ opacity }}
      >
        <div className="constructor-element__row">
          <img src={image} alt="Ингредиент" />
        </div>
        {counter > 0 && <Counter extraClass={styles.counter} count={counter} size="default" />}
        <div className={`constructor-element__row ${styles.wrapper_price} mt-1 mb-1`}>
          <p className="text text_type_digits-default mr-3">{price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <div className={styles.title}>
          <p className="text text_type_main-default">{name}</p>
        </div>
      </div>
    </>
  )
}

export default IngredientElement

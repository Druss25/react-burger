import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { useAppSelector } from '../../hook/redux-hook'
import { IIngredients } from '../../models'
import { getIngredientsCounters } from '../../services/reducers/burger/selectors'
import IngredientElement from '../IngredientElement/IngredientElement'

import styles from './BurgerIngredientsCategory.module.css'

interface IIngredientCategory {
  title: Readonly<string>
  titleId: Readonly<string>
  ingredients: ReadonlyArray<IIngredients>
  onIngredientClick: (ingredient: IIngredients) => void
}

const BurgerIngredientsCategory = React.forwardRef(
  (
    { title, titleId, ingredients, onIngredientClick }: IIngredientCategory,
    ref: React.ForwardedRef<null>,
  ) => {
    const counters = useAppSelector(getIngredientsCounters)
    const location = useLocation()

    return (
      <>
        <h3 className="text text_type_main-medium mb-6" id={titleId}>
          {title}
        </h3>
        <div className={`${styles.wrapper_card} pl-4`} ref={ref}>
          {ingredients.map(ingredient => (
            <Link
              className={styles.link}
              key={ingredient._id}
              to={{
                pathname: `/ingredients/${ingredient._id}`,
                state: { background: location },
              }}
            >
              <IngredientElement
                id={ingredient._id}
                ingredient={ingredient}
                onClick={onIngredientClick}
                counter={counters ? counters[ingredient._id] : 0}
              />
            </Link>
          ))}
        </div>
      </>
    )
  },
)

export default BurgerIngredientsCategory

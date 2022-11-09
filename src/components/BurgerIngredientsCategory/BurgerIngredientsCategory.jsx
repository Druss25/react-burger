import React from 'react'
import { useSelector } from 'react-redux'
import {useLocation, Link} from 'react-router-dom'
import { getIngredientsCounters } from '../../services/reducers/burger/selectors'
import IngredientElement from '../IngredientElement/IngredientElement'
import styles from './BurgerIngredientsCategory.module.css'

const BurgerIngredientsCategory = React.forwardRef(({ title, titleId, ingredients, onIngredientClick }, ref) => {
  const counters = useSelector(getIngredientsCounters)
  const location = useLocation()

  return (
    <>
      <h3 className="text text_type_main-medium mb-6" id={titleId} >
        {title}
      </h3>
      <div className={`${styles.wrapper_card} pl-4`} ref={ref}>
        {ingredients.map((ingredient) => (
          <Link className={styles.link}
            key={ingredient._id}
              to={{
                pathname: `/ingredients/${ingredient._id}`,
                state: { background: location }
            }}
          >
          <IngredientElement
            ingredient={ingredient}
            onClick={onIngredientClick}
            counter={counters ? counters[ingredient._id] : 0}
          />
          </Link>
        ))}
      </div>
    </>
  )
})

export default BurgerIngredientsCategory

import React from 'react'
import { useSelector } from 'react-redux'
// import PropTypes from 'prop-types'
import { getIngredientsCounters } from '../../services/burger/selectors'
// import { dataPropTypes } from '../../utils/constants'
import IngredientElement from '../IngredientElement/IngredientElement'
import styles from './BurgerIngredientsCategory.module.css'

const BurgerIngredientsCategory = React.forwardRef(({ title, titleId, ingredients, onIngredientClick }, ref) => {
  const counters = useSelector(getIngredientsCounters)

  return (
    <>
      <h3 className="text text_type_main-medium mb-6" id={titleId} >
        {title}
      </h3>
      <div className={`${styles.wrapper_card} pl-4 mb-10`} ref={ref}>
        {ingredients.map((ingredient) => (
          <IngredientElement
            key={ingredient._id}
            ingredient={ingredient}
            onClick={onIngredientClick}
            counter={counters ? counters[ingredient._id] : 0}
          />
        ))}
      </div>
    </>
  )
})

// BurgerIngredientsCategory.propTypes = {
//   title: PropTypes.string.isRequired,
//   titleId: PropTypes.string.isRequired,
//   ingredients: dataPropTypes.isRequired,
//   onIngredientClick: PropTypes.func.isRequired
// }

export default BurgerIngredientsCategory

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IngredientDetails from '../../components/IngredientDetails/IngredientDetails'
import { getIngredients } from '../../services/reducers/ingredients/actions'
import { loadingSelector } from '../../services/reducers/ingredients/selectors'

import styles from './ingredients.module.css'

const IngredientPage = () => {
  const dispatch = useDispatch()
  const isLoading = useSelector(loadingSelector)

  React.useEffect(() => {
    dispatch(getIngredients())
    // eslint-disable-next-line
  }, [])

  if (isLoading) {
    return null
  }

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.content} pt-10 pl-10 pr-10`}>
        <span className={`${styles.title} text text_type_main-large`}>
          Детали ингредиента
        </span>
        <IngredientDetails />
      </div>
    </div>
  )
}

export default IngredientPage

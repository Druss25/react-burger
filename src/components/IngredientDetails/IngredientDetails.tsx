import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { ingredientsSelector } from '../../services/reducers/ingredients/selectors'

import styles from './IngredientDetails.module.css'

interface ParamTypes {
  id: string
}

const IngredientDetails = () => {
  const { id } = useParams<ParamTypes>()
  const ingredients = useSelector(ingredientsSelector)
  const ingredient = ingredients.filter(ingredient => ingredient._id === id)[0]

  return (
    <>
      <div className={styles.wrapper__center}>
        <img src={ingredient?.image_large} alt="img_product" />
      </div>
      <p className={`${styles.wrapper__center} text text_type_main-medium mt-4 mb-8`}>
        {ingredient?.name}
      </p>
      <div className={`${styles.items__list} mb-15`}>
        <div className={`${styles.item} text text_type_main-default text_color_inactive`}>
          <p className="text-center">Калорий,&nbsp;ккалл</p>
          <p className="text text_type_main-medium text-center mt-2">{ingredient?.calories}</p>
        </div>
        <div className={`${styles.item} text text_type_main-default text_color_inactive`}>
          <p className="text-center">Белки,&nbsp;г</p>
          <p className="text text_type_main-medium text-center mt-2">{ingredient?.proteins}</p>
        </div>
        <div className={`${styles.item} text text_type_main-default text_color_inactive`}>
          <p className="text-center">Жиры,&nbsp;г</p>
          <p className="text text_type_main-medium text-center mt-2">{ingredient?.fat}</p>
        </div>
        <div className={`${styles.item} text text_type_main-default text_color_inactive`}>
          <p className="text-center">Углеводы,&nbsp;г</p>
          <p className="text text_type_main-medium text-center mt-2">{ingredient?.carbohydrates}</p>
        </div>
      </div>
    </>
  )
}

export default IngredientDetails

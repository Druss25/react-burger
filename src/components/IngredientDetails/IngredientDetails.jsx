import { dataPropTypes } from '../../utils/constants'
import IngredientDetailsStyles from './IngredientDetails.module.css'

const IngredientDetails = ({ currentIngredient }) => {
  return (
    <>
      <div className={IngredientDetailsStyles.wrapper__center}>
        <img src={currentIngredient.image_large} alt="img_product" />
      </div>
      <p className={`${IngredientDetailsStyles.wrapper__center} text text_type_main-medium mt-4 mb-8`}>
        {currentIngredient.name}
      </p>
      <div className={`${IngredientDetailsStyles.items__list} mb-15`}>
        <div className={`${IngredientDetailsStyles.item} text text_type_main-default text_color_inactive`}>
          <p className='text-center'>Калорий,&nbsp;ккалл</p>
          <p className='text text_type_main-medium text-center mt-2' >{currentIngredient.calories}</p>
        </div>
        <div className={`${IngredientDetailsStyles.item} text text_type_main-default text_color_inactive`}>
          <p className='text-center'>Белки,&nbsp;г</p>
          <p className='text text_type_main-medium text-center mt-2'>{currentIngredient.proteins}</p>
        </div>
        <div className={`${IngredientDetailsStyles.item} text text_type_main-default text_color_inactive`}>
          <p className='text-center'>Жиры,&nbsp;г</p>
          <p className='text text_type_main-medium text-center mt-2'>{currentIngredient.fat}</p>
        </div>
        <div className={`${IngredientDetailsStyles.item} text text_type_main-default text_color_inactive`}>
          <p className='text-center'>Углеводы,&nbsp;г</p>
          <p className='text text_type_main-medium text-center mt-2'>{currentIngredient.carbohydrates}</p>
        </div>
      </div>
    </>
  )
}

IngredientDetails.propTypes = {
  currentIngredient: dataPropTypes.isRequired
}

export default IngredientDetails

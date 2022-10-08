import React from 'react'
import PropTypes from 'prop-types'
import Modal from '../Modal/Modal'
import IngredientDetailsStyles from './IngredientDetails.module.css'

const IngredientDetails = (props) => {
	return (
		<Modal {...props}>
			<div className={IngredientDetailsStyles.wrapper__center}>
				<img src={props.image_large} alt="img_product" />
			</div>
			<p className={`${IngredientDetailsStyles.wrapper__center} text text_type_main-medium mt-4 mb-8`}>{props.name}</p>
			<div className={`${IngredientDetailsStyles.items__list} mb-15`}>
				<div className={`${IngredientDetailsStyles.item} text text_type_main-default text_color_inactive`}>
					<p className='text-center'>Калорий,&nbsp;ккалл</p>
					<p className='text text_type_main-medium text-center mt-2' >{props.calories}</p>
				</div>
				<div className={`${IngredientDetailsStyles.item} text text_type_main-default text_color_inactive`}>
					<p className='text-center'>Белки,&nbsp;г</p>
					<p className='text text_type_main-medium text-center mt-2'>{props.calories}</p>
				</div>
				<div className={`${IngredientDetailsStyles.item} text text_type_main-default text_color_inactive`}>
					<p className='text-center'>Жиры,&nbsp;г</p>
					<p className='text text_type_main-medium text-center mt-2'>{props.calories}</p>
				</div>
				<div className={`${IngredientDetailsStyles.item} text text_type_main-default text_color_inactive`}>
					<p className='text-center'>Углеводы,&nbsp;г</p>
					<p className='text text_type_main-medium text-center mt-2'>{props.calories}</p>
				</div>
			</div>
		</Modal>
	)
}

IngredientDetails.propTypes = {
	props: PropTypes.any
}

export default IngredientDetails
import React from 'react'
import PropTypes from 'prop-types'
import Modal from '../Modal/Modal'
import IngredientDetailsStyles from './IngredientDetails.module.css'

const IngredientDetails = (props) => {
	return (
		<Modal {...props}>
			<div style={{ maxWidth: 518, width: '100%', textAlign: 'center' }}>
				<img src={props.image_large} alt="img_product" />
			</div>
			<p className='text text_type_main-medium mt-4 mb-8' style={{ maxWidth: 518, width: '100%', textAlign: 'center', whiteSpace: 'none' }}>{props.name}</p>
			<div className={`${IngredientDetailsStyles.items__list} mb-15`} style={{ display: 'flex', flexDirection: 'row', alignItems: 'space-between', maxWidth: 518, width: '100%', gap: 20 }}>
				<div className='text text_type_main-default text_color_inactive' style={{ alignItems: 'center', width: '100%' }}>
					<p style={{ textAlign: 'center' }}>Калорий,&nbsp;ккалл</p>
					<p className='text text_type_main-medium mt-2' style={{ textAlign: 'center' }}>{props.calories}</p>
				</div>
				<div className='text text_type_main-default text_color_inactive' style={{ alignItems: 'center', width: '100%' }}>
					<p style={{ textAlign: 'center' }}>Белки,&nbsp;г</p>
					<p className='text text_type_main-medium mt-2' style={{ textAlign: 'center' }}>{props.calories}</p>
				</div>
				<div className='text text_type_main-default text_color_inactive' style={{ alignItems: 'center', width: '100%' }}>
					<p style={{ textAlign: 'center' }}>Жиры,&nbsp;г</p>
					<p className='text text_type_main-medium mt-2' style={{ textAlign: 'center' }}>{props.calories}</p>
				</div>
				<div className='text text_type_main-default text_color_inactive' style={{ alignItems: 'center', width: '100%' }}>
					<p style={{ textAlign: 'center' }}>Углеводы,&nbsp;г</p>
					<p className='text text_type_main-medium mt-2' style={{ textAlign: 'center' }}>{props.calories}</p>
				</div>
			</div>
		</Modal>
	)
}

IngredientDetails.propTypes = {
	props: PropTypes.any
}

export default IngredientDetails
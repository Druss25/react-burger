import React from 'react'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import useModalControls from '../../hook/useModalControls'
import { dataPropTypes } from '../../utils/constants'
import IngredientDetails from '../IngredientDetails/IngredientDetails'
import CardItemStyles from './CardItem.module.css'

const CardItem = ({ ingredient, counter }) => {
	const titleModal = 'Детали ингредиента'
	const modalControls = useModalControls({ titleModal });
	return (
		<>
			<div className={`${CardItemStyles.wrapper} constructor-element__row`} onClick={ modalControls.open } >
				<div className='constructor-element__row'>
					<img src={ ingredient.image } alt='img' />
				</div>
				{counter > 0 && (<Counter className={CardItemStyles.counter} count={ counter } size='default' />)}
				<div className={`constructor-element__row ${CardItemStyles.wrapper_price} mt-1 mb-1`}>
					<p className="text text_type_digits-default mr-3">{ ingredient.price }</p>
					<CurrencyIcon type="primary" />
				</div>
				<div className={CardItemStyles.title}>
					<p className="text text_type_main-default">{ ingredient.name }</p>
				</div>
			</div>

			{/* IngredientDetails */}
			{modalControls.modalProps.isOpen && (<IngredientDetails data={ ingredient } modal={ modalControls.modalProps } />)}
		</>
	)
}

CardItem.propTypes = {
	ingredient: dataPropTypes.isRequired,
	counter: PropTypes.number.isRequired
}

export default CardItem
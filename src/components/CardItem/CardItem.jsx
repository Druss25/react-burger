import React from 'react'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import useModalControls from '../../hook/useModalControls'
import Modal from '../Modal/Modal'
import { dataPropTypes } from '../../utils/constants'
import IngredientDetails from '../IngredientDetails/IngredientDetails'
import CardItemStyles from './CardItem.module.css'

const CardItem = ({ currentIngredient, counter }) => {
	const titleModal = 'Детали ингредиента'
	const modalControls = useModalControls({ titleModal });
	return (
		<>
			<div className={`${CardItemStyles.wrapper} constructor-element__row`} onClick={ modalControls.open } >
				<div className='constructor-element__row'>
					<img src={ currentIngredient.image } alt='img' />
				</div>
				{counter > 0 && (<Counter className={CardItemStyles.counter} count={ counter } size='default' />)}
				<div className={`constructor-element__row ${CardItemStyles.wrapper_price} mt-1 mb-1`}>
					<p className="text text_type_digits-default mr-3">{ currentIngredient.price }</p>
					<CurrencyIcon type="primary" />
				</div>
				<div className={CardItemStyles.title}>
					<p className="text text_type_main-default">{ currentIngredient.name }</p>
				</div>
			</div>

			<Modal {...modalControls.modalProps} >
				<IngredientDetails currentIngredient={ currentIngredient }  />
			</Modal>
		</>
	)
}

CardItem.propTypes = {
	currentIngredient: dataPropTypes.isRequired,
	counter: PropTypes.number.isRequired
}

export default CardItem
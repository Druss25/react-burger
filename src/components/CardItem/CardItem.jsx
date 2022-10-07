import React from 'react'
import PropTypes from 'prop-types'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import CardItemStyles from './CardItem.module.css'
import useModalControls from '../../utils/useModalControls'
import Modal from '../Modal/Modal'
import { dataPropTypes } from '../../utils/data'

const CardItem = (props) => {
	const titleModal = 'Детали ингредиента'
	const modalControls = useModalControls({ titleModal, disableOverlayClick: true });
	return (
		<>
			<div className={`${CardItemStyles.wrapper} constructor-element__row`} onClick={modalControls.open} >
				<div className='constructor-element__row'>
					<img src={props.image} alt='img' />
				</div>
				{props.counter > 0 && (<Counter className={CardItemStyles.counter} count={props.counter} size='default' />)}
				<div className={`constructor-element__row ${CardItemStyles.wrapper_price} mt-1 mb-1`}>
					<p className="text text_type_digits-default mr-3">{props.price}</p>
					<CurrencyIcon type="primary" />
				</div>
				<div className={CardItemStyles.title}>
					<p className="text text_type_main-default">{props.name}</p>
				</div>
			</div>
			<Modal {...modalControls.modalProps}>
				<p className='text text_type_main-medium mt-4 mb-8'>{props.name}</p>
			</Modal>
		</>
	)
}

CardItem.propTypes = {
	props: dataPropTypes
}

export default CardItem
import React from 'react'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import CardItemStyles from './CardItem.module.css'
import useModalControls from '../../hook/useModalControls'
import { dataPropTypes } from '../../utils/data'
import IngredientDetails from '../IngredientDetails/IngredientDetails'

const CardItem = (props) => {
	const titleModal = 'Детали ингредиента'
	const modalControls = useModalControls({ titleModal });
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

			{/* IngredientDetails */}
			<IngredientDetails data={props} modal={modalControls.modalProps} />
		</>
	)
}

CardItem.propTypes = {
	props: dataPropTypes
}

export default CardItem
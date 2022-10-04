import React from 'react'
import PropTypes from 'prop-types'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import CardItemStyles from './CardItem.module.css'

const CardItem = ({ name, image, price, counter }) => {
	return (
		<div className={`${CardItemStyles.wrapper} constructor-element__row`}>
			<div className='constructor-element__row'>
				<img src={image} alt='img' />
			</div>
			{counter > 0 && (<Counter className={CardItemStyles.counter} count={counter} size='default'/>)}
			<div className={`constructor-element__row ${CardItemStyles.wrapper_price} mt-1 mb-1`}>
				<p className="text text_type_digits-default mr-3">{price}</p>
				<CurrencyIcon type="primary" />
			</div>
			<div className={CardItemStyles.title}>
				<p className="text text_type_main-default">{name}</p>
			</div>
		</div>
	)
}

CardItem.propTypes = {
	name: PropTypes.string.isRequired,
	image: PropTypes.string.isRequired,
	price: PropTypes.number.isRequired,
	counter: PropTypes.number
}

export default CardItem
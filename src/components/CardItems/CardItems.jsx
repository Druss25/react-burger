import React from 'react'
import PropTypes from 'prop-types'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const CardItems = ({ name, image, price, counter }) => {
	return (
		<div className='constructor-element__row' style={{ justifyItems: 'center', flexDirection: 'column', maxWidth: 272, width: '100%', position: 'relative' }}>
			<div className='constructor-element__row'>
				<img src={image} alt='img' />
			</div>
			{counter > 0 && (<Counter count={counter} size="default" style={{ position: 'absolute', top: 0, right: 0 }} />)}
			<div className="constructor-element__row mt-1 mb-1" style={{ justifyContent: 'center' }}>
				<p className="text text_type_digits-default mr-3">{price}</p>
				<CurrencyIcon type="primary" />
			</div>
			<div style={{ width: '100%', textAlign: 'center', height: 48 }}>
				<p className="text text_type_main-default">{name}</p>
			</div>
		</div>
	)
}

CardItems.propTypes = {
	name: PropTypes.string,
	image: PropTypes.string,
	price: PropTypes.number,
	counter: PropTypes.number
}

export default CardItems
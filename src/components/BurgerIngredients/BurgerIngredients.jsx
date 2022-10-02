import React from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import CardItems from '../CardItems/CardItems'
import { MyData, Products } from '../../utils/data'

const BurgerIngredients = ({ data }) => {
	const [current, setCurrent] = React.useState('bun')

	return (
		<>
			<div className='mt-5 mb-10' style={{ display: 'flex' }}>
				<Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
					Булки
				</Tab>
				<Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
					Соусы
				</Tab>
				<Tab value="main" active={current === 'main'} onClick={setCurrent}>
					Начинки
				</Tab>
			</div>

			<div className='custom-scroll' style={{ maxHeight: '664px', overflowY: 'auto' }}>
				<div style={{ height: '100%' }}>
					<p className='text text_type_main-medium mb-6'>{Products[current]}</p>
					<div className='pl-4' style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }} >
						{data.map((item) => current === item.type
							? (<CardItems image={item.image} name={item.name} price={item.price} counter={item.__v} />)
							: null)}
					</div>
				</div>
			</div>
		</>
	)
}

BurgerIngredients.propTypes = {
	data: PropTypes.arrayOf(MyData).isRequired
};

export default BurgerIngredients


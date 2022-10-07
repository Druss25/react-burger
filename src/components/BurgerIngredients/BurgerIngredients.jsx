import React from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import CardItem from '../CardItem/CardItem'
import useModalControls from '../../utils/useModalControls'
import { dataPropTypes, typeProducts } from '../../utils/data'
import BurgerIngredientsStyles from './BurgerIngredients.module.css'
import Modal from '../Modal/Modal'

const BurgerIngredients = ({ data }) => {
	const [current, setCurrent] = React.useState('bun')

	const getProducts = () => {
		let arr = []
		for (const name in typeProducts) {
			arr.push(name)
		}
		arr.pop(arr.length - 1)
		return arr
	}

	const arrProducts = getProducts()
	const className = 'text text_type_main-medium mb-6'

	return (
		<>
			<div className={`${BurgerIngredientsStyles.wrapper_tab} mt-5 mb-10`}>
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

			<div className={`${BurgerIngredientsStyles.wrapper} custom-scroll`} >
				<div className={BurgerIngredientsStyles.content}>
					{arrProducts.map((product) => (
						<div key={product} id={product} onClick={() => setCurrent(product)}>
							<p className={product !== arrProducts[0] ? `${className} mt-10` : `${className}`} >{typeProducts[product]}</p>
							<div className={`${BurgerIngredientsStyles.wrapper_card} pl-4`}>
								{data.map((item) => product === item.type
									? (<CardItem key={item._id} {...item} />)
									: null
								)}
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	)
}

BurgerIngredients.propTypes = {
	data: PropTypes.arrayOf(dataPropTypes).isRequired
};

export default BurgerIngredients


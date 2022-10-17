import React from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import CardItem from '../CardItem/CardItem'
import { typeProducts } from '../../utils/constants'
import { DataContext } from '../../services/dataContext'
import { getProducts } from '../../utils/data'
import BurgerIngredientsStyles from './BurgerIngredients.module.css'
import { IngredientContext } from '../../services/ingredientContext'

const BurgerIngredients = () => {
	const { data } = React.useContext(DataContext)
	const { ingredients } = React.useContext(IngredientContext)

	// counter = { ingredients.filter(current => current._id === item._id).length() }

	const [current, setCurrent] = React.useState('bun')

	const arrProducts = getProducts()

	const className = 'text text_type_main-medium mb-6'

	return (
		<>
			<div className={`${BurgerIngredientsStyles.wrapper_tab} mt-5 mb-10`}>
				{arrProducts.map((product) =>
					<Tab
						key={product}
						value={product}
						active={current === `${product}`}
						onClick={setCurrent}
					>
						{typeProducts[product]}
					</Tab>)}
			</div>
			<div className={`${BurgerIngredientsStyles.wrapper} custom-scroll`} >
				<div className={BurgerIngredientsStyles.content}>
					{arrProducts.map((product) => (
						<div key={product} id={product} onClick={() => setCurrent(product)}>
							<p className={product !== arrProducts[0] ? `${className} mt-10` : `${className}`} >{typeProducts[product]}</p>
							<div className={`${BurgerIngredientsStyles.wrapper_card} pl-4`}>
								{data.map(item => item.type === product
									? <CardItem key={item._id} ingredient={item} counter={ingredients.filter(count => count._id === item._id).length} />
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

export default BurgerIngredients


import React from 'react'
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import useModalControls from '../../hook/useModalControls';
import BurgerConstructorStyles from './BurgerConstructor.module.css'
import OrderDetails from '../OrderDetails/OrderDetails';
// import { dataFake } from '../../utils/data';
import { IngredientContext } from '../../services/ingredientContext';
import { DataContext } from '../../services/dataContext';

const BurgerConstructor = () => {
	const { data } = React.useContext(DataContext)
	const { ingredients, setIngredients } = React.useContext(IngredientContext)
	const [randomIngredient, setRandomIngredient] = React.useState({})
	const [totalPrice, setTotalPrice] = React.useState(null)
	const modalControls = useModalControls({})

	const ingredientBun = React.useMemo(
		() => data.filter(item => item.type === 'bun'), [data]
	);

	const random = () => {
		const res = Math.floor(Math.random() * ingredientBun.length);
		return ingredientBun[res]
	}

	const ingredientAll = React.useMemo(
		() => data.filter(item => item.type !== 'bun'), [data]
	)

	const setTotalAll = React.useMemo(
		() => ingredients.reduce((prevValue, currentValue) => prevValue + currentValue.price, 0) + randomIngredient.price, [ingredients, randomIngredient]
	)

	console.log(randomIngredient)
	React.useEffect(() => {
		setRandomIngredient(random())
		setIngredients(ingredientAll)
		// setIngredients(...ingredients, randomIngredient)
		setTotalPrice(setTotalAll)
		// eslint-disable-next-line
	}, [ingredients])

	// const body = {
	// 	"ingredients": [ingredients.map(ingredient => ingredient._id)]
	// }

	return (
		<>
			<div className={`${BurgerConstructorStyles.wrapper} constructor-element__row mt-25`}>
				<div className='mb-4'>
					<ConstructorElement
						type="top"
						isLocked
						text={`${randomIngredient.name} (верх)`}
						price={randomIngredient.price}
						thumbnail={randomIngredient.image}
					/>
				</div>

				<div className={`${BurgerConstructorStyles.list_items} custom-scroll constructor-element__row pr-4`}>
					{ingredients.length && ingredients.map((ingredient) => (
						<div key={ingredient._id} className={`${BurgerConstructorStyles.item} constructor-element__row`}>
							<DragIcon type="primary" />
							<ConstructorElement
								text={ingredient.name}
								price={ingredient.price}
								thumbnail={ingredient.image}
							/>
						</div>
					))}
				</div>

				<div className='mt-4'>
					<ConstructorElement
						type="bottom"
						isLocked
						text={`${randomIngredient.name} (низ)`}
						price={randomIngredient.price}
						thumbnail={randomIngredient.image}
					/>
				</div>

			</div>

			<div className={`${BurgerConstructorStyles.wrapper_total} constructor-element__row mt-10`}>
				<div className='constructor-element__row mr-10'>
					{totalPrice > 0 && (<p className='text text_type_digits-medium mr-2' id='total'>{totalPrice}</p>)}
					<CurrencyIcon type="primary" />
				</div>
				<div className='mr-8'>
					<Button type="primary" size="large" htmlType='button' onClick={modalControls.open}>
						Оформить заказ
					</Button>
				</div>
			</div>

			{/* OrderDetails  */}
			<OrderDetails modalProps={modalControls.modalProps} />
		</>
	)
}

export default BurgerConstructor
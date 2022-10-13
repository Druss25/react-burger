import React from 'react'
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import useModalControls from '../../hook/useModalControls';
import BurgerConstructorStyles from './BurgerConstructor.module.css'
import OrderDetails from '../OrderDetails/OrderDetails';
import { dataFake } from '../../utils/data';
import { IngredientContext } from '../../services/ingredientContext';
import { DataContext } from '../../services/dataContext';

const BurgerConstructor = () => {
	const [ingredients, setIngredients] = React.useContext(IngredientContext)
	const { data } = React.useContext(DataContext)
	const modalControls = useModalControls({})

	const ingredientBun = React.useMemo(
		() => dataFake.data.filter(item => item.type === 'bun'), []
	);
	const random = Math.floor(Math.random() * ingredientBun.length);
	const randomIngredientBun = ingredientBun[random]

	const ingredientAll = React.useMemo(
		() => dataFake.data.filter(item => item.type !== 'bun'), []
	)

	const totalIngredientPrice = randomIngredientBun.price + ingredientAll.reduce((total, currentValue) => total + currentValue.price, 0);

	React.useEffect(() => {
		setIngredients(ingredientAll)
		ingredients.unshift(randomIngredientBun)
		const body = {
			"ingredients": [ingredients.map(ingredient => ingredient._id)]
		}
		// eslint-disable-next-line
	}, [])


	return (
		<>
			<div className={`${BurgerConstructorStyles.wrapper} constructor-element__row mt-25`}>
				<div className='mb-4'>
					<ConstructorElement
						type="top"
						isLocked
						text={`${randomIngredientBun.name} (верх)`}
						price={randomIngredientBun.price}
						thumbnail={randomIngredientBun.image}
					/>
				</div>

				<div className={`${BurgerConstructorStyles.list_items} custom-scroll constructor-element__row pr-4`}>
					{ingredientAll.map((ingredient) => (
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
						text={`${randomIngredientBun.name} (низ)`}
						price={randomIngredientBun.price}
						thumbnail={randomIngredientBun.image}
					/>
				</div>
			</div>

			<div className={`${BurgerConstructorStyles.wrapper_total} constructor-element__row mt-10`}>
				<div className='constructor-element__row mr-10'>
					<p className='text text_type_digits-medium mr-2' id='total'>{totalIngredientPrice}</p>
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
import React from 'react'
import Accept from '../../images/graphics.svg'
import { baseUrl } from '../../utils/constants'
import { IngredientContext } from '../../services/ingredientContext'
// import OrderDetailsStyles from './OrderDetails.module.css'

const OrderDetails = () => {
	const { ingredients } = React.useContext(IngredientContext)
		
	const [state, setState] = React.useState({
		isLoading: false,
		hasError: false,
		order: {}
	})

	const ingredientsIDs = () => {
		const arr = []
		ingredients.map(ingredient => arr.push(ingredient._id));
		return { ingredients: arr }
	}

	const optionsFetch = {
		method: "POST",
		headers: {
			"Content-Type": "application/json; charset=UTF-8"
		},
		body: JSON.stringify(ingredientsIDs())
	}

	
	React.useEffect(() => {
		const getOrderData = async () => {
			try {
				setState({ ...state, hasError: false, isLoading: true });
				const res = await fetch(`${baseUrl}/orders`, optionsFetch);
				if (res.ok) {
					const { success, order } = await res.json();
					success && setState({ ...state, order, isLoading: false });
				} else {
					setState({ ...state, hasError: true, isLoading: false })
				}				
			} catch (error) {
				setState({ ...state, hasError: true, isLoading: false })
			}
		}
		getOrderData()
		// eslint-disable-next-line
	}, [])

	return (
		<>
			<p className='text text_type_digits-large mt-4 mb-8'>{state.order.number}</p>
			<p className='text text_type_main-medium'>идентификатор заказа</p>
			<img src={Accept} alt="Accept" className='mt-15 mb-15' width={120} height={120} />
			<p className='text text_type_main-default mb-2'>Ваш заказ начали готовить</p>
			<p className='text text_type_main-default text_color_inactive mb-30'>дождитесь готовности на орбитальной станции</p>
		</>
	)
}

export default OrderDetails
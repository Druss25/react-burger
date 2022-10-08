import React from 'react'
import Accept from '../../images/graphics.svg'
import Modal from '../Modal/Modal'
// import OrderDetailsStyles from './OrderDetails.module.css'


const OrderDetails = (props) => {
	return (
		<Modal {...props}>
			<p className='text text_type_digits-large mt-4 mb-8'>034536</p>
			<p className='text text_type_main-medium'>идентификатор заказа</p>
			<img src={Accept} alt="Accept" className='mt-15 mb-15' width={120} height={120} />
			<p className='text text_type_main-default mb-2'>Ваш заказ начали готовить</p>
			<p className='text text_type_main-default mb-30' style={{ color: '#8585AD' }}>дождитесь готовности на орбитальной станции</p>
		</Modal>
	)
}

export default OrderDetails
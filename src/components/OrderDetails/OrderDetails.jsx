import PropTypes from 'prop-types'
import Accept from '../../images/graphics.svg'
// import OrderDetailsStyles from './OrderDetails.module.css'

const OrderDetails = ({ numberOrder }) => {
  return (
    <>
      <p className='text text_type_digits-large mt-4 mb-8'>{numberOrder}</p>
      <p className='text text_type_main-medium'>идентификатор заказа</p>
      <img src={Accept} alt="Accept" className='mt-15 mb-15' width={120} height={120} />
      <p className='text text_type_main-default mb-2'>Ваш заказ начали готовить</p>
      <p className='text text_type_main-default text_color_inactive mb-30'>дождитесь готовности на орбитальной станции</p>
    </>
  )
}

OrderDetails.propTypes = {
  numberOrder: PropTypes.number
}

export default OrderDetails

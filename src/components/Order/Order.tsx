import { useAppSelector } from '../../services/store'
import { numberOrderSelector } from '../../services/reducers/order/selectors'

import ImageOrderAcceptSVG from '../../images/graphics.svg'

const OrderDetails: React.FC = () => {
  const numberOrder = useAppSelector(numberOrderSelector)

  return (
    <>
      {numberOrder === undefined ? (
        <p className="text text_type_main-large mt-4 mb-8">Идет обработка...</p>
      ) : (
        <p className="text text_type_digits-large mt-4 mb-8">{numberOrder}</p>
      )}
      <p className="text text_type_main-medium">идентификатор заказа</p>
      <img
        src={ImageOrderAcceptSVG}
        alt={'Images'}
        className="mt-15 mb-15"
        width={120}
        height={120}
      />
      <p className="text text_type_main-default mb-2">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive mb-30">
        дождитесь готовности на орбитальной станции
      </p>
    </>
  )
}

export default OrderDetails

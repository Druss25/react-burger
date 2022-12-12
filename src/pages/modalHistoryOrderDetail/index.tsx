import React from 'react'
import { useParams } from 'react-router-dom'
import Modal from '../../components/Modal/Modal'
import OrderDetails from '../../components/OrderDetails/OrderDetails'
import useModalControls from '../../hook/useModalControls'
import { getOrdersSelector } from '../../services/reducers/socket/history/wsSelectors'
import { useAppSelector } from '../../services/store'

const titleModal = 'Детали заказа'
const goBack = true

type TParamsType = {
  id: string
}

const ModalHistoryOrderDetailsPage: React.FC = () => {
  const { id } = useParams<TParamsType>()
  const orders = useAppSelector(getOrdersSelector)
  const modalControls = useModalControls({ titleModal, goBack })

  React.useEffect(() => {
    if (id) modalControls.open()
    // eslint-disable-next-line
  }, [])

  return (
    <Modal {...modalControls.modalProps}>
      <OrderDetails orders={orders} />
    </Modal>
  )
}

export default ModalHistoryOrderDetailsPage

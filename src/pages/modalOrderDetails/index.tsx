import React from 'react'
import { useParams } from 'react-router-dom'
import Modal from '../../components/Modal/Modal'
import OrderDetails from '../../components/OrderDetails/OrderDetails'
import useModalControls from '../../hook/useModalControls'

const titleModal = 'Детали заказа'
const goBack = true

type TParamsType = {
  id: string
}

const ModalOrderDetailsPage: React.FC = () => {
  const { id } = useParams<TParamsType>()
  const modalControls = useModalControls({ titleModal, goBack })

  React.useEffect(() => {
    if (id) modalControls.open()
    // eslint-disable-next-line
  }, [])

  return (
    <Modal {...modalControls.modalProps}>
      <OrderDetails />
    </Modal>
  )
}

export default ModalOrderDetailsPage

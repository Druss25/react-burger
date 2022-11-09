import React from 'react'
import { useParams } from 'react-router-dom'
import IngredientDetails from '../../components/IngredientDetails/IngredientDetails'
import Modal from '../../components/Modal/Modal'
import useModalControls from '../../hook/useModalControls'

const titleModal = 'Детали ингредиента'
const goBack = true

const ModalPage = () => {
  const params = useParams()
  const modalControls = useModalControls({ titleModal, goBack })
  React.useEffect(() => {
    if (params.id) modalControls.open()
  // eslint-disable-next-line
  }, [])

  return (
    <Modal {...modalControls.modalProps}>
        <IngredientDetails />
      </Modal>
  )
}

export default ModalPage

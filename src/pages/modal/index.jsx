import React from 'react'
import { useParams } from 'react-router-dom'
import IngredientDetails from '../../components/IngredientDetails/IngredientDetails'
import Modal, { IModalProps } from '../../components/Modal/Modal'
import useModalControls from '../../hook/useModalControls'

const titleModal = 'Детали ингредиента'
const goBack = true

// interface IModalPageProps {
//   titleModal: string
//   goBack: boolean
// }

// type IParams = {
//   id: string
// }

const ModalPage = () => {
  const params = useParams()
  const modalControls = useModalControls({ titleModal, goBack })
  React.useEffect(() => {
    if (params.id) modalControls.open()
    // eslint-disable-next-line
  }, [])

  return (
    <Modal>
      <IngredientDetails />
    </Modal>
  )
}

export default ModalPage

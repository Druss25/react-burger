import React from 'react'
import { useHistory } from 'react-router-dom'

const useModalControls = ({
  titleModal = '',
  disableCloseButton = false,
  disableOverlayClick = false,
  goBack = false,
}) => {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)
  const history = useHistory()

  function handleOpenModal() {
    setIsModalOpen(true)
  }

  function handleCloseModal() {
    setIsModalOpen(false)
    if (goBack) history.goBack()
  }

  return {
    open: handleOpenModal,
    close: handleCloseModal,
    modalProps: {
      isOpen: isModalOpen,
      goBack,
      requestClose: handleCloseModal,
      titleModal,
      disableCloseButton,
      disableOverlayClick,
    },
  }
}

export default useModalControls

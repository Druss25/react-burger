import React from 'react'
import { useHistory } from 'react-router-dom'

type TPropsModalControl = {
  titleModal?: string
  disableCloseButton?: boolean
  disableOverlayClick?: boolean
  goBack?: boolean
  handleClose?: () => void
}

const useModalControls = ({
  titleModal = '',
  disableCloseButton = false,
  disableOverlayClick = false,
  goBack = false,
  handleClose,
}: TPropsModalControl) => {
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false)
  const history = useHistory()

  function handleOpenModal() {
    setIsModalOpen(true)
  }

  async function handleCloseModal() {
    setIsModalOpen(false)
    if (goBack) history.goBack()
    if (typeof handleClose === 'function') handleClose()
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
      handleClose,
    },
  }
}

export default useModalControls

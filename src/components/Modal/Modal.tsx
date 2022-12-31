import React from 'react'
import ReactPortal from '../ReactPortal/ReactPortal'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import ModalOverlay from '../ModalOverlay/ModalOverlay'

import styles from './Modal.module.css'

export interface IModalProps {
  children?: React.ReactNode
  isOpen?: boolean
  requestClose?: () => void
  titleModal?: string
  disableCloseButton?: boolean
  disableOverlayClick?: boolean
}

const Modal: React.FC<React.PropsWithChildren<IModalProps>> = ({
  children,
  isOpen,
  requestClose,
  titleModal,
  disableCloseButton,
  disableOverlayClick,
}: IModalProps) => {
  const handleCloseOverlay = () => {
    if (disableOverlayClick) return null
    requestClose && requestClose()
  }

  const handleCloseModal = () => {
    requestClose && requestClose()
  }

  React.useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) => (e.key === 'Escape' ? handleCloseModal() : null)
    document.body.addEventListener('keydown', closeOnEscapeKey)
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey)
    }
    // eslint-disable-next-line
  }, [])

  return (
    <>
      {isOpen && (
        <ReactPortal wrapperId="modal">
          <div className={styles.modal}>
            <ModalOverlay onClick={handleCloseOverlay} />
            <div className={`${styles.modal__content} p-10`}>
              {!disableCloseButton && (
                <div
                  className={
                    titleModal !== ''
                      ? `${styles.modal__title__yes} text text_type_main-large`
                      : `${styles.modal__title__not} text text_type_main-large`
                  }
                >
                  {titleModal}
                  <div className={styles.modal__close} onClick={handleCloseModal} id="close_btn">
                    <CloseIcon type="primary" />
                  </div>
                </div>
              )}
              {children}
            </div>
          </div>
        </ReactPortal>
      )}
    </>
  )
}

export default Modal

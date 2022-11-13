import React from 'react'
import ReactPortal from '../ReactPortal/ReactPortal'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import ModalOverlay from '../ModalOverlay/ModalOverlay'

import styles from './Modal.module.css'

function Modal({
  children,
  isOpen,
  requestClose,
  titleModal,
  disableCloseButton,
  disableOverlayClick,
}) {
  const handleCloseOverlay = () => {
    if (disableOverlayClick) return
    requestClose && requestClose()
  }

  const handleCloseModal = () => {
    requestClose && requestClose()
  }

  React.useEffect(() => {
    const closeOnEscapeKey = e => (e.key === 'Escape' ? handleCloseModal() : null)
    document.body.addEventListener('keydown', closeOnEscapeKey)
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey)
    }
    // eslint-disable-next-line
  }, [])

  return (
    isOpen && (
      <ReactPortal wrapperId="modal">
        <div className={styles.modal}>
          <ModalOverlay onClick={handleCloseOverlay} />
          <div className={`${styles.modal__content} pt-10 pl-10 pr-10`}>
            {!disableCloseButton && (
              <div
                className={
                  titleModal !== ''
                    ? `${styles.modal__title__yes} text text_type_main-large`
                    : `${styles.modal__title__not} text text_type_main-large`
                }
              >
                {titleModal}
                <div className={styles.modal__close} onClick={handleCloseModal}>
                  <CloseIcon type="primary" />
                </div>
              </div>
            )}
            {children}
          </div>
        </div>
      </ReactPortal>
    )
  )
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  isOpen: PropTypes.bool.isRequired,
  requestClose: PropTypes.func.isRequired,
  titleModal: PropTypes.string.isRequired,
  disableCloseButton: PropTypes.bool.isRequired,
  disableOverlayClick: PropTypes.bool.isRequired,
}

export default Modal

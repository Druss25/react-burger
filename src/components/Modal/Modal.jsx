import React from 'react'
import ReactPortal from '../ReactPortal/ReactPortal';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import { modalProps } from '../../utils/constants';
import styles from './Modal.module.css'
import { useHistory } from 'react-router-dom';

function Modal(props) {
  const history = useHistory()

  function handleCloseOverlay() {
    if (props.disableOverlayClick) return
    props.requestClose && props.requestClose();
    if (props.goBack) {
      history.goBack(-1)
    }
  }

  const handleCloseModal = React.useCallback(
    () => {
      props.requestClose && props.requestClose()
      if (props.goBack) history.goBack(-1)
  },[history, props])

  React.useEffect(() => {
    const closeOnEscapeKey = e => e.key === "Escape" ? handleCloseModal() : null;
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
    // eslint-disable-next-line
  }, []);

  return (
    props.isOpen &&
    (
      <ReactPortal wrapperId='modal' >
        <div className={styles.modal}>
          <ModalOverlay onClick={handleCloseOverlay} />
          <div className={`${styles.modal__content} pt-10 pl-10 pr-10`}>
            {!props.disableCloseButton && (
              <div className={props.titleModal !== ''
                ? `${styles.modal__title__yes} text text_type_main-large`
                : `${styles.modal__title__not} text text_type_main-large`}
              >
                {props.titleModal}
                <div className={styles.modal__close} onClick={handleCloseModal}>
                  <CloseIcon type="primary" />
                </div>
              </div>
            )}
            {props.children}
          </div>
        </div>
      </ReactPortal>
    )
  )
}

Modal.propTypes = {
  props: modalProps
}

export default Modal

import ReactPortal from '../../utils/ReactPortal';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import ModalStyles from './Modal.module.css'


function Modal(props) {

	const handleCloseOverlay = () => {
    if (props.disableOverlayClick) {
      return;
    }
    props.requestClose && props.requestClose();
  }

	// useEffect(() => {
  //   const closeOnEscapeKey = e => e.key === "Escape" ? handleClose() : null;
  //   document.body.addEventListener("keydown", closeOnEscapeKey);
  //   return () => {
  //     document.body.removeEventListener("keydown", closeOnEscapeKey);
  //   };
  // }, [handleClose]);

	return (
		props.isOpen &&
    (
			<ReactPortal wrapperId='modal' >
				<div className={ModalStyles.modal}>
					<ModalOverlay onClick={handleCloseOverlay}/>
					<div className={ModalStyles.modal__content}>
						{props.children}
					</div>
				</div>		
			</ReactPortal>
		)
	)
}

export default Modal
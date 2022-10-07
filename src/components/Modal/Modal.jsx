import React from 'react'
import ReactPortal from '../../utils/ReactPortal';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import { modalProps } from '../../utils/data';
import ModalStyles from './Modal.module.css'


function Modal(props) {
	function handleCloseOverlay() {
		if (props.disableOverlayClick) {
			return;
		}
		props.requestClose && props.requestClose();
	}

	React.useEffect(() => {
		const closeOnEscapeKey = e => e.key === "Escape" ? props.requestClose() : null;
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
				<div className={ModalStyles.modal}>
					<ModalOverlay onClick={handleCloseOverlay} />
					<div className={`${ModalStyles.modal__content} pt-10 pl-10 pr-10`}>
						{!props.disableCloseButton && (
							<div className={props.titleModal !== undefined
								? `${ModalStyles.modal__title__yes} text text_type_main-large`
								: `${ModalStyles.modal__title__not} text text_type_main-large`}
							>
								{props.titleModal}
								<div className={ModalStyles.modal__close} onClick={() => props.requestClose && props.requestClose()}>
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
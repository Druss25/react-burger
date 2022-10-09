import ModalOverlayStyles from './ModalOverlay.module.css'

const ModalOverlay = ({ onClick }) => {
	return (
		<div className={ModalOverlayStyles.overlay} onClick={onClick}></div>
	)
}

export default ModalOverlay
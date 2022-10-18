import PropTypes from 'prop-types'
import ModalOverlayStyles from './ModalOverlay.module.css'

const ModalOverlay = ({ onClick }) => {
	return (
		<div className={ModalOverlayStyles.overlay} onClick={onClick}></div>
	)
}

ModalOverlay.propTypes = {
	onClick: PropTypes.func.isRequired
}

export default ModalOverlay
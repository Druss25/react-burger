import React from "react";
import PropTypes from 'prop-types'

const useModalControls = ({
  titleModal = '',
  disableCloseButton = false,
  disableOverlayClick = false,
  goBack = false } = {}) => {
	const [isModalOpen, setIsModalOpen] = React.useState(false);

	function handleOpenModal() {
		setIsModalOpen(true);
	}

	function handleCloseModal() {
		setIsModalOpen(false);
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
			disableOverlayClick
		}
	};
}

useModalControls.propTypes = {
	titleModal: PropTypes.string,
	disableCloseButton: PropTypes.bool,
	disableOverlayClick: PropTypes.bool
}

export default useModalControls

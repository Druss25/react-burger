import React from "react";
import PropTypes from 'prop-types'
import { useHistory } from "react-router-dom";

const useModalControls = ({
  titleModal = '',
  disableCloseButton = false,
  disableOverlayClick = false,
  goBack = false } = {}) => {
	const [isModalOpen, setIsModalOpen] = React.useState(false);
  const history = useHistory()

	function handleOpenModal() {
		setIsModalOpen(true);
	}

	function handleCloseModal() {
		setIsModalOpen(false);
    if (goBack)  history.goBack(-1)
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
	titleModal: PropTypes.string.isRequired,
	disableCloseButton: PropTypes.bool.isRequired,
	disableOverlayClick: PropTypes.bool.isRequired,
  goBack: PropTypes.bool.isRequired
}

export default useModalControls

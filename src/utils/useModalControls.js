import React from "react";

const useModalControls = ({ title = '', disableCloseButton, disableOverlayClick } = {}) => {
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
			requestClose: handleCloseModal,
			title,
			disableCloseButton,
			disableOverlayClick
		}
	};
}

export default useModalControls
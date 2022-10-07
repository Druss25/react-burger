import React from "react";

const useModalControls = ({ titleModal, disableCloseButton, disableOverlayClick } = {}) => {
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
			titleModal,
			disableCloseButton,
			disableOverlayClick
		}
	};
}

export default useModalControls
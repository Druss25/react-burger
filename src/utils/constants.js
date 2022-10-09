import PropTypes from 'prop-types'

export const urlAPI = "https://norma.nomoreparties.space/api/ingredients";

export const dataPropTypes = PropTypes.shape({
	_id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired,
	proteins: PropTypes.number,
	fat: PropTypes.number,
	carbohydrates: PropTypes.number,
	calories: PropTypes.number,
	price: PropTypes.number,
	image: PropTypes.string.isRequired,
	image_mobile: PropTypes.string,
	image_large: PropTypes.string,
	__v: PropTypes.number
})

export const modalProps = PropTypes.shape({
	isOpen: PropTypes.bool.isRequired,
	requestClose: PropTypes.func.isRequired,
	titleModal: PropTypes.string,
	disableCloseButton: PropTypes.bool,
	disableOverlayClick: PropTypes.bool
})

export const typeProducts = { bun: 'Булка', sauce: 'Соусы', main: 'Начинка' }

typeProducts.propTypes = {
	bun: PropTypes.string.isRequired,
	sauce: PropTypes.string.isRequired,
	main: PropTypes.string.isRequired
}

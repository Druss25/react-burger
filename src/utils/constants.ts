import PropTypes from "prop-types";

export const baseUrl = "https://norma.nomoreparties.space/api";

export const dataPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  image_mobile: PropTypes.string.isRequired,
  image_large: PropTypes.string.isRequired,
  __v: PropTypes.number.isRequired,
});

export const modalProps = PropTypes.shape({
  children: PropTypes.elementType,
  isOpen: PropTypes.bool.isRequired,
  requestClose: PropTypes.func.isRequired,
  titleModal: PropTypes.string.isRequired,
  disableCloseButton: PropTypes.bool.isRequired,
  disableOverlayClick: PropTypes.bool.isRequired,
});

export const enum TargetDropType {
  ADD_INGREDIENT = "ADD_INGREDIENT",
  SORTING_INGREDIENT = "SORTING_INGREDIENT",
}

export const TabOptions = {
  type: {
    BUN: "bun",
    SAUCE: "sauce",
    MAIN: "main",
  },
  name: {
    BUN: "Булка",
    SAUCE: "Соусы",
    MAIN: "Начинка",
  },
};

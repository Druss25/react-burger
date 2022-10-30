import React from "react";
import { useInView } from 'react-intersection-observer'
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import useModalControls from "../../hook/useModalControls";
import { getBun, getMain, getSauce } from "../../services/reducers/ingredients/selectors";
import BurgerIngredientsCategory from "../BurgerIngredientsCategory/BurgerIngredientsCategory";
import { useDispatch, useSelector } from "react-redux";
import { TabOptions } from "../../utils/constants";
import { ModalActionTypes } from '../../services/reducers/ingredient-modal/actions'
import styles from "./BurgerIngredients.module.css";

const titleModal = "Детали ингредиента";

const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = React.useState(TabOptions.type.BUN);

  const buns = useSelector(getBun)
  const sauces = useSelector(getSauce)
  const mains = useSelector(getMain)

  const modalControls = useModalControls({ titleModal });

  const [bunsRef, inBunsView] = useInView({ threshold: 0 })
  const [mainsRef, inMainsView] = useInView({ threshold: 0 })
  const [saucesRef, inSaucesView] = useInView({ threshold: 0 })

  React.useEffect(() => {
    if (inBunsView) {
      setCurrentTab(TabOptions.type.BUN)
    } else if (inSaucesView) {
      setCurrentTab(TabOptions.type.SAUCE)
    } else if (inMainsView) {
      setCurrentTab(TabOptions.type.MAIN)
    }
  }, [inBunsView, inSaucesView, inMainsView])

  const onTabClick = (value) => {
    setCurrentTab(value)
    const selectTab = document.getElementById(value);
    if (selectTab) selectTab.scrollIntoView({ behavior: "smooth" });
  };

  // eslint-disable-next-line
  const closeIngredientModal = () => {
    dispatch({ type: ModalActionTypes.MODAL_RESET })
  }
  const onIngredientClick = (ingredient) => {
    dispatch({ type: ModalActionTypes.MODAL_SET, payload: ingredient })
    modalControls.open();
  };

  return (
    <>
      <div className={`${styles.wrapper_tab} mt-5 mb-10`}>
        <Tab value={TabOptions.type.BUN} active={currentTab === TabOptions.type.BUN} onClick={onTabClick}>
          {TabOptions.name.BUN}
        </Tab>
        <Tab value={TabOptions.type.SAUCE} active={currentTab === TabOptions.type.SAUCE} onClick={onTabClick}>
          {TabOptions.name.SAUCE}
        </Tab>
        <Tab value={TabOptions.type.MAIN} active={currentTab === TabOptions.type.MAIN} onClick={onTabClick}>
          {TabOptions.name.MAIN}
        </Tab>
      </div>
      <div className={`${styles.wrapper} custom-scroll mb-10`}>
        <BurgerIngredientsCategory
          title={TabOptions.name.BUN}
          titleId={TabOptions.type.BUN}
          ingredients={buns}
          onIngredientClick={onIngredientClick}
          ref={bunsRef}
        />
        <BurgerIngredientsCategory
          title={TabOptions.name.SAUCE}
          titleId={TabOptions.type.SAUCE}
          ingredients={sauces}
          onIngredientClick={onIngredientClick}
          ref={saucesRef}
        />
        <BurgerIngredientsCategory
          title={TabOptions.name.MAIN}
          titleId={TabOptions.type.MAIN}
          ingredients={mains}
          onIngredientClick={onIngredientClick}
          ref={mainsRef}
        />
      </div>

      {modalControls.modalProps.isOpen && (
        <Modal {...modalControls.modalProps}>
          <IngredientDetails />
        </Modal>
      )}
    </>
  );
};

export default BurgerIngredients;

import React from "react";
import { useInView } from 'react-intersection-observer'
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import useModalControls from "../../hook/useModalControls";
import { ingredientsSelector } from "../../services/ingredients/selectors";
import BurgerIngredientsCategory from "../BurgerIngredientsCategory/BurgerIngredientsCategory";
import styles from "./BurgerIngredients.module.css";
import { useSelector } from "react-redux";

const BurgerIngredients = () => {
  const ingredients = useSelector(ingredientsSelector)
  const [isIngredientModal, setIsIngredientModal] = React.useState({});
  const [currentTab, setCurrentTab] = React.useState("bun");

  const titleModal = "Детали ингредиента";
  const modalControls = useModalControls({ titleModal });

  const [bunsRef, inBunsView] = useInView({ threshold: 0 })
  const [mainsRef, inMainsView] = useInView({ threshold: 0 })
  const [saucesRef, inSaucesView] = useInView({ threshold: 0 })

  React.useEffect(() => {
    if (inBunsView) {
      setCurrentTab('bun')
    } else if (inSaucesView) {
      setCurrentTab('sauce')
    } else if (inMainsView) {
      setCurrentTab('main')
    }
  }, [inBunsView, inSaucesView, inMainsView])

  const onTabClick = (value) => {
    setCurrentTab(value)
    const selectTab = document.getElementById(value);
    if (selectTab) selectTab.scrollIntoView({ behavior: "smooth" });
  };

  const onIngredientClick = (currentIngredient) => {
    setIsIngredientModal(currentIngredient);
    modalControls.open();
  };

  const buns = React.useMemo(
    () => ingredients.filter((item) => item.type === "bun"),
    [ingredients]
  );

  const sauces = React.useMemo(
    () => ingredients.filter((item) => item.type === "sauce"),
    [ingredients]
  );

  const mains = React.useMemo(
    () => ingredients.filter((item) => item.type === "main"),
    [ingredients]
  );

  return (
    <>
      <div className={`${styles.wrapper_tab} mt-5 mb-10`}>
        <Tab value="bun" active={currentTab === "bun"} onClick={onTabClick}>
          Булки
        </Tab>
        <Tab value="sauce" active={currentTab === "sauce"} onClick={onTabClick}>
          Соусы
        </Tab>
        <Tab value="main" active={currentTab === "main"} onClick={onTabClick}>
          Начинки
        </Tab>
      </div>
      <div className={`${styles.wrapper} custom-scroll mb-10`}>
        <BurgerIngredientsCategory
          title={'Булки'}
          titleId={'bun'}
          ingredients={buns}
          onIngredientClick={onIngredientClick}
          ref={bunsRef}
        />
        <BurgerIngredientsCategory
          title={'Соусы'}
          titleId={'sauce'}
          ingredients={sauces}
          onIngredientClick={onIngredientClick}
          ref={saucesRef}
        />
        <BurgerIngredientsCategory
          title={'Начинки'}
          titleId={'main'}
          ingredients={mains}
          onIngredientClick={onIngredientClick}
          ref={mainsRef}
        />
      </div>

      {modalControls.modalProps.isOpen && (
        <Modal {...modalControls.modalProps}>
          <IngredientDetails currentIngredient={isIngredientModal} />
        </Modal>
      )}
    </>
  );
};

export default BurgerIngredients;

import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import CardItem from "../CardItem/CardItem";
import { DataContext } from "../../services/dataContext";
import BurgerIngredientsStyles from "./BurgerIngredients.module.css";
import { IngredientContext } from "../../services/ingredientContext";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import useModalControls from "../../hook/useModalControls";

const BurgerIngredients = () => {
  const { data } = React.useContext(DataContext);
  const { ingredients } = React.useContext(IngredientContext);
  const [isIngredientModal, setIsIngredientModal] = React.useState({});
  const [current, setCurrent] = React.useState("bun");

  const titleModal = "Детали ингредиента";
  const modalControls = useModalControls({ titleModal });

  const onTabClick = (value) => {
    const selectTab = document.getElementById(value);
    if (selectTab) selectTab.scrollIntoView({ behavior: "smooth" });
    setCurrent(value);
  };

  const handleClick = (currentIngredient) => {
    setIsIngredientModal(currentIngredient);
    modalControls.open();
  };

  const buns = React.useMemo(
    () => data.filter((item) => item.type === "bun"),
    [data]
  );

  const sauces = React.useMemo(
    () => data.filter((item) => item.type === "sauce"),
    [data]
  );

  const mains = React.useMemo(
    () => data.filter((item) => item.type === "main"),
    [data]
  );

  return (
    <>
      <div className={`${BurgerIngredientsStyles.wrapper_tab} mt-5 mb-10`}>
        <Tab value="bun" active={current === "bun"} onClick={onTabClick}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === "sauce"} onClick={onTabClick}>
          Соусы
        </Tab>
        <Tab value="main" active={current === "main"} onClick={onTabClick}>
          Начинки
        </Tab>
      </div>
      <div className={`${BurgerIngredientsStyles.wrapper} custom-scroll`}>
        <div className={BurgerIngredientsStyles.content}>
          <p id="bun" className="text text_type_main-medium mt-10 mb-6">
            Булки
          </p>
          <div className={`${BurgerIngredientsStyles.wrapper_card} pl-4`}>
            {buns.map((item) => (
              <CardItem
                key={item._id}
                currentIngredient={item}
                counter={
                  ingredients.filter((count) => count._id === item._id).length
                }
                onClick={handleClick}
              />
            ))}
          </div>
        </div>
        <div className={BurgerIngredientsStyles.content}>
          <p id="sauce" className="text text_type_main-medium mt-10 mb-6">
            Соусы
          </p>
          <div className={`${BurgerIngredientsStyles.wrapper_card} pl-4`}>
            {sauces.map((item) => (
              <CardItem
                key={item._id}
                currentIngredient={item}
                counter={
                  ingredients.filter((count) => count._id === item._id).length
                }
                onClick={handleClick}
              />
            ))}
          </div>
        </div>
        <div className={BurgerIngredientsStyles.content}>
          <p id="main" className="text text_type_main-medium mt-10 mb-6">
            Начинки
          </p>
          <div className={`${BurgerIngredientsStyles.wrapper_card} pl-4`}>
            {mains.map((item) => (
              <CardItem
                key={item._id}
                currentIngredient={item}
                counter={
                  ingredients.filter((count) => count._id === item._id).length
                }
                onClick={handleClick}
              />
            ))}
          </div>
        </div>
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

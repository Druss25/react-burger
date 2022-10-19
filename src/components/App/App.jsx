import React from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { IngredientContext } from "../../services/ingredientContext";
import { useAppDispatch } from "../../hook/useAppDispatch";
import { getIngredients } from "../../services/actions/ingredients";
import { useAppSelector } from "../../hook/useAppSelector";
import AppStyles from "./App.module.css";

function App() {
  const { isLoading, hasError } = useAppSelector(state => state.ingredients)
  const [ingredients, setIngredients] = React.useState([]);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <IngredientContext.Provider value={{ ingredients, setIngredients }}>
      <div className={AppStyles.app}>
        {hasError ? (
          <div className={AppStyles.messages}>
            <p className="text text_type_main-medium">
              Ошибка загрузки данных с сервера...
            </p>
          </div>
        ) : isLoading ? (
          <div className={AppStyles.messages}>
            <p className="text text_type_main-medium">
              Загрузка данных с сервера...
            </p>
          </div>
        ) : (
          <>
            <AppHeader />
            <main className={AppStyles.main}>
              <section className={AppStyles.wrapper}>
                <p className="text text_type_main-large mt-10">
                  Соберите бургер
                </p>
                <BurgerIngredients />
              </section>
              <section className={AppStyles.wrapper}>
                <BurgerConstructor />
              </section>
            </main>
          </>
        )}
      </div>
    </IngredientContext.Provider>
  );
}

export default App;

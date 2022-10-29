import React from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import { IngredientContext } from "../../services/ingredientContext";
import { useAppDispatch } from "../../hook/useAppDispatch";
import { getIngredients } from "../../services/ingredients/actions";
import { useAppSelector } from "../../hook/useAppSelector";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { errorSelector, loadingSelector } from "../../services/ingredients/selectors";
import AppStyles from "./App.module.css";

function App() {
  const isLoading = useAppSelector(loadingSelector);
  const hasError = useAppSelector(errorSelector);

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
            <DndProvider backend={HTML5Backend}>
              <main className={AppStyles.main}>
                <section className={AppStyles.wrapper}>
                  <p className="text text_type_main-large mt-10">
                    Соберите бургер
                  </p>
                  <BurgerIngredients />
                </section>
                <BurgerConstructor />
              </main>
            </DndProvider>
          </>
        )}
      </div>
    </IngredientContext.Provider>
  );
}

export default App;

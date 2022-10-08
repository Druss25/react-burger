import React from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import useGetData from "../../hook/useGetData";
import AppStyles from './App.module.css'

function App() {
  const { isLoading, hasError, data } = useGetData()

  return (
    <div className={AppStyles.app}>
      {
        hasError
          ? (<div className={AppStyles.messages}><p className='text text_type_main-medium'>Ошибка загрузки данных с сервера...</p></div>)
          : isLoading
            ? (<div className={AppStyles.messages}><p className='text text_type_main-medium'>Загрузка данных с сервера...</p></div>)
            : (
              <>
                <AppHeader />
                <main className={AppStyles.main}>
                  <section className={AppStyles.wrapper}>
                    <p className="text text_type_main-large mt-10">Соберите бургер</p>
                    <BurgerIngredients data={data} />
                  </section>
                  <section className={AppStyles.wrapper}>
                    <BurgerConstructor />
                  </section>
                </main>
              </>
            )}
    </div>
  );
}

export default App;
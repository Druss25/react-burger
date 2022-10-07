import React from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import AppStyles from './App.module.css'

function App() {
  const [state, setState] = React.useState({
    isLoading: false,
    hasError: false,
    data: [],
  });

  const urlAPI = "https://norma.nomoreparties.space/api/ingredients";

  React.useEffect(() => {
    const getData = async () => {
      try {
        setState({ ...state, hasError: false, isLoading: true });
        const res = await fetch(urlAPI);
        const {data, success} = await res.json();
				if (success) {
        	setState({ ...state, data, isLoading: false });
				}
				else console.log(data)
      } catch (error) {
        setState({ ...state, hasError: true, isLoading: false });
      }
    };

		getData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className={AppStyles.app}>
      {
      state.hasError 
      ? ( <div className={AppStyles.messages}><p className='text text_type_main-medium'>Ошибка загрузки данных с сервера...</p></div> )
      : state.isLoading 
        ? (<div className={AppStyles.messages}><p className='text text_type_main-medium'>Загрузка данных с сервера...</p></div>)
        : (
            <>
              <AppHeader />
              <main className={AppStyles.main}>
                <section className={AppStyles.wrapper}>
                  <p className="text text_type_main-large mt-10">Соберите бургер</p>
                  <BurgerIngredients data={state.data} />
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
import React from "react";
import {dataFake} from "./utils/data";
import AppHeader from "./components/AppHeader/AppHeader";
import BurgerIngredients from "./components/BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "./components/BurgerConstructor/BurgerConstructor";
import "./App.css";

function App() {
  return (
    <div className="app">
      <AppHeader />
      <main className="main">
        <section className="wrapper">
          <p className="text text_type_main-large mt-10">Соберите бургер</p>
          <BurgerIngredients data={dataFake} />
        </section>
        <section className="wrapper">
          <BurgerConstructor />
        </section>
      </main>
    </div>
  );
}

export default App;

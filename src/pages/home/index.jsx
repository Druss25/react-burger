import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor'
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients'
import { useAppDispatch } from '../../hook/useAppDispatch'
import { useAppSelector } from '../../hook/useAppSelector'
import { getIngredients } from '../../services/reducers/ingredients/actions'
import { errorSelector, loadingSelector } from '../../services/reducers/ingredients/selectors'
import styles from './home.module.css'

const HomePage = () => {
  const isLoading = useAppSelector(loadingSelector);
  const hasError = useAppSelector(errorSelector);

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>
      {hasError ? (
        <div className={styles.messages}>
          <p className="text text_type_main-medium">
            Ошибка загрузки данных с сервера...
          </p>
        </div>
      ) : isLoading ? (
        <div className={styles.messages}>
          <p className="text text_type_main-medium">
            Загрузка данных с сервера...
          </p>
        </div>
      ) : (
        <DndProvider backend={HTML5Backend}>
          <main className={styles.main}>
            <section className={styles.wrapper}>
              <p className="text text_type_main-large mt-10">
                Соберите бургер
              </p>
              <BurgerIngredients />
            </section>
            <BurgerConstructor />
          </main>
        </DndProvider>
      )}
    </>
  )
}

export default HomePage

import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useDispatch, useSelector } from 'react-redux'
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor'
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients'
import { getIngredients } from '../../services/reducers/ingredients/actions'
import { errorSelector, loadingSelector } from '../../services/reducers/ingredients/selectors'
import styles from './home.module.css'

const HomePage = () => {
  const isLoading = useSelector(loadingSelector);
  const hasError = useSelector(errorSelector);
  const dispatch = useDispatch();

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
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      )}
    </>
  )
}

export default HomePage

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useSelector } from 'react-redux'
import BurgerConstructor from '../../components/BurgerConstructor/BurgerConstructor'
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients'
import Spinner from '../../components/Spinner/Spinner'
import { authSelector } from '../../services/reducers/auth/selectors'

import styles from './home.module.css'

const HomePage = () => {
  const { isLoading, hasError } = useSelector(authSelector)

  if (isLoading) return <Spinner />

  return (
    <>
      {hasError ? (
        <div className={styles.messages}>
          <p className="text text_type_main-medium">Ошибка загрузки данных с сервера...</p>
        </div>
      ) : isLoading ? (
        <Spinner />
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

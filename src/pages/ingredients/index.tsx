import IngredientDetails from '../../components/IngredientDetails/IngredientDetails'

import styles from './ingredients.module.css'

const IngredientPage: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={`${styles.content} pt-10 pl-10 pr-10`}>
        <span className="text text_type_main-large">Детали ингредиента</span>
        <IngredientDetails />
      </div>
    </div>
  )
}

export default IngredientPage

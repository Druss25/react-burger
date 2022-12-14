import React from 'react'
import { useInView } from 'react-intersection-observer'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { useAppSelector } from '../../hook/redux-hook'
import useModalControls from '../../hook/useModalControls'
import { getBun, getMain, getSauce } from '../../services/reducers/ingredients/selectors'
import BurgerIngredientsCategory from '../BurgerIngredientsCategory/BurgerIngredientsCategory'
import { TabOptions } from '../../utils/constants'
import Spinner from '../Spinner/Spinner'

import styles from './BurgerIngredients.module.css'

const titleModal = 'Детали ингредиента'

const BurgerIngredients: React.FC = () => {
  const [currentTab, setCurrentTab] = React.useState(TabOptions.type.BUN)
  const buns = useAppSelector(getBun)
  const sauces = useAppSelector(getSauce)
  const mains = useAppSelector(getMain)
  const modalControls = useModalControls({ titleModal })
  const [bunsRef, inBunsView] = useInView({ threshold: 0 })
  const [mainsRef, inMainsView] = useInView({ threshold: 0 })
  const [saucesRef, inSaucesView] = useInView({ threshold: 0 })

  React.useEffect(() => {
    if (inBunsView) {
      setCurrentTab(TabOptions.type.BUN)
    } else if (inSaucesView) {
      setCurrentTab(TabOptions.type.SAUCE)
    } else if (inMainsView) {
      setCurrentTab(TabOptions.type.MAIN)
    }
  }, [inBunsView, inSaucesView, inMainsView])

  const onTabClick = (value: string) => {
    setCurrentTab(value)
    const selectTab = document.getElementById(value)
    if (selectTab) selectTab.scrollIntoView({ behavior: 'smooth' })
  }

  const onIngredientClick = () => modalControls.open()

  if (!buns || !sauces || !mains) return <Spinner />

  return (
    <section className={styles.section}>
      <h2 className="text text_type_main-large mt-10">Соберите бургер</h2>
      <div className={`${styles.wrapper_tab} mt-5 mb-10`}>
        <Tab
          value={TabOptions.type.BUN}
          active={currentTab === TabOptions.type.BUN}
          onClick={onTabClick}
        >
          {TabOptions.name.BUN}
        </Tab>
        <Tab
          value={TabOptions.type.SAUCE}
          active={currentTab === TabOptions.type.SAUCE}
          onClick={onTabClick}
        >
          {TabOptions.name.SAUCE}
        </Tab>
        <Tab
          value={TabOptions.type.MAIN}
          active={currentTab === TabOptions.type.MAIN}
          onClick={onTabClick}
        >
          {TabOptions.name.MAIN}
        </Tab>
      </div>
      <div className={`${styles.wrapper} custom-scroll`}>
        <BurgerIngredientsCategory
          title={TabOptions.name.BUN}
          titleId={TabOptions.type.BUN}
          ingredients={buns}
          onIngredientClick={onIngredientClick}
          ref={bunsRef}
        />
        <BurgerIngredientsCategory
          title={TabOptions.name.SAUCE}
          titleId={TabOptions.type.SAUCE}
          ingredients={sauces}
          onIngredientClick={onIngredientClick}
          ref={saucesRef}
        />
        <BurgerIngredientsCategory
          title={TabOptions.name.MAIN}
          titleId={TabOptions.type.MAIN}
          ingredients={mains}
          onIngredientClick={onIngredientClick}
          ref={mainsRef}
        />
      </div>
    </section>
  )
}

export default BurgerIngredients

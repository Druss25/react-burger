import React from 'react'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import CardItem from '../CardItem/CardItem'
import { DataContext } from '../../services/dataContext'
import BurgerIngredientsStyles from './BurgerIngredients.module.css'
import { IngredientContext } from '../../services/ingredientContext'

const BurgerIngredients = () => {
	const { data } = React.useContext(DataContext)
	const { ingredients } = React.useContext(IngredientContext)

	const [current, setCurrent] = React.useState('bun')

  const refBun = React.useRef(null)
  const refSauce = React.useRef(null)
  const refMain = React.useRef(null)

  const onTabClick = (value) => {
    if (refBun.current.id === value) refBun.current.scrollIntoView({behavior: "smooth"})
    if (refSauce.current.id === value) refSauce.current.scrollIntoView({behavior: "smooth"})
    if (refMain.current.id === value) refMain.current.scrollIntoView({behavior: "smooth"})
    setCurrent(value)
  }

  const buns = React.useMemo(()=>(data.filter(item => item.type === 'bun')),[data])
  const sauces = React.useMemo(()=>(data.filter(item => item.type === 'sauce')),[data])
  const mains = React.useMemo(()=>(data.filter(item => item.type === 'main')),[data])

	return (
		<>
			<div className={`${BurgerIngredientsStyles.wrapper_tab} mt-5 mb-10`}>
				<Tab value='bun' active={current === 'bun'} onClick={onTabClick} >
						Булки
				</Tab>
        <Tab value='sauce' active={current === 'sauce'} onClick={onTabClick} >
						Соусы
				</Tab>
        <Tab value='main' active={current === 'main'} onClick={onTabClick} >
						Начинки
				</Tab>
			</div>
			<div className={`${BurgerIngredientsStyles.wrapper} custom-scroll`} >

        <div ref={refBun} id='bun' className={BurgerIngredientsStyles.content}>
            <p className='text text_type_main-medium mt-10 mb-6' >
              Булки
            </p>
            <div className={`${BurgerIngredientsStyles.wrapper_card} pl-4`}>
              {buns.map(item =>
                <CardItem
                  key={item._id}
                  currentIngredient={item}
                  counter={ingredients.filter(count => count._id === item._id).length}
                />
              )}
            </div>
        </div>
        <div id='sauce' ref={refSauce} className={BurgerIngredientsStyles.content}>
            <p className='text text_type_main-medium mt-10 mb-6' >
              Соусы
            </p>
            <div className={`${BurgerIngredientsStyles.wrapper_card} pl-4`}>
              {sauces.map(item =>
                <CardItem
                  key={item._id}
                  currentIngredient={item}
                  counter={ingredients.filter(count => count._id === item._id).length}
                />
              )}
            </div>
        </div>
        <div id='main' ref={refMain} className={BurgerIngredientsStyles.content}>
            <p className='text text_type_main-medium mt-10 mb-6' >
              Начинки
            </p>
            <div className={`${BurgerIngredientsStyles.wrapper_card} pl-4`}>
              {mains.map(item =>
                <CardItem
                  key={item._id}
                  currentIngredient={item}
                  counter={ingredients.filter(count => count._id === item._id).length}
                />
              )}
            </div>
        </div>

			</div>
		</>
	)
}

export default BurgerIngredients

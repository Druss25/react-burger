import React from 'react'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import { dataPropTypes } from '../../utils/constants'
import CardItemStyles from './CardItem.module.css'
import { useDrag } from 'react-dnd'

const CardItem = ({ currentIngredient, counter, onClick }) => {
  const { name, price, image } = currentIngredient
  const [{ opacity }, dragRef] = useDrag({
    type: "ingredient",
    item: { ...currentIngredient },
    // collect: monitor => ({
    //   isDrag: monitor.isDragging()
    // })
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  });

  const handleClick = () => {
    onClick(currentIngredient)
  }

  return (
    <>
      <div ref={dragRef} className={`${CardItemStyles.wrapper} constructor-element__row`} onClick={handleClick} style={{ opacity }}>
        <div className='constructor-element__row' >
          <img src={image} alt='img_ingredient' />
        </div>
        {counter > 0 && (<Counter className={CardItemStyles.counter} count={counter} size='default' />)}
        <div className={`constructor-element__row ${CardItemStyles.wrapper_price} mt-1 mb-1`}>
          <p className="text text_type_digits-default mr-3">{price}</p>
          <CurrencyIcon />
        </div>
        <div className={CardItemStyles.title}>
          <p className="text text_type_main-default">{name}</p>
        </div>
      </div>
    </>
  )
}

CardItem.propTypes = {
  currentIngredient: dataPropTypes.isRequired,
  counter: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
}

export default CardItem

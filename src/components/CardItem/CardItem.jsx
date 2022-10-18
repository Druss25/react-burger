import React from 'react'
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from 'prop-types'
import { dataPropTypes } from '../../utils/constants'
import CardItemStyles from './CardItem.module.css'

const CardItem = ({ currentIngredient, counter, onClick }) => {

  const handleClick = () => {
    onClick(currentIngredient)
  }

  return (
    <>
      <div className={`${CardItemStyles.wrapper} constructor-element__row`} onClick={handleClick} >
        <div className='constructor-element__row'>
          <img src={currentIngredient.image} alt='img_ingredient' />
        </div>
        {counter > 0 && (<Counter className={CardItemStyles.counter} count={counter} size='default' />)}
        <div className={`constructor-element__row ${CardItemStyles.wrapper_price} mt-1 mb-1`}>
          <p className="text text_type_digits-default mr-3">{currentIngredient.price}</p>
          <CurrencyIcon />
        </div>
        <div className={CardItemStyles.title}>
          <p className="text text_type_main-default">{currentIngredient.name}</p>
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

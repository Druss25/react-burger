import React from 'react'
import { Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import useModalControls from '../../hook/useModalControls';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import { addToBurger } from '../../services/reducers/burger/actions';
import { getBurgerItems, totalBurgerPrice } from '../../services/reducers/burger/selectors';
import { isLoadingOrderSelector, NumberOrderSelector } from '../../services/reducers/order/selectors';
import BurgerConstructorElement from '../BurgerConstructorElement/BurgerConstructorElement';
import { getOrder, OrderActionTypes } from '../../services/reducers/order/actions';
import { TargetDropType } from '../../utils/constants'
import styles from './BurgerConstructor.module.css'

const BurgerConstructor = () => {
  const dispatch = useDispatch()
  const burgerItems = useSelector(getBurgerItems)
  const totalPrice = useSelector(totalBurgerPrice)
  const isLoadingOrder = useSelector(isLoadingOrderSelector)
  const numberOrder = useSelector(NumberOrderSelector)
  const modalControls = useModalControls({})

  const [, drop] = useDrop(() => ({
    accept: TargetDropType.ADD_INGREDIENT,
    drop: (ingredient) => dispatch(addToBurger(ingredient)),
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  }))

  const handlerOrderClick = () => {
    if (!burgerItems.bun || burgerItems.ingredients.length === 0 || isLoadingOrder) return
    dispatch(
      getOrder([
        burgerItems.bun._id,
        ...burgerItems.ingredients.map(ingredient => ingredient._id),
        burgerItems.bun._id,
      ])
    )
    modalControls.open()
  }

  // eslint-disable-next-line
  const handlerOrderCloseModal = () => dispatch({ type: OrderActionTypes.ORDER_RESET })

  return (
    <>
      <section className={`${styles.wrapper} constructor-element__row mt-25`} ref={drop}>
        {burgerItems.bun
          ? (
            <div className='mb-4'>
              <ConstructorElement
                type="top"
                isLocked
                text={`${burgerItems.bun.name} (верх)`}
                price={burgerItems.bun.price}
                thumbnail={burgerItems.bun.image}
              />
            </div>
          )
          :
          (
            <div
              className={`${styles.grow_none} constructor-element constructor-element_pos_top constructor-element__row mb-4`}>
              <p className={`${styles.full_center} text text_type_main-default`}>
                Выберите булку
              </p>
            </div>
          )
        }

        <div className={`${styles.list_items} custom-scroll constructor-element__row`}>
          {burgerItems.ingredients.length > 0
            ? (
              burgerItems.ingredients.map((ingredient, index) => {
                return (
                  <BurgerConstructorElement
                    ingredient={ingredient}
                    index={index}
                    key={ingredient.id}
                  />
                )
              }
              ))
            : (
              <div className='constructor-element constructor-element__row'>
                <p className={`${styles.full_center} text text_type_main-default`}>
                  Выберите соусы и начинку
                </p>
              </div>
            )
          }
        </div>

        {burgerItems.bun
          ? (
            <div className='mt-4'>
              <ConstructorElement
                type="bottom"
                isLocked
                text={`${burgerItems.bun.name} (низ)`}
                price={burgerItems.bun.price}
                thumbnail={burgerItems.bun.image}
              />
            </div>
          )
          : (
            <div
              className={`${styles.grow_none} constructor-element constructor-element_pos_bottom constructor-element__row mt-4`}>
              <p className={`${styles.full_center} text text_type_main-default`}>
                Выберите булку
              </p>
            </div>
          )
        }

        <div className={`${styles.wrapper_total} constructor-element__row mt-10`}>
          <div className='constructor-element__row'>
            <p className='text text_type_digits-medium mr-2' id='total'>{totalPrice}</p>
            <CurrencyIcon type="primary" />
          </div>
          <div className='ml-10 mr-4'>
            <Button type="primary" size="large" htmlType='button' onClick={handlerOrderClick}>
              Оформить заказ
            </Button>
          </div>
        </div>
      </section>

      {modalControls.modalProps.isOpen && (<Modal {...modalControls.modalProps} >
        <OrderDetails numberOrder={numberOrder} />
      </Modal>)
      }
    </>
  )
}

export default BurgerConstructor

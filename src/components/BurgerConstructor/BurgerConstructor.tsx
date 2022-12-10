import React from 'react'
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import useModalControls from '../../hook/useModalControls'
import Modal from '../Modal/Modal'
import OrderDetails from '../Order/Order'
import { useDrop } from 'react-dnd'
import { useAppDispatch, useAppSelector } from '../../services/store'
import { addToBurger } from '../../services/reducers/burger/actions'
import { getBurgerItems, totalBurgerPrice } from '../../services/reducers/burger/selectors'
import {
  isLoadingOrderSelector,
  numberOrderSelector,
} from '../../services/reducers/order/selectors'
import BurgerConstructorElement from '../BurgerConstructorElement/BurgerConstructorElement'
import { getOrder, OrderActionTypes } from '../../services/reducers/order/actions'
import { TargetDropType } from '../../utils/constants'
import { authSelector } from '../../services/reducers/auth/selectors'
import { useHistory } from 'react-router-dom'
import { IIngredients } from '../../models'

import styles from './BurgerConstructor.module.css'

const getToken = localStorage.getItem('accessToken') as string
const token = getToken?.split(' ')[1]

const BurgerConstructor: React.FC = () => {
  const dispatch = useAppDispatch()
  const { isAuth } = useAppSelector(authSelector)
  const burgerItems = useAppSelector(getBurgerItems)
  const totalPrice = useAppSelector(totalBurgerPrice)
  const isLoadingOrder = useAppSelector(isLoadingOrderSelector)
  const numberOrder = useAppSelector(numberOrderSelector)
  const history = useHistory()
  const modalControls = useModalControls({})

  const [, drop] = useDrop(() => ({
    accept: TargetDropType.ADD_INGREDIENT,
    drop: (ingredient: IIngredients) => dispatch(addToBurger(ingredient)),
    collect: monitor => ({
      isOver: monitor.isOver(),
    }),
  }))

  const onClickOrder = async () => {
    if (!burgerItems.bun || burgerItems.ingredients.length === 0 || isLoadingOrder || !token) return

    if (!isAuth) {
      history.replace({ pathname: '/login' })
    }

    dispatch(
      getOrder(
        [
          burgerItems.bun._id,
          ...burgerItems.ingredients.map(ingredient => ingredient._id),
          burgerItems.bun._id,
        ],
        token,
      ),
    )
    modalControls.open()
  }

  // eslint-disable-next-line
  const handlerOrderCloseModal = () => dispatch({ type: OrderActionTypes.ORDER_RESET })

  return (
    <>
      <section className={`${styles.wrapper} constructor-element__row mt-25`} ref={drop}>
        {burgerItems.bun ? (
          <div className="mb-4">
            <ConstructorElement
              type="top"
              isLocked
              text={`${burgerItems.bun.name} (верх)`}
              price={burgerItems.bun.price}
              thumbnail={burgerItems.bun.image}
            />
          </div>
        ) : (
          <div
            className={`${styles.grow_none} constructor-element constructor-element_pos_top constructor-element__row mb-4`}
          >
            <p className={`${styles.full_center} text text_type_main-default`}>Выберите булку</p>
          </div>
        )}

        <div className={`${styles.list_items} custom-scroll constructor-element__row`}>
          {burgerItems.ingredients.length > 0 ? (
            burgerItems.ingredients.map((ingredient, index) => {
              return (
                <BurgerConstructorElement
                  ingredient={ingredient}
                  index={index}
                  key={ingredient.id}
                />
              )
            })
          ) : (
            <div className="constructor-element constructor-element__row">
              <p className={`${styles.full_center} text text_type_main-default`}>
                Выберите соусы и начинку
              </p>
            </div>
          )}
        </div>

        {burgerItems.bun ? (
          <div className="mt-4">
            <ConstructorElement
              type="bottom"
              isLocked
              text={`${burgerItems.bun.name} (низ)`}
              price={burgerItems.bun.price}
              thumbnail={burgerItems.bun.image}
            />
          </div>
        ) : (
          <div
            className={`${styles.grow_none} constructor-element constructor-element_pos_bottom constructor-element__row mt-4`}
          >
            <p className={`${styles.full_center} text text_type_main-default`}>Выберите булку</p>
          </div>
        )}

        <div className={`${styles.wrapper_total} constructor-element__row mt-10`}>
          <div className="constructor-element__row">
            <p className="text text_type_digits-medium mr-2" id="total">
              {totalPrice}
            </p>
            <CurrencyIcon type="primary" />
          </div>
          <div className="ml-10 mr-4">
            <Button type="primary" size="large" htmlType="button" onClick={onClickOrder}>
              Оформить заказ
            </Button>
          </div>
        </div>
      </section>

      {modalControls.modalProps.isOpen && !!numberOrder && (
        <Modal {...modalControls.modalProps}>
          <OrderDetails numberOrder={Number(numberOrder)} />
        </Modal>
      )}
    </>
  )
}

export default BurgerConstructor

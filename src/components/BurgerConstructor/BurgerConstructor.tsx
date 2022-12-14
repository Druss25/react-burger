import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDrop } from 'react-dnd'
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import useModalControls from '../../hook/useModalControls'
import Modal from '../Modal/Modal'
import OrderDetails from '../Order/Order'
import { useAppDispatch, useAppSelector } from '../../hook/redux-hook'
import { addToBurger, BurgerActionTypes } from '../../services/reducers/burger/actions'
import { getBurgerItems, totalBurgerPrice } from '../../services/reducers/burger/selectors'
import { isLoadingOrderSelector } from '../../services/reducers/order/selectors'
import BurgerConstructorElement from '../BurgerConstructorElement/BurgerConstructorElement'
import { getOrder, OrderActionTypes } from '../../services/reducers/order/actions'
import { TargetDropType } from '../../utils/constants'
import { authSelector, isLoadingSelector } from '../../services/reducers/auth/selectors'
import { IIngredients } from '../../models'
import Spinner from '../Spinner/Spinner'

import styles from './BurgerConstructor.module.css'

const BurgerConstructor: React.FC = () => {
  const dispatch = useAppDispatch()
  const { isAuth } = useAppSelector(authSelector)
  const burgerItems = useAppSelector(getBurgerItems)
  const totalPrice = useAppSelector(totalBurgerPrice)
  const isLoading = useAppSelector(isLoadingSelector)
  const isLoadingOrder = useAppSelector(isLoadingOrderSelector)
  const history = useHistory()
  let disableOverlayClick = isLoadingOrder

  const handleClose = async () => {
    dispatch({ type: OrderActionTypes.ORDER_RESET })
    dispatch({ type: BurgerActionTypes.BURGER_RESET })
  }

  const modalControls = useModalControls({ disableOverlayClick, handleClose })

  const [, drop] = useDrop(() => ({
    accept: TargetDropType.ADD_INGREDIENT,
    drop: async (ingredient: IIngredients) => dispatch(addToBurger(ingredient)),
    collect: monitor => ({
      isOver: monitor.isOver(),
    }),
  }))

  const onClickOrder = async () => {
    if (!burgerItems.bun || burgerItems.bun === null || burgerItems.ingredients.length === 0) return

    if (!isAuth) {
      return history.replace({ pathname: '/login' })
    }
    dispatch(
      getOrder([
        burgerItems.bun._id,
        ...burgerItems.ingredients.map(ingredient => ingredient._id),
        burgerItems.bun._id,
      ]),
    )

    modalControls.open()
  }

  if (isLoading) return <Spinner />

  return (
    <>
      <section className={`${styles.wrapper} constructor-element__row mt-25`} ref={drop} id="drop">
        {burgerItems.bun ? (
          <div className="mb-4">
            <ConstructorElement
              type="top"
              isLocked={!!burgerItems.ingredients.length}
              text={`${burgerItems.bun.name} (????????)`}
              price={burgerItems.bun.price}
              thumbnail={burgerItems.bun.image}
              handleClose={() =>
                dispatch({
                  type: BurgerActionTypes.BURGER_RESET,
                })
              }
            />
          </div>
        ) : (
          <div
            className={`${styles.grow_none} constructor-element constructor-element_pos_top constructor-element__row mb-4`}
          >
            <p className={`${styles.full_center} text text_type_main-default`}>???????????????? ??????????</p>
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
                ???????????????? ?????????? ?? ??????????????
              </p>
            </div>
          )}
        </div>

        {burgerItems.bun ? (
          <div className="mt-4">
            <ConstructorElement
              type="bottom"
              isLocked={!!burgerItems.ingredients.length}
              text={`${burgerItems.bun.name} (??????)`}
              price={burgerItems.bun.price}
              thumbnail={burgerItems.bun.image}
              handleClose={() =>
                dispatch({
                  type: BurgerActionTypes.BURGER_RESET,
                })
              }
            />
          </div>
        ) : (
          <div
            className={`${styles.grow_none} constructor-element constructor-element_pos_bottom constructor-element__row mt-4`}
          >
            <p className={`${styles.full_center} text text_type_main-default`}>???????????????? ??????????</p>
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
              ???????????????? ??????????
            </Button>
          </div>
        </div>
      </section>

      <Modal {...modalControls.modalProps}>
        <OrderDetails />
      </Modal>
    </>
  )
}

export default BurgerConstructor

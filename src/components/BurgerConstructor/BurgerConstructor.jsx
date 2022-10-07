import React from 'react'
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import useModalControls from '../../utils/useModalControls';
import Modal from '../Modal/Modal';
import BurgerConstructorStyles from './BurgerConstructor.module.css'
import Accept from '../../images/graphics.svg'

const BurgerConstructor = () => {
	// const titleModal = 'Детали ингредиента'
	const modalControls = useModalControls({ disableOverlayClick: true });

	return (
		<>
			<div className={`${BurgerConstructorStyles.wrapper} constructor-element__row mt-25`}>
				<div className='mb-4'>
					<ConstructorElement
						type="top"
						isLocked
						text="Краторная булка N-200i (верх)"
						price={20}
						thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
					/>
				</div>

				<div className={`${BurgerConstructorStyles.list_items} custom-scroll constructor-element__row pr-4`}>
					<div className={`${BurgerConstructorStyles.item} constructor-element__row`}>
						<DragIcon type="primary" />
						<ConstructorElement
							text="Соус традиционный галактический"
							price={30}
							thumbnail={'https://code.s3.yandex.net/react/code/sauce-03.png'}
						/>
					</div>
					<div className={`${BurgerConstructorStyles.item} constructor-element__row`}>
						<DragIcon type="primary" />
						<ConstructorElement
							text="Мясо бессмертных моллюсков Protostomia"
							price={300}
							thumbnail={'https://code.s3.yandex.net/react/code/meat-02.png'}
						/>
					</div>
					<div className={`${BurgerConstructorStyles.item} constructor-element__row`}>
						<DragIcon type="primary" />
						<ConstructorElement
							text="Плоды Фалленианского дерева"
							price={80}
							thumbnail={'https://code.s3.yandex.net/react/code/sp_1.png'}
						/>
					</div>
					<div className={`${BurgerConstructorStyles.item} constructor-element__row`}>
						<DragIcon type="primary" />
						<ConstructorElement
							text="Хрустящие минеральные кольца"
							price={80}
							thumbnail={'https://code.s3.yandex.net/react/code/mineral_rings.png'}
						/>
					</div>
					<div className={`${BurgerConstructorStyles.item} constructor-element__row`}>
						<DragIcon type="primary" />
						<ConstructorElement
							text="Хрустящие минеральные кольца"
							price={80}
							thumbnail={'https://code.s3.yandex.net/react/code/mineral_rings.png'}
						/>
					</div>
					<div className={`${BurgerConstructorStyles.item} constructor-element__row`}>
						<DragIcon type="primary" />
						<ConstructorElement
							text="Кристаллы марсианских альфа-сахаридов"
							price={80}
							thumbnail={'https://code.s3.yandex.net/react/code/core.png'}
						/>
					</div>
					<div className={`${BurgerConstructorStyles.item} constructor-element__row`}>
						<DragIcon type="primary" />
						<ConstructorElement
							text="Филе Люминесцентного тетраодонтимформа"
							price={80}
							thumbnail={'https://code.s3.yandex.net/react/code/meat-03.png'}
						/>
					</div>

				</div>

				<div className='mt-4'>
					<ConstructorElement
						type="bottom"
						isLocked
						text="Краторная булка N-200i (низ)"
						price={20}
						thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
					/>
				</div>
			</div>

			<div className={`${BurgerConstructorStyles.wrapper_total} constructor-element__row mt-10`}>
				<div className='constructor-element__row mr-10'>
					<p className='text text_type_digits-medium mr-2'>610</p>
					<CurrencyIcon type="primary" />
				</div>
				<div className="mr-8">
					<Button type="primary" size="large" htmlType='button' onClick={modalControls.open}>
						Оформить заказ
					</Button>
				</div>
			</div>

			<Modal {...modalControls.modalProps}>
				<p className='text text_type_digits-large mt-4 mb-8'>034536</p>
				<p className='text text_type_main-medium'>идентификатор заказа</p>
				<img src={Accept} alt="Accept" className='mt-15 mb-15' width={120} height={120} />
				<p className='text text_type_main-default mb-2'>Ваш заказ начали готовить</p>
				<p className='text text_type_main-default mb-30' style={{ color: '#8585AD' }}>дождитесь готовности на орбитальной станции</p>
			</Modal>
		</>
	)
}

export default BurgerConstructor
import React from 'react'
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'


const BurgerConstructor = () => {


	return (
		<>
			<div className='constructor-element__row mt-25' style={{ flexDirection: 'column' }}>
				<div className='mb-4'>
					<ConstructorElement
						type="top"
						isLocked={true}
						text="Краторная булка N-200i (верх)"
						price={20}
						thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
					/>
				</div>

				<div className='custom-scroll constructor-element__row pr-4' style={{ flexDirection: 'column', gap: '16px', maxHeight: '464px', overflowY: 'scroll' }}>
					<div className='constructor-element__row' style={{ gap: 8 }}>
						<DragIcon type="primary" />
						<ConstructorElement
							text="Соус традиционный галактический"
							price={30}
							thumbnail={'https://code.s3.yandex.net/react/code/sauce-03.png'}
						/>
					</div>
					<div className='constructor-element__row' style={{ gap: 8 }}>
						<DragIcon type="primary" />
						<ConstructorElement
							text="Мясо бессмертных моллюсков Protostomia"
							price={300}
							thumbnail={'https://code.s3.yandex.net/react/code/meat-02.png'}
						/>
					</div>
					<div className='constructor-element__row' style={{ gap: 8 }}>
						<DragIcon type="primary" />
						<ConstructorElement
							text="Плоды Фалленианского дерева"
							price={80}
							thumbnail={'https://code.s3.yandex.net/react/code/sp_1.png'}
						/>
					</div>
					<div className='constructor-element__row' style={{ gap: 8 }}>
						<DragIcon type="primary" />
						<ConstructorElement
							text="Хрустящие минеральные кольца"
							price={80}
							thumbnail={'https://code.s3.yandex.net/react/code/mineral_rings.png'}
						/>
					</div>
					<div className='constructor-element__row' style={{ gap: 8 }}>
						<DragIcon type="primary" />
						<ConstructorElement
							text="Хрустящие минеральные кольца"
							price={80}
							thumbnail={'https://code.s3.yandex.net/react/code/mineral_rings.png'}
						/>
					</div>
					<div className='constructor-element__row' style={{ gap: 8 }} >
						<DragIcon type="primary" />
						<ConstructorElement
							text="Кристаллы марсианских альфа-сахаридов"
							price={80}
							thumbnail={'https://code.s3.yandex.net/react/code/core.png'}
						/>
					</div>
					<div className='constructor-element__row' style={{ gap: 8 }}>
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
						isLocked={true}
						text="Краторная булка N-200i (низ)"
						price={20}
						thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
					/>
				</div>
			</div>

			<div className='constructor-element__row mt-10' style={{ height: '64px', justifyContent: 'end' }}>
				<div className='constructor-element__row mr-10'>
					<p className='text text_type_digits-medium mr-2'>610</p>
					<CurrencyIcon type="primary" />
				</div>

				<div className="mr-8">
					<Button type="primary" size="large" htmlType='button'>
						Оформить заказ
					</Button>
				</div>
			</div>
		</>

	)
}

export default BurgerConstructor
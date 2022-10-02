import React from 'react'
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeaderStyles from './AppHeader.module.css'

const AppHeader = () => {
	return (
		<header className={AppHeaderStyles.header}>
			<nav className={AppHeaderStyles.nav}>
				<ul className={AppHeaderStyles.menu}>
					<li className={AppHeaderStyles.menu_items_active}>
						<BurgerIcon size={24} />
						<p className="text text_type_main-default">Конструктор</p>
					</li>
					<li className={AppHeaderStyles.menu_items}>
						<ListIcon size={24} />
						<p className="text text_type_main-default">Лента заказов</p>
					</li>
				</ul>
				<div className='constructor-element__row'>
					<Logo />
				</div>
				<div className={AppHeaderStyles.profile}>
					<ProfileIcon size={24} />
					<p className="text text_type_main-default">Личный кабинет</p>
				</div>
			</nav>
		</header>
	)
}

export default AppHeader
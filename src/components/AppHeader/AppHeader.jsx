import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { NavLink } from 'react-router-dom'
import styles from './AppHeader.module.css'

const AppHeader = () => {
  const [isLinkConstructor, setLinkConstructor] = useState(true)
  const [isLinkOrders, setIsLinkOrders] = useState(false)
  const [isLinkProfile, setIsLinkProfile] = useState(false)


  const handleClickConstructor = () => {
    setLinkConstructor(true)
    setIsLinkOrders(false)
    setIsLinkProfile(false)
  }

  const handleClickOrders = () => {
    setLinkConstructor(false)
    setIsLinkOrders(true)
    setIsLinkProfile(false)
  }

  const handleClickProfile = () => {
    setLinkConstructor(false)
    setIsLinkOrders(false)
    setIsLinkProfile(true)
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.menu}>
          <li>
            <NavLink
              to='/'
              className={`${styles.menu_items} text text_type_main-default text_color_inactive`}
              activeClassName={isLinkConstructor ? styles.active : ''}
              onClick={handleClickConstructor}
            >
              <BurgerIcon type={isLinkConstructor ? "primary" : "secondary"} size={24} />
              <p className="text text_type_main-default">Конструктор</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/'
              className={`${styles.menu_items} text text_type_main-default text_color_inactive`}
              activeClassName={isLinkOrders ? styles.active : ''}
              onClick={handleClickOrders}
            >
              <ListIcon type={isLinkOrders ? "primary" : "secondary"} size={24} />
              <p className="text text_type_main-default">Лента заказов</p>
            </NavLink>
          </li>
        </ul>
        <Logo />
        <NavLink
          to='/login'
          className={`${styles.profile} text text_type_main-default text_color_inactive`}
          activeClassName={isLinkProfile ? styles.active : ''}
          onClick={handleClickProfile}
        >
          <ProfileIcon type={isLinkProfile ? "primary" : "secondary"} size={24} />
          <p className='text text_type_main-default'>Личный кабинет</p>
        </NavLink>
      </nav>
    </header >
  )
}

export default AppHeader

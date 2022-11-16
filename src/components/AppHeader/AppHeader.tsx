import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, NavLink } from 'react-router-dom'
import styles from './AppHeader.module.css'

const AppHeader = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul className={styles.menu}>
          <li>
            <NavLink
              exact
              to="/"
              className={`${styles.menu_items} text text_type_main-default text_color_inactive`}
              activeClassName={styles.active}
            >
              <BurgerIcon type="secondary" />
              <p className="text text_type_main-default">Конструктор</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              exact
              to="/feed"
              className={`${styles.menu_items} text text_type_main-default text_color_inactive`}
              activeClassName={styles.active}
            >
              <ListIcon type="secondary" />
              <p className="text text_type_main-default">Лента заказов</p>
            </NavLink>
          </li>
        </ul>
        <Link to="/">
          <Logo />
        </Link>
        <NavLink
          to="/profile"
          className={`${styles.profile} text text_type_main-default text_color_inactive`}
          activeClassName={styles.active}
        >
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-default">Личный кабинет</p>
        </NavLink>
      </nav>
    </header>
  )
}

export default AppHeader

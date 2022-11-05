import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './ProfileMenu.module.css'

const ProfileNavigate = () => {
  return (
    <div className={styles.menu}>
      <nav className={styles.items}>
        <NavLink
          exact
          to='/profile'
          className='text text_type_main-medium text_color_inactive'
          activeClassName={styles.active}
        >
          Профиль
        </NavLink>
        <NavLink
          exact
          to='/profile/orders'
          className="text text_type_main-medium text_color_inactive"
          activeClassName={styles.active}
        >
          История заказов
        </NavLink>
        <NavLink
          exact
          to='/'
          className="text text_type_main-medium text_color_inactive"
          activeClassName={styles.active}
        >
          Выход
        </NavLink>
      </nav>
    </div>
  )
}

export default ProfileNavigate

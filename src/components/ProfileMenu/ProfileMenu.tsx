import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { useAppDispatch } from '../../services/store'
import { logout } from '../../services/reducers/auth/actions'

import styles from './ProfileMenu.module.css'

const ProfileNavigate: React.FC = () => {
  const history = useHistory()
  const dispatch = useAppDispatch()

  const onClick = React.useCallback(() => {
    dispatch(logout())
    history.replace({ pathname: '/' })
  }, [dispatch, history])

  return (
    <div className={styles.menu}>
      <nav className={styles.items}>
        <NavLink
          exact
          to="/profile"
          className="text text_type_main-medium text_color_inactive"
          activeClassName={styles.active}
        >
          Профиль
        </NavLink>
        <NavLink
          exact
          to="/profile/orders"
          className="text text_type_main-medium text_color_inactive"
          activeClassName={styles.active}
        >
          История заказов
        </NavLink>
        <button type="button" onClick={onClick}>
          Выход
        </button>
      </nav>
    </div>
  )
}

export default ProfileNavigate

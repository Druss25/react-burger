import React from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import { logout } from '../../services/reducers/auth/actions'
import styles from './ProfileMenu.module.css'

const ProfileNavigate = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const handleClick = React.useCallback(() => {
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
        <button type="button" onClick={handleClick}>
          Выход
        </button>
      </nav>
    </div>
  )
}

export default ProfileNavigate

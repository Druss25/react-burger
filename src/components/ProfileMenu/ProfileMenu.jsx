import { NavLink, useHistory } from 'react-router-dom'
import { logout } from '../../services/reducers/auth/actions'
import styles from './ProfileMenu.module.css'

const ProfileNavigate = () => {
  const history = useHistory()

  const handleClick = async () => {
    await logout()
    history.replace({ pathname: '/' })

  }

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
        <button type='button' onClick={handleClick}>Выход</button>
      </nav>
    </div>
  )
}

export default ProfileNavigate

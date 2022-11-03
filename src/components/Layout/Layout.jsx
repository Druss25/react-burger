import PropTypes from 'prop-types'
import AppHeader from '../AppHeader/AppHeader'
import styles from './Layout.module.css'

const Layout = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <AppHeader />
      {children}
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
}
export default Layout

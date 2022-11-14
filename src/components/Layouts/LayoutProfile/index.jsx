import PropTypes from 'prop-types'
import ProfileNavigate from '../../ProfileMenu/ProfileMenu'
import styles from './LayoutProfile.module.css'

const LayoutProfile = ({ children }) => {
  return (
    <section className="mt-30">
      <div className={styles.wrapper}>
        <ProfileNavigate />
        {children}
      </div>
    </section>
  )
}

LayoutProfile.propTypes = {
  children: PropTypes.node.isRequired,
}

export default LayoutProfile

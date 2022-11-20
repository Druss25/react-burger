import ProfileNavigate from '../../ProfileMenu/ProfileMenu'
import styles from './LayoutProfile.module.css'

const LayoutProfile: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <section className="mt-30">
      <div className={styles.wrapper}>
        <ProfileNavigate />
        {children}
      </div>
    </section>
  )
}

export default LayoutProfile

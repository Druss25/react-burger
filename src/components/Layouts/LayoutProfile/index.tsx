import ProfileNavigate from '../../ProfileMenu/ProfileMenu'
import styles from './LayoutProfile.module.css'

interface LayoutProfileProps {
  children?: React.ReactNode
}

const LayoutProfile: React.FC<LayoutProfileProps> = ({ children }) => {
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

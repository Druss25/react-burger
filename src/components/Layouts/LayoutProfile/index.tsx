
import ProfileNavigate from '../../ProfileMenu/ProfileMenu'
import styles from './LayoutProfile.module.css'

interface IProps {
  children: JSX.Element
}

const LayoutProfile = ({ children }: IProps) => {
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

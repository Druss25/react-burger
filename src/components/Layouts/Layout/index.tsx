import AppHeader from '../../AppHeader/AppHeader'

import styles from './Layout.module.css'

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <AppHeader />
      <main className={styles.main}>{children}</main>
    </div>
  )
}

export default Layout

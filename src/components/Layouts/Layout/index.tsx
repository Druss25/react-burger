import AppHeader from '../../AppHeader/AppHeader'

import styles from './Layout.module.css'

interface Props {
  children?: React.ReactNode
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <AppHeader />
      <main className={styles.main}>{children}</main>
    </div>
  )
}

export default Layout

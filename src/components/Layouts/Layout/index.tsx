import AppHeader from '../../AppHeader/AppHeader'

import styles from './Layout.module.css'

interface IProps {
  children: JSX.Element
}

const Layout = ({ children }: IProps) => {
  return (
    <div className={styles.wrapper}>
      <AppHeader />
      <main className={styles.main}>{children}</main>
    </div>
  )
}

export default Layout

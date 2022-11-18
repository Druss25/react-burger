import styles from './not-found.module.css'

const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <p className="text text_type_main-medium">Уупс !!! А страницы нету...</p>
    </div>
  )
}

export default NotFoundPage

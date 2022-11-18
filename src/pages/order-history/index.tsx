import React from 'react'
import styles from './order-history.module.css'

const OrdersHistoryPage: React.FC = () => {
  return (
    <>
      <div className={styles.subtitle}>
        <p className="text text_type_main-default text_color_inactive">
          В этом разделе вы можете просмотреть свою историю заказов
        </p>
      </div>
      <div className={styles.wrapper}>В следующем спринте будет написана !</div>
    </>
  )
}

export default OrdersHistoryPage

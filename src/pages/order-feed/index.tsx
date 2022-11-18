import React from 'react'
import OrderList from '../../components/OrderList/OrderList'
import OrderStatistic from '../../components/OrderStatistic/OrderStatistic'

import styles from './order-feed.module.css'

const OrderFeedPage: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <h3 className="text text_type_main-large mt-10 mb-5">Лента заказов</h3>
      <div className={styles.content}>
        <OrderList />
        <OrderStatistic />
      </div>
    </section>
  )
}

export default OrderFeedPage

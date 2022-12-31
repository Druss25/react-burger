import React from 'react'
import { useAppSelector } from '../../hook/redux-hook'
import { IOrder } from '../../models'
import {
  getOrdersSelector,
  getTotalOrders,
  getTotalTodayOrders,
} from '../../services/reducers/socket/orders/wsSelectors'
import Spinner from '../Spinner/Spinner'

import styles from './OrderStatistic.module.css'

const OrderStatistic: React.FC = () => {
  const orders = useAppSelector(getOrdersSelector)
  const total = useAppSelector(getTotalOrders)
  const totalToday = useAppSelector(getTotalTodayOrders)

  // eslint-disable-next-line array-callback-return
  const doneNumberOrders = orders.map((item: IOrder) => {
    if (item.status === 'done') return item.number
  })

  // eslint-disable-next-line array-callback-return
  const workNumberOrders = orders.map((item: IOrder) => {
    if (item.status !== 'done') return item.number
  })

  if (!orders) return <Spinner />

  return (
    <div className={styles.wrapper}>
      <div className={styles.top_wrapper}>
        <div className={styles.content}>
          <p className="text text_type_main-medium mb-6">Готовы:</p>
          <div className={`${styles.items} custom-scroll`}>
            {doneNumberOrders.map((done, index) => (
              <p className={`text text_type_digits-default ${styles.item_done}`} key={index}>
                {done}
              </p>
            ))}
          </div>
        </div>
        <div className={styles.content}>
          <p className="text text_type_main-medium mb-6">В работе:</p>
          <div className={`${styles.items} custom-scroll`}>
            {workNumberOrders.map(
              (work, index) =>
                !!work && (
                  <p
                    className={`text text_type_digits-default mb-2 ${styles.item_work}`}
                    key={index}
                  >
                    {work}
                  </p>
                ),
            )}
          </div>
        </div>
      </div>
      <div>
        <p className="text text_type_main-medium mt-15">Выполнено за все время:</p>
        <p className="text text_type_digits-large">{total}</p>
        <p className="text text_type_main-medium mt-15">Выполнено за сегодня:</p>
        <p className="text text_type_digits-large">{totalToday}</p>
      </div>
    </div>
  )
}

export default OrderStatistic

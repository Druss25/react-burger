import React from 'react'
import OrderElement from '../OrderElement/OrderElement'

import styles from './OrderList.module.css'

const OrderList = () => {
  return (
    <div className={`${styles.wrapper} custom-scroll`}>
      <OrderElement />
    </div>
  )
}

export default OrderList
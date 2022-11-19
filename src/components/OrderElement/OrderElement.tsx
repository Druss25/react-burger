import React from 'react'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './OrderElement.module.css'

const OrderElement: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.subtitle}>
        <span className="text text_type_digits-default">#034535</span>
        <span className="text text_type_main-default text_color_inactive">Сегодня, 16:20</span>
      </div>
      <h3 className="text text_type_main-medium">Death Star Starship Main бургер</h3>
      <div className={styles.content}>
        {/* -------------   !!! Переписать этот блок   -----------*/}
        <div className={styles.image_list}>
          <div className={styles.image_item}>
            <p className="text text_type_digits-default">+3</p>
          </div>
          <div className={styles.image_item}>
            <img src="https://code.s3.yandex.net/react/code/bun-02-mobile.png" alt="" />
          </div>
          <div className={styles.image_item}>
            <img src="https://code.s3.yandex.net/react/code/bun-02-mobile.png" alt="" />
          </div>
          <div className={styles.image_item}>
            <img src="https://code.s3.yandex.net/react/code/bun-02-mobile.png" alt="" />
          </div>
          <div className={styles.image_item}>
            <img src="https://code.s3.yandex.net/react/code/bun-02-mobile.png" alt="" />
          </div>
          <div className={styles.image_item}>
            <img src="https://code.s3.yandex.net/react/code/bun-02-mobile.png" alt="" />
          </div>
        </div>
        {/* ------------------------------------------------------ */}
        <div className={styles.currency}>
          <span className="text text_type_digits-default ml-6 mr-2">480</span>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}

export default OrderElement

import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { TOrder } from '../order-feed'

import styles from './order-feed-id.module.css'

const data: TOrder = {
  createdAt: '2022-12-07T11:43:08.764Z',
  ingredients: ['60d3b41abdacab0026a733c7', '60d3b41abdacab0026a733cd', '60d3b41abdacab0026a733c7'],
  name: 'Space флюоресцентный бургер',
  number: 32652,
  status: 'done',
  updatedAt: '2022-12-07T11:43:09.239Z',
  _id: '63907c4c99a25c001cd64d92',
}

const OrderFeedId = () => {
  const ls = data
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <span className={`${styles.text_center} text text_type_digits-default mb-10`}>
          #{data.number}
        </span>
        <span className="text text_type_main-medium mb-3">{data.name}</span>
        <span className={`${styles.status} text text_type_main-default mb-15`}>
          {data.status === 'done' ? 'Выполнен' : 'В работе'}
        </span>
        <span className={`${styles.left} text text_type_main-medium mb-6`}>Состав:</span>

        <div></div>

        <div className={`${styles.footer} mt-10`}>
          <span className="text text_type_main-default text_color_inactive">Вчера, 15:42</span>
          <div className={styles.image}>
            <span className="text text_type_digits-default pr-2">510</span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderFeedId

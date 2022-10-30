import React from 'react'
import { useDispatch } from 'react-redux'
import { useDrag, useDrop } from 'react-dnd'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerActionTypes } from '../../services/reducers/burger/actions'
import { TargetDropType } from '../../utils/constants'
import styles from './BurgerConstructorElement.module.css'

const BurgerConstructorElement = ({ ingredient, index }) => {
  const dispatch = useDispatch()
  const ref = React.useRef(null)

  const [{ handlerId }, drop] = useDrop({
    accept: [TargetDropType.SORTING_INGREDIENT],
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      }
    },
    hover(item, monitor) {
      const dragId = item.index;
      const hoverId = index
      if (dragId === hoverId) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      if (dragId < hoverId && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragId > hoverId && hoverClientY > hoverMiddleY) {
        return
      }

      dispatch({
        type: BurgerActionTypes.BURGER_RELOCATION,
        payload: {
          from: dragId,
          to: hoverId
        }
      })
      item.index = hoverId
    }
  })

  const [{ isDragging }, drag] = useDrag({
    type: TargetDropType.SORTING_INGREDIENT,
    item: () => {
      return { ingredient, index }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  })

  const opacity = isDragging ? 0 : 1
  drag(drop(ref))

  return (
    <div
      className={`${styles.item} constructor-element__row`}
      style={{ opacity }}
      data-handler-id={handlerId}
      ref={ref}
    >
      <DragIcon />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() =>
          dispatch({
            type: BurgerActionTypes.BURGER_DELETE,
            payload: index
          })
        }
      />
    </div>
  )
}

export default BurgerConstructorElement

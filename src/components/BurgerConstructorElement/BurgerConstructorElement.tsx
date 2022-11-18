import React from 'react'
import { DropTargetMonitor, useDrag, useDrop, XYCoord } from 'react-dnd'
import { useAppDispatch } from '../../services/store'
import { TargetDropType } from '../../utils/constants'
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerActionTypes } from '../../services/reducers/burger/actions'
import { IIngredients } from '../../models'

import styles from './BurgerConstructorElement.module.css'

interface BurgerConstructorElementProps {
  ingredient: IIngredients
  index: number
}
const BurgerConstructorElement: React.FC<BurgerConstructorElementProps> = ({
  ingredient,
  index,
}) => {
  const dispatch = useAppDispatch()
  const dragRef = React.useRef<HTMLDivElement>(null)
  const [{ handlerId }, drop] = useDrop({
    accept: TargetDropType.SORTING_INGREDIENT,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },

    // !!! Убрать any !!!
    hover(item: any, monitor: DropTargetMonitor) {
      const dragIndex = item.index
      const hoverIndex = Number(index)

      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = dragRef.current!.getBoundingClientRect()
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

      if (
        (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) ||
        (dragIndex > hoverIndex && hoverClientY > hoverMiddleY)
      ) {
        return
      }

      dispatch({
        type: BurgerActionTypes.BURGER_RELOCATION,
        payload: {
          from: dragIndex,
          to: hoverIndex,
        },
      })
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type: TargetDropType.SORTING_INGREDIENT,
    item: () => {
      return { ingredient, index }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1
  drag(drop(dragRef))

  return (
    <div
      className={`${styles.item} constructor-element__row`}
      style={{ opacity }}
      data-handler-id={handlerId}
      ref={dragRef}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() =>
          dispatch({
            type: BurgerActionTypes.BURGER_DELETE,
            payload: Number(index),
          })
        }
      />
    </div>
  )
}

export default BurgerConstructorElement

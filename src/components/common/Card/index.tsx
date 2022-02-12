/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { formatDistanceToNow } from 'date-fns'
import { CardT } from 'types/card'

import s from './style.module.css'

interface Props extends CardT {
  [key: string]: any
}

function Card({ id, description, date, index }: Props) {
  return (
    <Draggable key={id} draggableId={id} index={index}>
      {provided => (
        <div
          className={s.cardContainer}
          data-testId={`card-${id}`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <p>{description}</p>
          {date && (
            <div className={s.cardFooter}>
              <p>{formatDistanceToNow(new Date(date), { addSuffix: true })}</p>
            </div>
          )}
        </div>
      )}
    </Draggable>
  )
}

export default Card

import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { ColumnT } from 'types/column'
import { CardT } from 'types/card'
import { CardStatus } from 'types/enums'
import { v4 } from 'uuid'
import CreateForm from 'components/common/CreateForm'
import Header from './Header'
import Card from '../Card'

import s from './style.module.css'

interface Props extends ColumnT {
  handleRemoveColumn(columnId: string): void
  handleUpdateCards(columnId: string, cards: CardT[]): void
}

function Column({
  name,
  id,
  handleRemoveColumn,
  handleUpdateCards,
  cards,
}: Props) {
  const onAddCard = (description: string) => {
    const newCard = {
      id: v4(),
      description,
      date: new Date(),
      status: CardStatus.IN_PROGRESS,
    }
    handleUpdateCards(id, [...cards, newCard])
  }

  return (
    <div className={s.columnContainer}>
      <Header {...{ name, id, handleRemoveColumn }} />

      <Droppable droppableId={id}>
        {provided => (
          <div
            className={s.columnContent}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {cards.map((card: CardT, index) => {
              const { id, description, date, status, todos } = card

              return (
                <Card
                  key={id}
                  {...{ id, description, date, status, todos, index }}
                />
              )
            })}
          </div>
        )}
      </Droppable>

      <CreateForm buttonLabel="Add card" onSubmit={onAddCard} />
    </div>
  )
}

export default Column

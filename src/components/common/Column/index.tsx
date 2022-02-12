import React from 'react'
import { ColumnT } from 'types/column'
import { CardT } from 'types/card'
import { CardStatus } from 'types/enums'
import { v4 } from 'uuid'
import CreateForm from 'components/common/CreateForm'
import Header from './Header'

import s from './style.module.css'

interface Props extends ColumnT {
  handleRemoveColumn(columnId: string): void
  handleAddCard(columnId: string, card: CardT): void
}

function Column({ name, id, handleRemoveColumn, handleAddCard, cards }: Props) {
  const onAddCard = (description: string) => {
    const newCard = {
      id: v4(),
      description,
      date: new Date(),
      status: CardStatus.IN_PROGRESS,
    }
    handleAddCard(id, newCard)
  }

  return (
    <div className={s.columnContainer}>
      <Header {...{ name, id, handleRemoveColumn }} />
      <div>
        <CreateForm buttonLabel="Add card" onSubmit={onAddCard} />
      </div>
    </div>
  )
}

export default Column

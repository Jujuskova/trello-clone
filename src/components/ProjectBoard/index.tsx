import React, { useState } from 'react'
import { v4 } from 'uuid'

import Column from 'components/common/Column'
import CreateForm from 'components/common/CreateForm'

import { ColumnT } from 'types/column'
import { CardT } from 'types/card'

import s from './style.module.css'

function ProjectBoard() {
  const [columns, setColumns] = useState<ColumnT[]>([
    { id: 'column-1', name: 'To Do', cards: [] },
    { id: 'column-2', name: 'In Progress', cards: [] },
  ])

  const handleRemoveColumn = (columnId: string): void => {
    setColumns(prev => prev.filter(col => col.id !== columnId))
  }

  const addColumn = (columnName: string): void => {
    const newColumn = { id: `column-${v4()}`, name: columnName, cards: [] }
    setColumns(prev => [...prev, newColumn])
  }

  const addCard = (columnId: string, card: CardT): void => {
    const updatedColumns = columns.map(column => {
      return column.id === columnId
        ? { ...column, cards: [...column.cards, card] }
        : column
    })
    setColumns(updatedColumns)
  }

  return (
    <div className={s.projectBoardContainer}>
      {columns.map((column: ColumnT) => {
        const { id, name, cards } = column
        return (
          <Column
            {...{ id, name, cards, handleRemoveColumn }}
            handleAddCard={addCard}
          />
        )
      })}
      <CreateForm onSubmit={addColumn} buttonLabel="Add list" />
    </div>
  )
}

export default ProjectBoard

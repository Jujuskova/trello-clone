import React from 'react'
import { v4 } from 'uuid'
import { DragDropContext } from 'react-beautiful-dnd'
import { useLocalStorage } from 'hooks/useLocalStorage'

import Column from 'components/common/Column'
import CreateForm from 'components/common/CreateForm'
import { reorderCards, moveCardsBetweenColumns } from 'helpers/dragNDrop'

import { ColumnT } from 'types/column'
import { CardT } from 'types/card'

import s from './style.module.css'

function ProjectBoard() {
  const [columns, setColumns] = useLocalStorage<ColumnT[]>('columns', [
    { id: 'column-1', name: 'To Do', cards: [] },
    { id: 'column-2', name: 'In Progress', cards: [] },
  ])

  const handleRemoveColumn = (columnId: string): void => {
    setColumns((prev: ColumnT[]) =>
      prev.filter((col: ColumnT) => col.id !== columnId),
    )
  }

  const addColumn = (columnName: string): void => {
    const newColumn = { id: `column-${v4()}`, name: columnName, cards: [] }
    setColumns((prev: ColumnT[]) => [...prev, newColumn])
  }

  const handleUpdateCards = (columnId: string, cards: CardT[]): void => {
    const updatedColumns = columns.map((column: ColumnT) => {
      return column.id === columnId ? { ...column, cards } : column
    })
    setColumns(updatedColumns)
  }

  const onDragEnd = (e: any) => {
    const { source, destination } = e
    const columnStart = columns.find(
      (c: ColumnT) => c.id === source?.droppableId,
    )
    if (!destination || !columnStart) return

    if (source.droppableId === destination.droppableId) {
      const updatedCards = reorderCards(
        columnStart.cards,
        e.source.index,
        e.destination.index,
      )
      handleUpdateCards(columnStart.id, updatedCards)
    } else {
      const columnEnd = columns.find(
        (c: ColumnT) => c.id === destination.droppableId,
      )

      const result = moveCardsBetweenColumns(
        columnStart,
        columnEnd || ({} as ColumnT),
        source.index,
        destination.index,
      )

      const updatedColumns = columns.map((c: ColumnT) => {
        return result[c.id] ? { ...c, cards: result[c.id] } : c
      })

      setColumns(updatedColumns)
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={s.projectBoardContainer}>
        {(columns || []).map((column: ColumnT) => {
          const { id, name, cards } = column
          return (
            <Column
              key={id}
              {...{ id, name, cards, handleRemoveColumn }}
              handleUpdateCards={handleUpdateCards}
            />
          )
        })}
        <CreateForm onSubmit={addColumn} buttonLabel="Add list" />
      </div>
    </DragDropContext>
  )
}

export default ProjectBoard

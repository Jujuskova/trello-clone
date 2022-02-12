import { CardT } from 'types/card'
import { ColumnT } from 'types/column'

export const reorderCards = (
  items: CardT[],
  startIndex: number,
  endIndex: number,
): CardT[] => {
  const cloneItems = [...items]
  const [removed] = cloneItems.splice(startIndex, 1)
  cloneItems.splice(endIndex, 0, removed)

  return cloneItems
}

export const moveCardsBetweenColumns = (
  initialColumn: ColumnT,
  newColumn: ColumnT,
  startIndex: number,
  endIndex: number,
) => {
  const statColClone = [...initialColumn.cards]
  const endColClone = [...newColumn.cards]
  const [removed] = statColClone.splice(startIndex, 1)

  endColClone.splice(endIndex, 0, removed)

  const result = {
    [initialColumn.id]: statColClone,
    [newColumn.id]: endColClone,
  }

  return result
}

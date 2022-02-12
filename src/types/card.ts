import { CardStatus } from './enums'

interface CardListItemT {
  id: string
  label: string
  isCompleted: Boolean
}

export interface CardT {
  id: string
  description: string
  date: Date
  status: CardStatus
  todos?: CardListItemT[]
}

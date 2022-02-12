import React from 'react'
import { AiFillDelete } from 'react-icons/ai'
import { ColumnT } from 'types/column'

import s from './style.module.css'

interface Props extends Pick<ColumnT, 'id' | 'name'> {
  handleRemoveColumn(columnId: string): void
}

function Header({ name, id, handleRemoveColumn }: Props) {
  const onRemoveColumn = () => handleRemoveColumn(id)

  return (
    <div className={s.headerContainer} data-testid={`column-header-${id}`}>
      <h3 className={s.headerContainerTitle}>{name}</h3>
      <AiFillDelete onClick={onRemoveColumn} />
    </div>
  )
}

export default Header

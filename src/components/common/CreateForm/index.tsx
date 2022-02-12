import React, { useState } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'

type Props = {
  onSubmit(value: string): void
  buttonLabel: string
}

function CreateForm({ onSubmit, buttonLabel }: Props) {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [value, setValue] = useState('')

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    onSubmit(value)
    setValue('')
    setIsFormOpen(false)
  }

  const toggleForm = () => setIsFormOpen(prev => !prev)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return isFormOpen ? (
    <form>
      <input placeholder="List title" value={value} onChange={onChange} />
      <button type="submit" disabled={!value} onClick={handleSubmit}>
        {buttonLabel}
      </button>
      <AiFillCloseCircle onClick={toggleForm} />
    </form>
  ) : (
    <button type="button" onClick={toggleForm}>
      {buttonLabel}
    </button>
  )
}

export default CreateForm

import { useState } from 'react'

function initState<T>(key: string, initialValue: T) {
  try {
    const item = window.localStorage.getItem(key)
    return item ? JSON.parse(item) : initialValue
  } catch (err) {
    console.error(err)
    return initialValue
  }
}

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState(
    initState<T>(key, initialValue),
  )

  const setValue = (value: T) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (err) {
      console.error(err)
    }
  }

  return [storedValue, setValue]
}

export default useLocalStorage

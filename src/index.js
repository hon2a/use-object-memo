import { useState, useEffect } from 'react'
import isEqual from 'lodash.isequal'

export function useObjectMemo(value) {
  const [memoizedValue, setMemoizedValue] = useState(value)
  useEffect(() => {
    if (!isEqual(value, memoizedValue)) setMemoizedValue(value)
  }, [value])
  return memoizedValue
}

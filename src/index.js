import { useState, useEffect } from 'react'
import isDeepEqual from 'lodash.isequal'

export function useObjectMemo(value, isEqual = isDeepEqual) {
  const [memo, setMemo] = useState(value)
  useEffect(() => {
    if (!isEqual(value, memo)) setMemo(value)
  }, [value])
  return memo
}

import { renderHook } from '@testing-library/react-hooks'

import { useObjectMemo } from './index'

describe('useObjectMemo', () => {
  it('returns the supplied value initially', () => {
    const value = { foo: 'bar' }
    const {
      result: { current: memoizedValue }
    } = renderHook(() => useObjectMemo(value))
    expect(memoizedValue).toBe(value)
  })

  it('returns the old value on no-change update', () => {
    const initialValue = { foo: 'bar' }
    const rendered = renderHook(({ value }) => useObjectMemo(value), { initialProps: { value: initialValue } })
    rendered.rerender({ value: { foo: 'bar' } })
    expect(rendered.result.current).toBe(initialValue)
  })

  it('returns the new value on data change update', () => {
    const rendered = renderHook(({ value }) => useObjectMemo(value), { initialProps: { value: { foo: 'bar' } } })
    const newValue = { foo: 'baz' }
    rendered.rerender({ value: newValue })
    expect(rendered.result.current).toBe(newValue)
  })

  it('retains the above properties in a more complicated case (multiple updates, nested objects)', () => {
    const initialValue = { a: 'A', b: { 'b.1': 'B.1', 'b.2': { 'b.2.1': 'B.2.1' } }, c: 123 }
    const rendered = renderHook(({ value }) => useObjectMemo(value), { initialProps: { value: initialValue } })

    rendered.rerender({ value: initialValue })
    rendered.rerender({ value: { ...initialValue, c: 123 } })
    rendered.rerender({ value: { ...initialValue, b: { ...initialValue.b, 'b.1': 'B.1' } } })
    expect(rendered.result.current).toBe(initialValue)

    const newValue = { a: 'A', b: { 'b.1': 'B.1-updated', 'b.2': { 'b.2.1': 'B.2.1', 'b.2.2': 'B.2.2-added' } } }
    rendered.rerender({ value: newValue })
    expect(rendered.result.current).toBe(newValue)
    rendered.rerender({ value: { ...newValue, a: 'A' } })
    rendered.rerender({
      value: { a: 'A', b: { 'b.1': 'B.1-updated', 'b.2': { 'b.2.1': 'B.2.1', 'b.2.2': 'B.2.2-added' } } }
    })
    expect(rendered.result.current).toBe(newValue)

    rendered.rerender({ value: null })
    expect(rendered.result.current).toBeNull()

    const newestValue = { foo: 'bar' }
    rendered.rerender({ value: newestValue })
    expect(rendered.result.current).toBe(newestValue)
  })
})

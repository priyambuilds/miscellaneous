import { useSyncExternalStore, useCallback } from 'react'
import { useCommandContext } from '@/types/context'

export interface CommandEmptyProps {
  children?: React.ReactNode
  className?: string
  forceShow?: boolean
  forceHide?: boolean
  hasItems?: boolean
}

export default function CommandEmpty({
  children = 'No results found',
  className = '',
  forceShow = false,
  forceHide = false,
  hasItems,
}: CommandEmptyProps) {
  const store = useCommandContext()

  const getQuery = useCallback(() => store.getState().view.query, [])

  const query = useSyncExternalStore(store.subscribe, getQuery)

  const hasVisibleItems =
    hasItems !== undefined
      ? hasItems
      : typeof document !== 'undefined' &&
        document.querySelectorAll('[data-command-item]').length > 0

  if (forceHide) return null
  if (forceShow) {
    return (
      <div
        role="presentation"
        className={`
          px-4 py-8
          text-center
          text-sm
          text-gray-500 dark:text-gray-400
          ${className}
        `}
      >
        {children}
      </div>
    )
  }

  if (!query || hasVisibleItems) return null

  return (
    <div
      role="presentation"
      className={`
        px-4 py-8
        text-center
        text-sm
        text-gray-500 dark:text-gray-400
        ${className}
      `}
    >
      {children}
    </div>
  )
}

import { useId, useSyncExternalStore, useCallback, memo } from 'react'
import { useCommandContext } from '@/types/context'
import type { CommandItemProps } from '@/types/types'

const CommandItemComponent = function CommmandItem({
  id: providedId,
  value,
  keywords = [],
  disabled = false,
  onSelect,
  skipScoring = false,
  children,
}: CommandItemProps) {
  const store = useCommandContext()
  const generatedId = useId()
  const id = providedId || generatedId

  const getActiveId = useCallback(() => store.getState().activeId, [])
  const activeId = useSyncExternalStore(store.subscribe, getActiveId)
  const isActive = activeId === id

  const handleClick = () => {
    if (disabled) return
    onSelect?.(value)
  }

  const handleMouseEnter = () => {
    if (disabled) return
    store.setState({ activeId: id })
  }

  return (
    <div
      id={id}
      role="option"
      aria-selected={isActive}
      aria-disabled={disabled}
      data-command-item=""
      data-disabled={disabled ? '' : undefined}
      data-selected={isActive ? '' : undefined}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      className={`
        px-4 py-3
        flex items-center gap-3
        cursor-pointer
        text-sm
        transition-colors
        ${
          isActive
            ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100'
            : 'text-gray-700 dark:text-gray-300'
        }
        ${
          disabled
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:bg-gray-50 dark:hover:bg-gray-800'
        }
      `}
    >
      {children}
    </div>
  )
}

export default memo(CommandItemComponent)

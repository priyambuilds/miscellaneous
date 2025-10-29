import { useId, useEffect, useRef } from 'react'
import { CommandContext } from '@/types/context'
import { createStore } from '@/types/store'
import type { CommandProps, CommandState } from '@/types/types'

export default function Command({
  label,
  value,
  onValueChnage,
  loop = false,
  children,
}: CommandProps) {
  const id = useId()

  const storeRef = useRef<ReturnType<typeof createStore> | null>(null)

  if (!storeRef.current) {
    const initialState: CommandState = {
      open: false,
      activeId: null,
      loop,
      view: {
        type: 'root',
        query: value ?? '',
      },
      history: [],
      recentCommands: [],
    }
    storeRef.current = createStore(initialState)
    storeRef.current.init()
  }

  const store = storeRef.current

  useEffect(() => {
    store.setState({ loop: loop })
  }, [loop, store])

  return (
    <CommandContext value={store}>
      <div
        className="
          w-full max-w-[640px]
          bg-white dark:bg-gray-900
          rounded-xl
          shadow-2xl
          border border-gray-200 dark:border-gray-800
          overflow-hidden
          flex flex-col
        "
        role="dialog"
        aria-modal="true"
        aria-label={label}
        aria-describedby={`${id}-status`}
        id={id}
      >
        <div
          id={`${id}-status`}
          className="sr-only"
          aria-live="polite"
          aria-atomic="true"
        >
          Command palette dialog
        </div>
        {children}
      </div>
    </CommandContext>
  )
}

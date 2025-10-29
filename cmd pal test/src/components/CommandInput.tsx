import {
  useId,
  useSyncExternalStore,
  useRef,
  useCallback,
  useEffect,
  useMemo,
} from 'react'
import { useCommandContext } from '@/types/context'

export interface CommandInputProps {
  placeholder?: string
  autoFocus?: boolean
  className?: string
}

export default function CommandInput({
  placeholder = 'Type a command or search...',
  autoFocus = false,
  className = '',
}: CommandInputProps) {
  const store = useCommandContext()
  const inputRef = useRef<HTMLInputElement>(null)
  const inputId = useId()
  const listboxId = `${inputId}-listbox`

  const getQuery = useCallback(() => store.getState().view.query, [])
  const getOpen = useCallback(() => store.getState().open, [])
  const getActiveId = useCallback(() => store.getState().activeId, [])

  const query = useSyncExternalStore(store.subscribe, getQuery)
  const open = useSyncExternalStore(store.subscribe, getOpen)
  const activeId = useSyncExternalStore(store.subscribe, getActiveId)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      const currentView = store.getState().view

      // Single update to store
      // React will batch this with any other state updates
      store.setState({
        view: {
          ...currentView,
          query: newValue,
        },
      })
    },
    [store]
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      // Prevent arrow keys from moving cursor when navigating list
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault()
      }

      if (e.key === 'Escape') {
        const currentView = store.getState().view

        if (currentView.query) {
          e.stopPropagation()
          store.setState({
            view: {
              ...currentView,
              query: '',
            },
          })
        } else {
          store.setState({ open: false })
        }
      }
    },
    [store]
  )

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      requestAnimationFrame(() => {
        inputRef.current?.focus()
      })
    }
  }, [autoFocus])

  return (
    <div className="relative flex items-center border-b border-gray-200 dark:border-gray-800">
      {/* Search Icon */}
      <div className="pl-4 pr-3 text-gray-400">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>

      {/* Input Field */}
      <input
        ref={inputRef}
        id={inputId}
        type="text"
        role="combobox"
        aria-autocomplete="list"
        aria-controls={listboxId}
        aria-expanded={open}
        aria-activedescendant={activeId || undefined}
        aria-label="Command palette search"
        placeholder={placeholder}
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        className={`
          flex-1
          py-4 pr-4
          text-lg
          bg-transparent
          text-gray-900 dark:text-gray-100
          placeholder-gray-400 dark:placeholder-gray-500
          outline-none
          ${className}
        `}
      />
    </div>
  )
}

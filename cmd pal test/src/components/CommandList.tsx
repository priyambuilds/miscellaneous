import { useEffect, useRef, useSyncExternalStore, useCallback } from 'react'
import { useCommandContext } from '@/types/context'

export interface CommandListProps {
  children?: React.ReactNode
  className?: string
}

export default function CommandList({
  children,
  className = '',
}: CommandListProps) {
  const store = useCommandContext()
  const listRef = useRef<HTMLDivElement>(null)

  // Stable selectors to prevent memory leaks from frequent re-subscriptions
  const getOpen = useCallback(() => store.getState().open, [])
  const getActiveId = useCallback(() => store.getState().activeId, [])

  // Subscribe to open state
  const open = useSyncExternalStore(store.subscribe, getOpen)

  // Subscribe to activeId for keyboard navigation
  const activeId = useSyncExternalStore(store.subscribe, getActiveId)

  // keyboard navigation handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const state = store.getState()

      // Get all item IDs currently rendered
      // We'll populate this from CommandItem components later
      const items = Array.from(
        listRef.current?.querySelectorAll('[data-command-item]') || []
      )
        .map(el => el.id)
        .filter(Boolean)

      if (items.length == 0) return

      const currentIndex = state.activeId ? items.indexOf(state.activeId) : -1

      switch (e.key) {
        case 'ArrowDown': {
          e.preventDefault()
          let nextIndex = currentIndex + 1

          // Wrap t first if at end and loop if enabled
          if (nextIndex >= items.length) {
            nextIndex = state.loop ? 0 : items.length - 1
          }

          store.setState({ activeId: items[nextIndex] })
          break
        }
        case 'ArrowUp': {
          e.preventDefault()
          let prevIndex = currentIndex - 1

          // Wrap to last if at start and loop is enabled
          if (prevIndex < 0) {
            prevIndex = state.loop ? items.length - 1 : 0
          }

          store.setState({ activeId: items[prevIndex] })
          break
        }

        case 'Home': {
          e.preventDefault()
          store.setState({ activeId: items[0] })
          break
        }

        case 'End': {
          e.preventDefault()
          store.setState({ activeId: items[items.length - 1] })
          break
        }
        case 'Enter': {
          // Find the active item element and trigger its click
          if (state.activeId) {
            const activeElement = listRef.current?.querySelector(
              `[id="${state.activeId}"]`
            ) as HTMLElement

            if (activeElement) {
              e.preventDefault()
              activeElement.click()
            }
          }
          break
        }

        case 'Escape': {
          e.preventDefault()

          // If there's a query, clear it
          // Otherwise, close the palette (handled by parent)
          const currentView = state.view
          if (currentView.query) {
            // ✅ Use view.query instead
            store.setState({
              view: {
                ...currentView,
                query: '',
              },
              open: false,
              activeId: null,
            })
          }
          break
        }
      }
    }

    // listen for keybaord events globally
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [store])

  // Auto scroll active items into view
  useEffect(() => {
    if (!activeId || !listRef.current) return

    const activeElement = listRef.current.querySelector(`[id="${activeId}"]`)
    if (activeElement) {
      activeElement.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      })
    }
  }, [activeId])

  return (
    <div
      ref={listRef}
      role="listbox"
      className={`
        max-h-[400px]
        overflow-y-auto
        overflow-x-hidden
        py-2
        ${className}
      `}
      style={{
        //Custom scrollbar styling
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgb(203 213 225) transparent',
      }}
    >
      {children}
    </div>
  )
}

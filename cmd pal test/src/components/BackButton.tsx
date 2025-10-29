import { useCommandContext } from '@/types/context'
import { useSyncExternalStore, useCallback } from 'react'

export default function BackButton() {
  const store = useCommandContext()

  const getView = useCallback(() => store.getState().view, [])
  const getHasHistory = useCallback(
    () => store.getState().history.length > 0,
    []
  )

  const view = useSyncExternalStore(store.subscribe, getView)
  const hasHistory = useSyncExternalStore(store.subscribe, getHasHistory)

  if (view.type === 'root' || !hasHistory) return null

  const handleBack = () => {
    store.goBack()
  }

  return (
    <button
      onClick={handleBack}
      className="flex items-center w-full gap-2 px-4 py-3 text-left transition-colors border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50"
      aria-label="Go back to previous view"
    >
      <span className="text-gray-500 dark:text-gray-400">←</span>
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
        Back
      </span>
    </button>
  )
}

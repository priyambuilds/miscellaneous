import React from 'react'
import './style.css'

export function App() {
  const [menuOpen, setMenuOpen] = React.useState<boolean>(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)
  // Toggle the menu when ⌘K is pressed
  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent): void {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()

        // Store element that had focus before opening
        if (!menuOpen) {
          triggerRef.current = document.activeElement as HTMLElement
        }
        setMenuOpen(open => !open)
      }
      // Close on escape
      if (e.key === 'Escape' && menuOpen) {
        e.preventDefault()
        setMenuOpen(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  // Move focus to menu when it opens
  React.useEffect(() => {
    if (menuOpen && menuRef.current) {
      // Focus first focusable element or the container
      const focus = menuRef.current.querySelector<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )

      if (focus) {
        focus.focus()
      } else {
        menuRef.current.focus()
      }
    } else if (!menuOpen && triggerRef.current) {
      // Return focus when closed
      triggerRef.current.focus()
      triggerRef.current = null
    }
  }, [menuOpen])

  if (!menuOpen) return null

  return <div></div>
}

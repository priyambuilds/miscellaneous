import { useState, useEffect } from 'react'
import { Command } from 'cmdk'

function App() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(open => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  if (!open) return null

  return (
    <div className="overlay" onClick={() => setOpen(false)}>
      <div className="palette" onClick={e => e.stopPropagation()}>
        <Command>
          <Command.Input placeholder="Type a command..." />
          <Command.List>
            <Command.Empty>No results.</Command.Empty>
            <Command.Item>Calendar</Command.Item>
            <Command.Item>Calculator</Command.Item>
            <Command.Item>Settings</Command.Item>
          </Command.List>
        </Command>
      </div>
    </div>
  )
}

export default App

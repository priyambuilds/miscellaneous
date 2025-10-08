import { Command } from 'cmdk'
import { useEffect, useState } from 'react'
import './command-styles.scss'

export function CommandPalette() {
  const [open, setOpen] = useState(false)

  // Toggle handler for Ctrl+K
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

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Global Command Menu"
    >
      <Command.Input placeholder="Type a command or search..." />
      <Command.List>
        <Command.Empty>No results found.</Command.Empty>

        <Command.Group heading="Search">
          <Command.Item onSelect={() => console.log('Google search')}>
            🔍 Google Search
          </Command.Item>
          <Command.Item onSelect={() => console.log('Perplexity')}>
            🤖 Perplexity
          </Command.Item>
          <Command.Item onSelect={() => console.log('YouTube')}>
            🎥 YouTube
          </Command.Item>
        </Command.Group>

        <Command.Group heading="Utilities">
          <Command.Item>📊 Calculator</Command.Item>
          <Command.Item>🔄 Converter</Command.Item>
          <Command.Item>🌐 Translator</Command.Item>
        </Command.Group>

        <Command.Separator />

        <Command.Group heading="Tabs">
          <Command.Item>📑 Switch Tab</Command.Item>
          <Command.Item>📌 Pin Tab</Command.Item>
          <Command.Item>❌ Close Tab</Command.Item>
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  )
}

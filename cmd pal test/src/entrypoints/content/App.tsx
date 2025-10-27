import { CommandItem } from '@/components/CommandItem'
import CommandInput from '../../components/CommandInput'
import { CommandList } from '@/components/CommandList'
import { Command } from '../../components/Command'

export function App() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        e.stopPropagation()
        setOpen(prev => !prev)

        if (process.env.NODE_ENV === 'development') {
          console.log('🎹 Command Palette toggled:', !open)
        }
      }
      // Escape: Close palette when open
      if (e.key === 'Escape' && open) {
        e.preventDefault()
        setOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown, { capture: true })

    return () => {
      window.removeEventListener('keydown', handleKeyDown, { capture: true })
    }
  }, [open])

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">CMDK Recreation Test</h1>

      <Command>
        <CommandInput placeholder="Search commands..." />
        <CommandList>
          <CommandItem>Navigate to Home</CommandItem>
          <CommandItem>Go to Settings</CommandItem>
          <CommandItem>Search Files</CommandItem>
          <CommandItem>Create New Document</CommandItem>
        </CommandList>
      </Command>
    </div>
  )
}

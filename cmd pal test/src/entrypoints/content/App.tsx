import React from 'react'
import { Command, useCommandState } from 'cmdk'
import './style.css'

// Mock async data fetching
const fetchAsyncResults = async (
  query: string
): Promise<Array<{ id: string; title: string }>> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { id: 'async-1', title: `Async result for "${query}" - Item 1` },
        { id: 'async-2', title: `Async result for "${query}" - Item 2` },
        { id: 'async-3', title: `Async result for "${query}" - Item 3` },
      ])
    }, 800)
  })
}

// Component for conditional sub-items (shows only when searching)
const SubItem = ({ children, ...props }: any) => {
  const search = useCommandState(state => state.search)
  if (!search) return null
  return <Command.Item {...props}>{children}</Command.Item>
}

export function App() {
  const [open, setOpen] = React.useState(false)
  const [pages, setPages] = React.useState<string[]>([])
  const [asyncResults, setAsyncResults] = React.useState<
    Array<{ id: string; title: string }>
  >([])
  const [asyncLoading, setAsyncLoading] = React.useState(false)
  const [search, setSearch] = React.useState('')

  const page = pages[pages.length - 1]

  // Toggle with Ctrl+K
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen(open => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  // Reset when closing
  React.useEffect(() => {
    if (!open) {
      setPages([])
      setSearch('')
      setAsyncResults([])
    }
  }, [open])

  // Handle escape for closing and backspace for page navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (pages.length > 0) {
        e.preventDefault()
        setPages(p => p.slice(0, -1))
      } else {
        setOpen(false)
      }
    } else if (e.key === 'Backspace' && !search && pages.length > 0) {
      e.preventDefault()
      setPages(p => p.slice(0, -1))
    }
  }

  // Fetch async results when on async page
  React.useEffect(() => {
    if (search.length > 0 && page === 'async') {
      setAsyncLoading(true)
      fetchAsyncResults(search).then(results => {
        setAsyncResults(results)
        setAsyncLoading(false)
      })
    }
  }, [search, page])

  if (!open) return null

  return (
    <>
      {/* Overlay */}
      <div className="cmdk-overlay" onClick={() => setOpen(false)} />

      {/* Command Menu */}
      <div className="cmdk-wrapper">
        <Command
          value={search}
          onValueChange={setSearch}
          onKeyDown={handleKeyDown}
        >
          <Command.Input placeholder="Type a command or search..." />

          <Command.List>
            <Command.Empty>No results found.</Command.Empty>

            {/* HOME PAGE */}
            {!page && (
              <>
                {/* Group 1: File Operations */}
                <Command.Group heading="File Operations">
                  <Command.Item onSelect={() => console.log('New File')}>
                    <FileIcon />
                    New File
                  </Command.Item>
                  <Command.Item onSelect={() => console.log('Open File')}>
                    <FolderIcon />
                    Open File
                  </Command.Item>
                  <Command.Item onSelect={() => console.log('Save File')}>
                    <SaveIcon />
                    Save File
                  </Command.Item>
                </Command.Group>

                {/* Group 2: Navigation (with nested page navigation) */}
                <Command.Group heading="Navigation">
                  <Command.Item
                    onSelect={() => setPages([...pages, 'projects'])}
                  >
                    <ProjectIcon />
                    Projects
                  </Command.Item>
                  {/* Sub-items that show when searching */}
                  <SubItem onSelect={() => console.log('Project Alpha')}>
                    <SubIcon />→ Project Alpha
                  </SubItem>
                  <SubItem onSelect={() => console.log('Project Beta')}>
                    <SubIcon />→ Project Beta
                  </SubItem>
                  <SubItem onSelect={() => console.log('Project Gamma')}>
                    <SubIcon />→ Project Gamma
                  </SubItem>

                  <Command.Item
                    onSelect={() => setPages([...pages, 'settings'])}
                  >
                    <SettingsIcon />
                    Settings
                  </Command.Item>
                  {/* Settings sub-items */}
                  <SubItem onSelect={() => console.log('General Settings')}>
                    <SubIcon />→ General
                  </SubItem>
                  <SubItem onSelect={() => console.log('Theme Settings')}>
                    <SubIcon />→ Theme
                  </SubItem>
                  <SubItem onSelect={() => console.log('Keyboard Settings')}>
                    <SubIcon />→ Keyboard
                  </SubItem>

                  <Command.Item onSelect={() => console.log('Dashboard')}>
                    <DashboardIcon />
                    Dashboard
                  </Command.Item>
                </Command.Group>

                {/* Group 3: Tools */}
                <Command.Group heading="Tools">
                  <Command.Item onSelect={() => console.log('Calculator')}>
                    <CalculatorIcon />
                    Calculator
                  </Command.Item>
                  <Command.Item onSelect={() => console.log('Terminal')}>
                    <TerminalIcon />
                    Terminal
                  </Command.Item>
                  <Command.Item onSelect={() => setPages([...pages, 'async'])}>
                    <SearchIcon />
                    Async Search
                  </Command.Item>
                </Command.Group>
              </>
            )}

            {/* PROJECTS PAGE (Nested) */}
            {page === 'projects' && (
              <>
                <Command.Item onSelect={() => setPages([])}>
                  <BackIcon />
                  Back to Home
                </Command.Item>

                <Command.Group heading="All Projects">
                  <Command.Item
                    onSelect={() => console.log('Project Alpha - Details')}
                  >
                    <ProjectIcon />
                    Project Alpha
                  </Command.Item>
                  <Command.Item
                    onSelect={() => console.log('Project Beta - Details')}
                  >
                    <ProjectIcon />
                    Project Beta
                  </Command.Item>
                  <Command.Item
                    onSelect={() => console.log('Project Gamma - Details')}
                  >
                    <ProjectIcon />
                    Project Gamma
                  </Command.Item>
                  <Command.Item
                    onSelect={() => console.log('Project Delta - Details')}
                  >
                    <ProjectIcon />
                    Project Delta
                  </Command.Item>
                </Command.Group>

                <Command.Group heading="Recent">
                  <Command.Item
                    onSelect={() => console.log('Recent: Project Beta')}
                  >
                    <ClockIcon />
                    Project Beta
                  </Command.Item>
                </Command.Group>
              </>
            )}

            {/* SETTINGS PAGE (Nested) */}
            {page === 'settings' && (
              <>
                <Command.Item onSelect={() => setPages([])}>
                  <BackIcon />
                  Back to Home
                </Command.Item>

                <Command.Group heading="Appearance">
                  <Command.Item onSelect={() => console.log('Theme: Light')}>
                    Light Theme
                  </Command.Item>
                  <Command.Item onSelect={() => console.log('Theme: Dark')}>
                    Dark Theme
                  </Command.Item>
                  <Command.Item onSelect={() => console.log('Theme: Auto')}>
                    Auto Theme
                  </Command.Item>
                </Command.Group>

                <Command.Group heading="Editor">
                  <Command.Item onSelect={() => console.log('Font Size')}>
                    Font Size
                  </Command.Item>
                  <Command.Item onSelect={() => console.log('Tab Size')}>
                    Tab Size
                  </Command.Item>
                </Command.Group>
              </>
            )}

            {/* ASYNC PAGE */}
            {page === 'async' && (
              <>
                <Command.Item onSelect={() => setPages([])}>
                  <BackIcon />
                  Back to Home
                </Command.Item>

                <Command.Group heading="Async Results">
                  {asyncLoading && (
                    <Command.Loading>Loading results...</Command.Loading>
                  )}
                  {!asyncLoading &&
                    asyncResults.length > 0 &&
                    asyncResults.map(result => (
                      <Command.Item
                        key={result.id}
                        onSelect={() => console.log(result.title)}
                      >
                        <SearchIcon />
                        {result.title}
                      </Command.Item>
                    ))}
                  {!asyncLoading && asyncResults.length === 0 && search && (
                    <Command.Empty>
                      No results found for "{search}"
                    </Command.Empty>
                  )}
                </Command.Group>
              </>
            )}
          </Command.List>
        </Command>
      </div>
    </>
  )
}

// Icon components
const FileIcon = () => <span style={{ marginRight: '8px' }}>📄</span>
const FolderIcon = () => <span style={{ marginRight: '8px' }}>📁</span>
const SaveIcon = () => <span style={{ marginRight: '8px' }}>💾</span>
const ProjectIcon = () => <span style={{ marginRight: '8px' }}>📦</span>
const SettingsIcon = () => <span style={{ marginRight: '8px' }}>⚙️</span>
const DashboardIcon = () => <span style={{ marginRight: '8px' }}>📊</span>
const CalculatorIcon = () => <span style={{ marginRight: '8px' }}>🔢</span>
const TerminalIcon = () => <span style={{ marginRight: '8px' }}>💻</span>
const SearchIcon = () => <span style={{ marginRight: '8px' }}>🔍</span>
const BackIcon = () => <span style={{ marginRight: '8px' }}>←</span>
const ClockIcon = () => <span style={{ marginRight: '8px' }}>🕐</span>
const SubIcon = () => <span style={{ marginRight: '8px' }}> </span>

import type { CommandStore } from './store'

export interface CommandState {
  open: boolean
  activeId: string | null | undefined
  loop: boolean
  view: ViewState
  history: ViewState[]
  recentCommands: string[]
  lastNavigationWasBack?: boolean
}

export interface CommandProps {
  label: string
  value?: string
  onValueChnage?: (value: string) => void
  shouldFilter?: boolean
  loop?: boolean
  children?: React.ReactNode
}

export interface CommandItemProps {
  id?: string
  value: string
  keywords?: string[]
  disabled?: boolean
  onSelect?: (value: string) => void
  children?: React.ReactNode
  skipScoring?: boolean
}

export type ViewType = 'root' | 'portal' | 'category'

export interface ViewState {
  type: ViewType
  portalId?: string
  categoryId?: string
  query?: string
}

export interface PortalContext {
  onClose: () => void
  store?: CommandStore
}

export interface Navigable {
  id: string
  name: string
  icon: string
  description?: string
  keywords: string[]
  prefixes?: string[] // Shortcuts like "!g" for Google search

  // Actions (immediate execution)
  onExecute?: () => void | Promise<void>

  // Portals (custom interfaces)
  renderContent?: (query: string, context: PortalContext) => React.JSX.Element

  // Categories (navigation - contains children)
  children?: Navigable[]
}

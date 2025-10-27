/**
 * =============================================================================
 * CORE TYPE DEFINITIONS - COMMAND PALETTE STATE MANAGEMENT
 * =============================================================================
 *
 * This file defines all the fundamental types used throughout the command
 * palette application. Think of these as the "schema" or "API contract" that
 * every component and hook adheres to.
 *
 * KEY CONCEPTS:
 * - Commands: Executable actions (e.g., "Open Settings") or portals (e.g., "Search Bookmarks")
 * - Views: Navigation states (root view, category view, portal view)
 * - State: React state managed by the store
 *
 * USAGE:
 * - Import types: import type { Command, CommandProps } from '@/types/types'
 * - Never modify these without updating related components/hooks
 */

import type { CommandStore } from './store'

/**
 * GLOBAL COMMAND PALETTE STATE
 *
 * This interface represents the entire "state" of the command palette at any
 * given time. It's managed by the CommandStore (see @/types/store.ts).
 *
 * @property open - Whether the modal is visible
 * @property activeId - ID of currently highlighted command (for keyboard nav)
 * @property loop - Whether navigation wraps around at edges (up/down arrows)
 * @property view - Current navigation view (root/category/portal)
 * @property history - Stack of previous views (for back button)
 * @property recentCommands - Array of recently executed command IDs
 */
export interface CommandState {
  open: boolean
  activeId: string | null | undefined
  loop: boolean
  view: ViewState
  history: ViewState[] // Navigation stack for back button
  recentCommands: string[]
}

/**
 * Props for the root Command component
 */
export interface CommandProps {
  label: string // Accessible name for the combobox
  value?: string
  onValueChange?: (v: string) => void
  shouldFilter?: boolean
  loop?: boolean
  children?: React.ReactNode
}

/**
 * Props for CommandItem component
 */
export interface CommandItemProps {
  id?: string // Falls back to a generated id
  value: string // Canonical value for filtering/selection
  keywords?: string[] // Additional terms to match
  disabled?: boolean
  onSelect?: (value: string) => void
  children?: React.ReactNode
  skipScoring?: boolean // Skip built-in filtering/scoring (for pre-filtered lists)
}

/**
 * VIEW TYPES FOR NAVIGATION
 *
 * The command palette supports multiple "screens" or "views" that users can
 * navigate between. This union type defines all possible view states.
 */
export type ViewType = 'root' | 'portal' | 'category'

/**
 * VIEW STATE - NAVIGATION MANAGEMENT
 *
 * Represents the current "screen" the user is looking at in the palette.
 * The ViewState tracks which commands are visible and how to display them.
 *
 * ROOT VIEW: Shows all commands, categories, recents, and active search
 * CATEGORY VIEW: Shows commands within a specific category (e.g., "Navigation")
 * PORTAL VIEW: Shows a special interface (e.g., bookmark searcher, tab switcher)
 *
 * @property type - Current view type
 * @property portalId - Which portal to display (when type === 'portal')
 * @property categoryId - Which category to display (when type === 'category')
 * @property query - Current search query (affects filtering on all views)
 *
 * @see CommandStore.navigate() for navigation logic
 * @see CommandStore.goBack() for back button functionality
 */
export interface ViewState {
  type: ViewType
  portalId?: string // Set when type = 'portal'
  categoryId?: string // Set when type = 'category'
  query?: string // Current search query (optional)
}

/**
 * BASE COMMAND PROPERTIES
 *
 * Every command in the palette shares these core properties. This ensures
 * consistent behavior and rendering across different command types.
 *
 * @property id - Unique identifier (e.g., "open-settings", "search-bookmarks")
 * @property name - Display name shown in the UI (e.g., "Open Settings")
 * @property description - Brief explanation of what the command does
 * @property icon - Emoji icon for visual representation (e.g., "⚙️")
 * @property keywords - Additional search terms beyond the name
 * @property category - Grouping category ("navigation", "search", "tools")
 * @property source - Where this command comes from ("Built-in" or extension name)
 */
export interface BaseCommand {
  id: string
  name: string
  description: string
  icon: string
  keywords: string[]
  category: string // Which category this belongs to
  source?: string // "Built-in" or extension name
}

/**
 * ACTION COMMAND - IMMEDIATE EXECUTION
 *
 * These commands execute immediately when selected. They represent common
 * actions the user wants to perform. When clicked, the command runs its
 * onExecute function and typically closes the palette.
 *
 * @property type - Always 'action'
 * @property onExecute - Function to run when command is selected
 *
 * EXAMPLES:
 * - "Clear Cache" → clears browser cache
 * - "Copy Current URL" → copies current page URL to clipboard
 * - "Take Screenshot" → captures and downloads a screenshot
 *
 * @see useCommandPalette for execution handling
 */
export interface ActionCommand extends BaseCommand {
  type: 'action'
  onExecute: () => void | Promise<void>
}

/**
 * PORTAL COMMAND - DYNAMIC INTERFACE NAVIGATION
 *
 * These commands open specialized "portals" - new searchable interfaces
 * within the palette. Portals are like mini-apps that handle specific
 * tasks with their own data sources (bookmarks, history, search results).
 *
 * @property type - Always 'portal'
 * @property searchPlaceholder - Placeholder text for the portal's search input
 * @property renderContent - Function that renders the portal content
 *
 * EXAMPLES:
 * - "Search Bookmarks" → opens a searchable bookmark browser
 * - "!g search term" → opens a portal for Google search results
 * - "Tab Switcher" → opens interface to switch between browser tabs
 *
 * @see PortalRenderer for content rendering
 */
export interface PortalCommand extends BaseCommand {
  type: 'portal'
  searchPlaceholder?: string
  renderContent: (query: string, context: PortalContext) => React.ReactNode
}

/**
 * CATEGORY COMMAND - ORGANIZATIONAL GROUPING
 *
 * These commands represent groupings of related actions. Selecting a category
 * navigates to a view showing all commands in that category. Categories help
 * users discover commands by logical groupings.
 *
 * @property type - Always 'category'
 *
 * EXAMPLES:
 * - "Navigation" → shows browser navigation commands
 * - "Developer Tools" → shows developer-related actions
 * - "System" → shows system utilities and settings
 *
 * @see PortalRenderer for category view rendering
 * @see @/config/commands.ts for navigable definitions
 */
export interface CategoryCommand extends BaseCommand {
  type: 'category'
}

/**
 * PORTAL CONTEXT - DATA AND CONTROLS FOR PORTAL RENDERING
 *
 * This context object is passed to every portal's renderContent function,
 * providing necessary tools and data for portal implementations.
 *
 * Portals receive this context to:
 * - Close the command palette after completing an action
 * - Access the full store state for advanced interactions
 * - Navigate to other views if needed
 *
 * @property onClose - Function to close the command palette modal
 * @property store - Full access to the CommandStore for state management
 *
 * @see PortalCommand.renderContent for usage examples
 * @see @/components/portals/PortalRenderer.tsx for context passing
 */
export interface PortalContext {
  onClose: () => void
  store?: CommandStore
}

/**
 * COMMAND UNION TYPE - ALL POSSIBLE COMMAND VARIANTS
 *
 * TypeScript union type that represents any valid command in the system.
 * This ensures type safety when working with mixed command arrays.
 *
 * A command can be ONLY ONE of these types:
 * - ActionCommand: Immediate execution
 * - PortalCommand: Opens a new interface
 * - CategoryCommand: Navigates to category view
 *
 * @see BaseCommand for shared properties
 * @see ActionCommand, PortalCommand, CategoryCommand for individual properties
 */
export type Command = ActionCommand | PortalCommand | CategoryCommand

/**
 * CATEGORY DEFINITION - ORGANIZATIONAL GROUPING STRUCTURE
 *
 * A category is a logical grouping of related commands. Categories provide
 * discoverability and help users find commands by mental models (navigation,
 * search, tools). Each category has a set of commands that belong to it.
 *
 * @property id - Unique identifier (e.g., "navigation", "search", "tools")
 * @property name - Display name (e.g., "Navigation", "Search & Browse")
 * @property icon - Emoji icon for visual representation
 * @property description - Brief explanation of what the category contains
 * @property commandIds - Array of command IDs that belong to this category
 *
 * USAGE:
 * When a category is selected, users navigate to a view showing all commands
 * in that category. Categories are displayed prominently in the root view.
 *
 * @see navigables array in @/config/commands.ts for all defined navigables
 * @see PortalRenderer for rendering category contents
 */
export interface Category {
  id: string
  name: string
  icon: string
  description: string
  commandIds: string[]
}

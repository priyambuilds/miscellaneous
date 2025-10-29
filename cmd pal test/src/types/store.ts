/**
 * Command Palette Store - The "Brain" of the Application
 *
 * Think of this store as your app's memory and messenger service.
 * It remembers what screen you're on, what you're typing, and tells
 * all your app's parts when things change so they can update themselves.
 *
 * WHY THIS EXISTS:
 * - Components can't talk to each other directly in Chrome extensions
 * - We need one central place to remember the user's current state
 * - React components must re-render when data changes (subscriptions)
 * - Your recent commands persist even after closing Chrome
 *
 * HOW IT WORKS:
 * 1. createStore() makes our memory "bank"
 * 2. Components "subscribe" to get notified of changes
 * 3. When state changes, all subscribers automatically update
 * 4. Navigation saves breadcrumbs for the back button
 */

import type { CommandState, ViewState } from './types'

// =============================================================================
// CONFIGURATION SETTINGS - "How Much and Where" the Store Works
// =============================================================================

/**
 * Key where recent commands are saved in Chrome's storage.
 * Like putting your recent items in a specific drawer labeled "recent"
 */
const STORAGE_KEY = 'commandPalette_recent'

/**
 * Maximum number of recent commands to remember.
 * Prevents the app from getting slow with too much memory usage.
 */
const MAX_RECENT_COMMANDS = 10

// =============================================================================
// INTERNAL TYPES - "Bookkeeping" for Component Subscriptions
// =============================================================================

/**
 * A notification sent to components when store state changes.
 * Like ringing a bell to tell everyone "update now!"
 */
type Subscriber = () => void

/**
 * Information about each component that wants updates.
 * We track when they signed up for notifications, their ID, etc.
 */
interface SubscriptionMeta {
  /** Function to call to notify this component */
  callback: Subscriber
  /** Unique ID for this subscription */
  id: number
  /** When this component started listening */
  mountedAt: number
  /** Last time we notified this component */
  lastActive: number
}

/**
 * Loads recent commands from Chrome browser storage
 * @returns Promise resolving to array of command IDs
 */
async function loadRecentCommands(): Promise<string[]> {
  try {
    const result = await chrome.storage.local.get(STORAGE_KEY)
    return Array.isArray(result[STORAGE_KEY]) ? result[STORAGE_KEY] : []
  } catch (error) {
    console.warn('Failed to load recent commands:', error)
    return []
  }
}

/**
 * Saves recent commands to Chrome browser storage
 * @param commands Array of command IDs to save
 */
async function saveRecentCommands(commands: string[]): Promise<void> {
  try {
    await chrome.storage.local.set({ [STORAGE_KEY]: commands })
  } catch (error) {
    console.error('Failed to save recent commands:', error)
  }
}

// =============================================================================
// STORE API INTERFACE - What the Store Does
// =============================================================================

// Public methods of the store that developers use
interface CommandStore {
  subscribe: (callback: () => void) => () => void // Listen for state changes
  getState: () => CommandState // Get current state
  setState: (partial: Partial<CommandState>) => void // Update part of state
  navigate: (newView: ViewState) => void // Go to different view (portal, category, etc.)
  goBack: () => boolean // Go back to previous view
  init: () => Promise<void> // Load saved data when app starts
  addRecentCommand: (commandId: string) => Promise<void> // Remember user used this command
  cleanup?: () => void // Remove all listeners (only in development)
}

/**
 * Creates a command store instance
 *
 * Like a factory - we call this once to get our store.
 * The store manages all the app's state: views, queries, command history.
 *
 * @param initialState Starting state (what the app looks like when first opened)
 * @returns Store with methods to manage state
 */
export function createStore(initialState: CommandState): CommandStore {
  // PRIVATE STATE - only the store can change this
  // Starts with whatever we pass in, then gets updated as user interacts
  let state = initialState

  // SUBSCRIPTION SYSTEM - tracks which components want state updates
  // When state changes, everyone in this list gets notified
  const subscribers = new Map<number, SubscriptionMeta>() // Map of ID → subscriber info
  let nextSubscriptionId = 0 // Counter to give each subscriber a unique ID

  /**
   * SUBSCRIBE: "Sign Up for Updates!"
   *
   * Components call this when they want to know when store state changes.
   * Like subscribing to a newsletter - you'll get notified every time something important happens.
   *
   * IMPORTANT: Always call the returned function when your component unmounts (cleanup)
   * to prevent memory leaks. This is critical for React components!
   *
   * @param callback Function to call whenever any state changes
   * @returns Function that removes this subscription (call on unmount!)
   * @example
   *   const unsubscribe = store.subscribe(() => {
   *     console.log('The store changed!')
   *   })
   *
   *   // Later, when component unmounts:
   *   unsubscribe() // Clean up!
   */
  function subscribe(callback: Subscriber): () => void {
    // Generate a unique ID for this subscriber
    const id = nextSubscriptionId++
    // Record the current time for tracking
    const now = Date.now()
    // Create metadata for this subscription
    const meta: SubscriptionMeta = {
      callback,
      id,
      mountedAt: now,
      lastActive: now,
    }
    // Add this subscriber to the set of subscribers
    subscribers.set(id, meta)

    // Warn in development if there are too many subscribers
    if (process.env.NODE_ENV === 'development' && subscribers.size >= 100) {
      console.warn(
        `Warning: ${subscribers.size} components are listening to store.`
      )
    }

    // --- What does this function return? ---
    // It returns a function (called an "unsubscribe" or "cleanup" function).
    // When you call this returned function, it will remove this subscriber from the store.
    // This is useful in React, for example, to stop listening when a component unmounts.
    return () => {
      const prevSize = subscribers.size
      // Try to remove this subscriber by its ID
      const wasRemoved = subscribers.delete(id)
      // In development, log if something unexpected happens
      if (process.env.NODE_ENV === 'development') {
        if (!wasRemoved) {
          console.warn(
            `Store: Tried to remove listener ${id}, but it wasn't found`
          )
        } else if (prevSize === 30 || prevSize === 20 || prevSize === 10) {
          console.log(`Store: Now ${prevSize - 1} components are listening`)
        }
      }
    }
  }

  /**
   * NOTIFY SUBSCRIBERS: "Update Everyone!"
   *
   * Notifies all registered subscribers by calling their callback functions.
   *
   * This function iterates over all subscribers, updating their `lastActive` timestamp
   * to the current time and invoking their callback functions (typically used to update UI components).
   * If a subscriber's callback throws an error, the error is logged, and the subscriber is removed
   * from the list to prevent future errors.
   *
   * Steps:
   * 1. Get the current time.
   * 2. For each subscriber:
   *    - Update their `lastActive` property.
   *    - Call their callback function.
   *    - If an error occurs, log the error and mark the subscriber as broken.
   * 3. Remove any subscribers whose callbacks failed.
   *
   * This helps keep the list of subscribers clean and ensures that only working listeners
   * are notified in the future.
   */
  function notifySubscribers() {
    const now = Date.now()
    const brokenSubscribers: number[] = []
    subscribers.forEach((meta, id) => {
      try {
        meta.lastActive = now
        meta.callback() // This calls the component's update function!
      } catch (error) {
        console.error(`Component listener ${id} threw error:`, error)
        brokenSubscribers.push(id)
      }
    })
    brokenSubscribers.forEach(id => {
      subscribers.delete(id)
      console.warn(`Removed broken listener ${id}`)
    })
  }

  /**
   * GET STATE: "What's Happening Right Now?"
   *
   * The main way components read the current state of everything.
   * Returns all the current app state in one object.
   *
   * Like taking a snapshot of exactly what's happening in the app.
   *
   * @returns Complete current state (view, query, recent commands, etc.)
   */
  function getState(): CommandState {
    return state
  }

  /**
   * SET STATE: "Here's What's New!"
   *
   * Updates part or all of the app's state. React-style immutable updates.
   * Triggers all subscribed components to re-render with fresh data.
   *
   * STATE IS IMMUTABLE: We create new state objects instead of modifying existing ones.
   * This makes debugging easier and prevents weird bugs.
   *
   * @param partial Only the parts of state you want to change
   * @example store.setState({ view: newView }) // Change only the current view
   */
  function setState(partial: Partial<CommandState>): void {
    const oldState = state
    // Create new state (immutable - never modify existing state!)
    state = { ...state, ...partial }

    // Only notify subscribers if something actually changed
    if (oldState !== state) {
      notifySubscribers() // "Hey everyone, state changed!"
      if (process.env.NODE_ENV === 'development') {
        console.log('State changed:', partial)
      }
    }
  }

  /**
   * NAVIGATE: "Let's Go Somewhere New!"
   *
   * Changes what screen/view the user is looking at.
   * Automatically saves the current view to history for the back button.
   *
   * Think of it like changing rooms in a house:
   * - Remember where you came from (history)
   * - You can always go back to the previous room
   *
   * @param newView Where you want to go
   * @example store.navigate({ type: 'portal', portalId: 'calculator' })
   */
  function navigate(newView: ViewState): void {
    const currentView = state.view // Remember where we are now
    setState({
      view: newView, // Go to new place
      history: [...state.history, currentView], // Save current for back button
    })
    if (process.env.NODE_ENV === 'development') {
      console.log(`Navigated to: ${newView.type}`)
    }
  }

  /**
   * GO BACK: "Let's Return!"
   *
   * Uses the saved navigation history to go back to previous screens.
   * Like clicking the back button in a web browser.
   *
   * @returns true if successfully went back, false if nowhere to go
   * @example
   *   if (store.goBack()) {
   *     console.log('Went back successfully!')
   *   } else {
   *     console.log('Can\'t go back - at beginning!')
   *   }
   */
  function goBack(): boolean {
    const history = state.history

    // Can't go back if no history (you're at the start)
    if (history.length === 0) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Nothing to go back to')
      }
      return false
    }

    // Get the previous place from history
    const previousView = history[history.length - 1]
    if (!previousView) {
      console.error('History is broken')
      return false
    }

    // Go back by restoring the previous state
    setState({
      view: previousView, // Display previous screen
      history: history.slice(0, -1), // Remove it from history
      lastNavigationWasBack: true, // Flag to prevent prefix retriggering
    })

    if (process.env.NODE_ENV === 'development') {
      console.log(`Went back to: ${previousView.type}`)
    }
    return true
  }

  /**
   * INITIALIZE: "Startup Time!"
   *
   * Loads saved data when the app first starts up.
   * Specifically loads recent commands from Chrome's storage.
   *
   * Call this once when the app launches, before showing anything to users.
   *
   * @returns Promise that resolves when loading is complete
   * @example await store.init() // Load all saved data before showing UI
   */
  async function init(): Promise<void> {
    try {
      // Load recent commands from Chrome storage
      const recentCommands = await loadRecentCommands()
      setState({ recentCommands }) // Update app state

      if (process.env.NODE_ENV === 'development') {
        console.log(
          `Loaded ${recentCommands.length} recent commands from storage`
        )
      }
    } catch (error) {
      console.error('Failed to load saved data:', error)
    }
  }

  /**
   * ADD RECENT COMMAND: "Remember This!"
   *
   * Remembers that the user just used a command.
   * Moves it to the top of the "recent" list and saves to Chrome storage.
   *
   * Why MOVES to top? So most recently used commands are easiest to find.
   * Why LIMIT to 10? Keeps the list manageable and fast.
   *
   * @param commandId The command that was just used
   * @example store.addRecentCommand('google-search') // Remember Google was used
   */
  async function addRecentCommand(commandId: string): Promise<void> {
    const current = state.recentCommands || []

    // Remove this command from anywhere in the list (prevents duplicates)
    const withoutThis = current.filter(id => id !== commandId)

    // Put it at the front (most recent), keep only the latest 10
    const updated = [commandId, ...withoutThis].slice(0, MAX_RECENT_COMMANDS)

    // Update state and save to Chrome storage for next time
    setState({ recentCommands: updated })
    await saveRecentCommands(updated)

    if (process.env.NODE_ENV === 'development') {
      console.log(`Remembered command: ${commandId}`)
    }
  }

  /**
   * CLEANUP: "Development Only - Reset Everything"
   *
   * Removes all active subscriptions. Only exists in development mode.
   * Useful for debugging memory leaks when components don't clean up properly.
   *
   * @example store.cleanup() // Clear all listeners for fresh start
   */
  function cleanup(): void {
    if (process.env.NODE_ENV === 'development') {
      const count = subscribers.size
      subscribers.clear()
      console.warn(`Emergency cleanup: removed ${count} listeners`)
    }
  }

  // Public methods that developers use (the API)
  const store: CommandStore = {
    subscribe, // Listen for changes
    getState, // Read current state
    setState, // Change state
    navigate, // Go to new view
    goBack, // Go back to previous
    init, // Load saved data
    addRecentCommand, // Track command usage
    ...(process.env.NODE_ENV === 'development' ? { cleanup } : {}), // Debug helper
  }

  return store
}

// Export the type so other files know what store looks like
export type { CommandStore }

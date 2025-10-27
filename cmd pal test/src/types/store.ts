import type { CommandState, ViewState } from './types'

// Configuration for persistence and limits
const STORAGE_KEY = 'commandPalette_recent' // Chrome storage key
const MAX_RECENT_COMMANDS = 10 // Maximum recent commands to store

type Subscriber = () => void

interface SubscriptionMeta {
    callback: Subscriber
    id: number
    mountedAt: number
    lastActive: number
}

async function loadRecentCommands(): Promise<string[]> {
    try {
        const result = await chrome.storage.local.get(STORAGE_KEY)
        return Array.isArray(result[STORAGE_KEY]) ? result[STORAGE_KEY] : []
    } catch (error) {
        console.error('Failed to load recent commands from storage', error)
        return []
    }
}

async function saveRecentCommands(commands: string[]): Promise<void> {
    try {
        await.chrome.storage.local.set({ [STORAGE_KEY]: commands })
    } catch (error) {
        console.error('Failed to save recent commands to storage', error)
    }
}

interface CommandStore {
    subscribe: (callback: Subscriber) => () => void
    getState: () => CommandState
    setState: (partial: Partial<CommandState>) => void
    navigate: (view: ViewState) => void
    goBack: () => void
    init: () => Promise<void>
    addRecentCommand: (commandId: string) => Promise<void>
    cleanup?: () => void
}

export function createStore(initialState: CommandState): CommandStore {
    let state = initialState
}
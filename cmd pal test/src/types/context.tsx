import { createContext, useContext } from 'react'
import type { CommandStore } from './store'

export const CommandContext = createContext<CommandStore | null>(null)

export function useCommandContext(): CommandStore {
  const store = useContext(CommandContext)

  // DETAILED ERROR MESSAGE FOR DEVELOPERS
  if (!store) {
    throw new Error(
      `[useCommandContext] Hook used outside command palette tree.\n\n` +
        `HOIST THIS COMPONENT INSIDE:` +
        `\t<Command>` +
        `\t\t{ /* Your components here */ }` +
        `\t</Command>\n\n` +
        `COMMAND PALETTE COMPONENTS MUST BE WITHIN <Command> FOR STATE ACCESS.`
    )
  }

  return store
}

export type ConnectionStatus = "CONNECTING" | "OPEN" | "CLOSING" | "CLOSED"
export type MessageType = "chat" | "system" | "welcome" | "pong"

export interface ChatMessage {
  id: string
  type: MessageType
  senderId?: string
  username?: string
  text: string
  timestamp: string
  onlineCount?: number
  yourUsername?: string
  yourId?: string
}

// Helper function to map browser numbers to readable strings
export function getStatusFromReadyState(readyState: number): ConnectionStatus {
  switch (readyState) {
    case WebSocket.CONNECTING:
      return "CONNECTING"
    case WebSocket.OPEN:
      return "OPEN"
    case WebSocket.CLOSING:
      return "CLOSING"
    case WebSocket.CLOSED:
      return "CLOSED"
    default:
      throw new RangeError(`Unknown WebSocket readyState: ${readyState}`)
  }
}

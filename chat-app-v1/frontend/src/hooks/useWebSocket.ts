import { useState, useEffect, useRef, useCallback } from "react"
import { getStatusFromReadyState, type ConnectionStatus, type ChatMessage } from "../types"

export function useWebSocket(url: string) {
  const [status, setStatus] = useState<ConnectionStatus>("CONNECTING")
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [onlineCount, setOnlineCount] = useState<number>(1)
  const [myUsername, setMyUsername] = useState<string>("Guest")
  const [myId, setMyId] = useState<string>("")

  // ref holds the live websocket object without triggering re renders
  const socketRef = useRef<WebSocket | null>(null)

  // Connect function here is wrapper in useCallback so its reference doesnt change on every re render
  const connect = useCallback(() => {
    // if a socket is already open, close it cleanly before creating a new one
    if (socketRef.current) {
      socketRef.current.close()
      socketRef.current = null
    }

    setStatus("CONNECTING")

    try {
      const ws = new WebSocket(url)
      socketRef.current = ws

      // EVENT A: TCP handshake finished
      ws.onopen = () => {
        setStatus(getStatusFromReadyState(ws.readyState))
      }

      // EVENT B: An incoming frame arrived from Elysia
      ws.onmessage = (event: MessageEvent<string>) => {
        try {
          const data: ChatMessage = JSON.parse(event.data)

          // If the message contains an updated oline user count, save it
          if (typeof data.onlineCount === "number") {
            setOnlineCount(data.onlineCount)
          }

          // If its a welcome message, save our assigned ID and initial username
          if (data.type === "welcome" && data.yourUsername) {
            setMyUsername(data.yourUsername)
            if (data.yourId) setMyId(data.yourId)
          }

          // Append this message to the end of our messages array
          setMessages((prev) => [...prev, data])
        } catch (err) {
          console.error("Failed to parse incoming WebSocket frame:", err)
        }
      }

      // EVENT C: Connection terminated
      ws.onclose = () => {
        setStatus(getStatusFromReadyState(ws.readyState))
      }
    } catch (err) {
      console.error("WebSocket Connection Failed", err)
      setStatus("CLOSED")
    }
  }, [url])

  // Run on mount clean up on unmount
  useEffect(() => {
    connect()

    return () => {
      if (socketRef.current) {
        socketRef.current.close()
        socketRef.current = null
      }
    }
  }, [connect])

  // Action: Send chat text
  const sendChat = useCallback((text: string) => {
    const trimmed = text.trim()
    const ws = socketRef.current
    if (!trimmed || !ws || ws.readyState !== WebSocket.OPEN) return false

    ws.send(JSON.stringify({ type: "chat", text: trimmed }))
    return true
  }, [])
    
    // Action: update username
    const changeUsername = useCallback((newName: string) => {
        const trimmed = newName.trim();
        const ws = socketRef.current;
        if (!trimmed || !ws || ws.readyState !== WebSocket.OPEN) return false;
        
        ws.send(JSON.stringify({ type: "set_username", username: trimmed }));
        setMyUsername(trimmed);
        return true;
    }, []);

    // Action: Send ping test
    const sendPing = useCallback(() => {
        const ws = socketRef.current;
        if (!ws || ws.readyState !== WebSocket.OPEN) return false;
        
        ws.send(JSON.stringify({ type: "ping" }));
        return true;
    }, []);

    // Action: Clear screen
    const clearMessages = useCallback(() => {
        setMessages([]);
    }, []);

    return {
        status,
        messages,
        onlineCount,
        myUsername,
        myId,
        sendChat,
        changeUsername,
        sendPing,
        clearMessages,
        connect,
        isOpen: status === "OPEN"
    };
}

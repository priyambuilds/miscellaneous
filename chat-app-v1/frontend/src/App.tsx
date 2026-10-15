import { useWebSocket } from "./hooks/useWebSocket";
import { Header } from "./components/Header";
import { ConnectionBadge } from "./components/ConnectionBadge";
import { MessageList } from "./components/MessageList";
import { MessageInput } from "./components/MessageInput";
import { ProtocolInspector } from "./components/ProtocolInspector";
const WS_URL = "ws://localhost:8080";

export default function App() {
  const {
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
    isOpen,
  } = useWebSocket(WS_URL);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 font-sans antialiased bg-slate-950 text-slate-100 sm:p-6 selection:bg-indigo-500 selection:text-white">
      <main className="flex flex-col w-full max-w-2xl p-6 space-y-5 border shadow-2xl bg-slate-900/90 border-slate-800 rounded-3xl sm:p-8 backdrop-blur-xl">
        {/* Title & technology badges */}
        <Header />

        <ConnectionBadge
          status={status}
          onlineCount={onlineCount}
          myUsername={myUsername}
          onRename={changeUsername}
          onReconnect={connect}
        />

        <MessageList
          messages={messages}
          myId={myId}
          myUsername={myUsername}
          onClear={clearMessages}
        />

        <MessageInput
          onSendChat={sendChat}
          onSendPing={sendPing}
          isOpen={isOpen}
        />

        <ProtocolInspector status={status} />
      </main>
    </div>
  );
}

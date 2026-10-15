import { MessageSquare, Trash2, HelpCircle } from "lucide-react";
import { type ChatMessage } from "../types";
import { useEffect, useRef } from "react";
import { MessageItem } from "./MessageItem";

interface MessageListProps {
  messages: ChatMessage[];
  myId: string;
  myUsername: string;
  onClear: () => void;
}

export const MessageList = ({
  messages,
  myId,
  myUsername,
  onClear,
}: MessageListProps) => {
  // Dummy div at the bottom of the feed as a reference for scrolling into view
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Whenever a new message arrives autoScroll to the bottom smoothly
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col overflow-hidden border shadow-xl bg-slate-900/80 border-slate-800 rounded-2xl">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b bg-slate-950/60 border-slate-800/80">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-semibold tracking-wider uppercase text-slate-300">
            #general chat
          </span>
          <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-800 text-slate-400 rounded-full">
            {messages.length} messages
          </span>
        </div>
        {messages.length > 0 && (
          <button
            onClick={onClear}
            className="flex items-center gap-1 px-2 py-1 text-xs transition-colors rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            title="Clear chat history"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        )}
      </div>
      {/* Messages Scroll Area */}
      <div className="h-[360px] overflow-y-auto p-4 space-y-1">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-6 space-y-3 text-center text-slate-500">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-800/50 text-slate-400">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400">
                Chat room is quiet
              </p>
              <p className="max-w-xs mt-1 text-xs text-slate-500">
                Say hello to the room or open a second browser tab to test live
                multi-user messaging!
              </p>
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <MessageItem
              key={msg.id}
              message={msg}
              myId={myId}
              myUsername={myUsername}
            />
          ))
        )}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

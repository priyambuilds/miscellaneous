import { type ChatMessage } from "../types";
import { Sparkles, Info, Send } from "lucide-react";

interface MessageItemProps {
  message: ChatMessage;
  myId: string;
  myUsername: string;
}

export const MessageItem = ({
  message,
  myId,
  myUsername,
}: MessageItemProps) => {
  // 1. System / Welcome announcements: centered muted badge
  if (message.type === "system" || message.type === "welcome") {
    return (
      <div className="flex justify-center my-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/60 border border-slate-700/40 text-[11px] text-slate-400 font-medium shadow-sm">
          <Info className="w-3 h-3 text-slate-500" />
          <span>{message.text}</span>
          <span className="text-slate-500 font-mono text-[10px]">
            · {message.timestamp}
          </span>
        </div>
      </div>
    );
  }

  // 2. Pong heartbeat: centered amber glow badge
  if (message.type === "pong") {
    return (
      <div className="flex justify-center my-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-semibold text-amber-300 shadow-sm animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          <span>🏓 Server Pong ({message.timestamp})</span>
        </div>
      </div>
    );
  }

  // 3. Chat message
  const isMe =
    (message.senderId && message.senderId === myId) ||
    message.username === myUsername;

  return (
    <div className={`flex flex-col ${isMe ? "items-end" : "items-start"} mb-3`}>
      {/* Header: Username and Time */}
      <div className="flex items-center gap-1.5 mb-1 px-1 text-[11px] text-slate-400">
        <span
          className={`font-semibold ${isMe ? "text-indigo-400" : "text-amber-400"}`}
        >
          {isMe ? "You" : message.username || "User"}
        </span>
        <span className="text-slate-500 font-mono text-[10px]">
          · {message.timestamp}
        </span>
      </div>
      {/* Bubble: Blue (Right) if Me, Dark Slate (Left) if Someone else */}
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm leading-relaxed shadow-sm transition-all ${
          isMe
            ? "bg-indigo-600 text-white rounded-tr-none border border-indigo-500/30"
            : "bg-slate-800 text-slate-100 rounded-tl-none border border-slate-700/60"
        }`}
      >
        <span className="break-words">{message.text}</span>
      </div>
    </div>
  );
};

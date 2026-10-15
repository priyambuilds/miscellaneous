import { useState, type SubmitEvent } from "react";
import { Send } from "lucide-react";

interface MessageInputProps {
  onSendChat: (text: string) => void;
  onSendPing: () => void;
  isOpen: boolean;
}

export const MessageInput = ({
  onSendChat,
  onSendPing,
  isOpen,
}: MessageInputProps) => {
  const [inputText, setInputText] = useState("");

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputText.trim() || !isOpen) return;

    onSendChat(inputText);
    setInputText("");
  };
  return (
    <div className="flex flex-col space-y-2.5">
      {/* Top Bar: Quick Action Ping & Keyboard Hint */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onSendPing}
          disabled={!isOpen}
          className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 hover:text-white text-xs font-semibold rounded-lg border border-slate-700/60 transition-all active:scale-95"
        >
          <span>🏓 Send Ping Test</span>
        </button>
        <span className="text-[11px] text-slate-500">
          Press{" "}
          <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-400 font-mono text-[10px]">
            Enter ↵
          </kbd>{" "}
          to send
        </span>
      </div>
      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={
            isOpen
              ? "Send a message to everyone in the room..."
              : "Connecting to server..."
          }
          disabled={!isOpen}
          className="flex-1 bg-slate-900 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all font-sans"
        />
        <button
          type="submit"
          disabled={!isOpen || !inputText.trim()}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-xl shadow-lg shadow-indigo-600/20 transition-all active:scale-95 cursor-pointer"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Send</span>
        </button>
      </form>
    </div>
  );
};

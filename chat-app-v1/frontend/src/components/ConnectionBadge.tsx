import { useState, type SubmitEvent } from "react";
import type { ConnectionStatus } from "../types";
import { Users, RefreshCw, User, Check, Edit2 } from "lucide-react";

interface ConnectionBadgeProps {
  status: ConnectionStatus;
  onlineCount: number;
  myUsername: string;
  onRename: (newName: string) => void;
  onReconnect: () => void;
}

export const ConnectionBadge = ({
  status,
  onlineCount,
  myUsername,
  onRename,
  onReconnect,
}: ConnectionBadgeProps) => {
  // Local state to toggle between displaying the name and the edit form
  const [isEditing, setIsEditing] = useState(false);
  const [nameInput, setNameInput] = useState(myUsername);

  // Form submission event
  const handleRenameSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nameInput.trim()) {
      onRename(nameInput.trim());
      setIsEditing(false);
    }
  };

  const getStatusDot = () => {
    switch (status) {
      case "OPEN":
        return "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] animate-pulse";
      case "CONNECTING":
        return "bg-amber-500 animate-ping";
      case "CLOSING":
      case "CLOSED":
      default:
        return "bg-rose-500";
    }
  };
    
 return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 border bg-slate-900/80 border-slate-800 rounded-2xl backdrop-blur-sm">
      {/* Left: Status & Active Users count */}
      <div className="flex items-center gap-2.5">
        <div className="flex items-center gap-2 px-3 py-1 text-xs font-medium border rounded-full bg-slate-800/80 border-slate-700/60 text-slate-300">
          <span className={`w-2 h-2 rounded-full ${getStatusDot()}`} />
          <span className="font-semibold text-slate-200">{status}</span>
        </div>
        {status === "OPEN" && (
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
            <Users className="w-3.5 h-3.5" />
            <span>
              {onlineCount} {onlineCount === 1 ? "user" : "users"} online
            </span>
          </div>
        )}
      </div>
      {/* Right: Username Pill OR Inline Edit Input */}
      <div className="flex items-center gap-2">
        {status === "CLOSED" ? (
          <button
            onClick={onReconnect}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold rounded-lg shadow-sm transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reconnect</span>
          </button>
        ) : isEditing ? (
          <form onSubmit={handleRenameSubmit} className="flex items-center gap-1">
            <input
              type="text"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              placeholder="Your name..."
              className="bg-slate-950 border border-indigo-500 rounded-lg px-2.5 py-1 text-xs text-white outline-none w-28 font-medium"
              autoFocus
            />
            <button
              type="submit"
              className="p-1 text-white transition bg-indigo-600 rounded-lg hover:bg-indigo-500"
              title="Save name"
            >
              <Check className="w-3.5 h-3.5" />
            </button>
          </form>
        ) : (
          <button
            onClick={() => {
              setNameInput(myUsername);
              setIsEditing(true);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-medium transition cursor-pointer group"
                             title="Click to change your username"
                                   >
            <User className="w-3.5 h-3.5 text-indigo-400" />
            <span>{myUsername}</span>
            <Edit2 className="w-3 h-3 text-indigo-400 transition-opacity opacity-60 group-hover:opacity-100" />
          </button>
        )}
      </div>
    </div>
  );
};
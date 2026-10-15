import { useState } from "react";
import { ChevronDown, ChevronUp, BookOpen, Layers, Cpu, Network } from "lucide-react";
import { type ConnectionStatus } from "../types";

interface ProtocolInspectorProps {
  status: ConnectionStatus;
}

export const ProtocolInspector = ({ status }: ProtocolInspectorProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const states = [
    { code: 0, name: "CONNECTING", desc: "HTTP 101 Handshake in flight" },
    { code: 1, name: "OPEN", desc: "Full-duplex TCP framing ready" },
    { code: 2, name: "CLOSING", desc: "Close handshake frame sent" },
    { code: 3, name: "CLOSED", desc: "Underlying TCP socket terminated" },
  ];

  return (
    <div className="overflow-hidden border bg-slate-900/40 border-slate-800 rounded-2xl backdrop-blur-sm">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full px-4 py-3 text-left transition-colors bg-slate-950/40 hover:bg-slate-900/60"
      >
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-semibold text-slate-300">
            First Principles: How WebSockets Work Under the Hood
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs text-slate-400">
          <span>{isExpanded ? "Hide Explainer" : "Learn Concepts"}</span>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {isExpanded && (
        <div className="p-4 space-y-4 text-xs border-t text-slate-300 border-slate-800/80">
          {/* 1. WebSocket States */}
          <div>
            <div className="flex items-center gap-1.5 font-semibold text-slate-200 mb-2">
              <Network className="w-3.5 h-3.5 text-indigo-400" />
              <span>1. The 4 Native WebSocket States (`readyState`)</span>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {states.map((s) => {
                const isCurrent = status === s.name;
                return (
                  <div
                    key={s.code}
                    className={`p-2.5 rounded-xl border transition-all ${
                      isCurrent
                        ? "bg-indigo-500/15 border-indigo-500/50 text-indigo-200 shadow-sm"
                        : "bg-slate-950/40 border-slate-800 text-slate-400"
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono font-bold">
                      <span>{s.code}: {s.name}</span>
                      {isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />}
                    </div>
                    <div className="text-[11px] mt-1 text-slate-400 leading-tight">{s.desc}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. HTTP vs WebSocket */}
          <div className="grid gap-3 pt-2 sm:grid-cols-2">
            <div className="p-3 border rounded-xl bg-slate-950/40 border-slate-800">
              <div className="flex items-center gap-1.5 font-semibold text-slate-200 mb-1">
                <Layers className="w-3.5 h-3.5 text-amber-400" />
                <span>The Initial Handshake</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                WebSockets start as an HTTP request with <code className="text-amber-300 bg-amber-950/40 px-1 py-0.5 rounded">Upgrade: websocket</code>. The Elysia backend responds with <code className="text-emerald-300 bg-emerald-950/40 px-1 py-0.5 rounded">101 Switching Protocols</code>, discarding HTTP and keeping the raw TCP socket open.
              </p>
            </div>

            <div className="p-3 border rounded-xl bg-slate-950/40 border-slate-800">
              <div className="flex items-center gap-1.5 font-semibold text-slate-200 mb-1">
                <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero-Overhead Framing</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Unlike HTTP which sends 500-1000 bytes of headers per request, a WebSocket text frame adds only <strong>2 to 6 bytes</strong> of framing overhead. Messages flow bi-directionally with minimal latency.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

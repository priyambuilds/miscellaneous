import { Radio, Zap } from "lucide-react";

export const Header = () => {
  return (
    <header className="flex flex-col items-center space-y-2 text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-indigo-400 border rounded-full bg-indigo-500/10 border-indigo-500/20">
        <Zap className="w-3.5 h-3.5" />
        <span>ElysiaJS Pub/Sub Engine</span>
        <span className="w-1 h-1 bg-indigo-400 rounded-full" />
        <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
        <span className="text-emerald-400">Live Broadcasting</span>
      </div>
      <h1 className="flex items-center justify-center gap-2 text-3xl font-extrabold tracking-tight text-white">
        <span>💬</span>
        <span>Real-Time WebSocket Chat</span>
      </h1>
      <p className="max-w-md text-xs text-slate-400 sm:text-sm">
        Full-duplex group broadcasting powered by Bun &amp; Elysia Topics on the
        backend, React 19 on the frontend.
      </p>
    </header>
  );
};

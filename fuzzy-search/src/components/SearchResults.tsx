import React from "react";
import type { User } from "../app/page";

type Props = {
  query: string;
  results: User[];
  loading: boolean;
  error?: string;
  onSelect?: (u: User) => void;
};

export default function SearchResults({
  query,
  results,
  loading,
  error,
  onSelect,
}: Props) {
  const q = query.trim();
  if (!q) return null;

  return (
    <div className="mt-3 rounded-md border border-zinc-200 bg-white shadow-sm">
      {loading && (
        <div className="px-3 py-2 text-sm text-zinc-600">Searching…</div>
      )}
      {!loading && error && (
        <div className="px-3 py-2 text-sm text-red-600">Error: {error}</div>
      )}
      {!loading && !error && results.length === 0 && (
        <div className="px-3 py-2 text-sm text-zinc-600">
          No matches for “{q}”
        </div>
      )}
      {!loading && !error && results.length > 0 && (
        <ul
          role="listbox"
          aria-label="Search results"
          className="max-h-72 overflow-auto"
        >
          {results.map((u) => (
            <li
              key={u.id}
              role="option"
              aria-selected="false"
              tabIndex={0}
              className="cursor-pointer px-3 py-2 text-sm text-zinc-900 hover:bg-zinc-100 focus:bg-zinc-100"
              onClick={() => onSelect?.(u)}
              onKeyDown={(e) => {
                if (e.key === "Enter") onSelect?.(u);
              }}
            >
              <div className="font-medium">{u.name}</div>
              <div className="text-zinc-600">
                {u.username} • {u.email}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

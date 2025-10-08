import React from "react";

type Props = {
  query: string;
  onQueryChange: (q: string) => void;
};

export default function SearchBar({ query, onQueryChange }: Props) {
  return (
    <div className="flex items-center gap-3 rounded-md border border-zinc-300 bg-zinc-100 px-3 py-2">
      <label htmlFor="user-search" className="sr-only">
        Search users
      </label>
      <input
        id="user-search"
        type="text"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="Search by name, username, or email"
        className="w-full bg-transparent outline-none placeholder:text-zinc-500"
        autoComplete="off"
        spellCheck={false}
      />
      <span aria-hidden className="text-zinc-600">⌘K</span>
    </div>
  );
}

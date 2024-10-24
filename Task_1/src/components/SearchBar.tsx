import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  city: string;
  setCity: (city: string) => void;
  onSearch: (e: React.FormEvent) => void;
  loading: boolean;
}

export function SearchBar({ city, setCity, onSearch, loading }: SearchBarProps) {
  return (
    <form onSubmit={onSearch} className="relative">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="w-full px-4 py-3 rounded-lg bg-white/50 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-600 hover:text-blue-500"
        disabled={loading}
      >
        <Search className="w-5 h-5" />
      </button>
    </form>
  );
}
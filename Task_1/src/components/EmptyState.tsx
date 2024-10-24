import { Search, MapPin, Cloud } from 'lucide-react';

export function EmptyState({ onCitySelect }: { onCitySelect: (city: string) => void }) {

  const handleCitySelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    onCitySelect(e.currentTarget.innerText);
  };

  return (
    <div className="text-center space-y-4 py-8 px-4">
      <div className="relative w-24 h-24 mx-auto">
        <Cloud className="w-24 h-24 text-gray-200 absolute" />
        <MapPin className="w-12 h-12 text-gray-300 absolute bottom-0 right-0" />
        <Search className="w-8 h-8 text-blue-500 absolute top-4 left-4 transform -rotate-12" />
      </div>

      <h3 className="text-xl font-semibold text-gray-700">
        Discover the Weather
      </h3>

      <p className="text-gray-500 max-w-xs mx-auto">
        Enter a city name above to get detailed weather information instantly
      </p>

      <div className="flex justify-center gap-2 text-sm text-gray-400">
        <span>Try:</span>
        <div className="space-x-2 font-medium">
          <button onClick={handleCitySelect} className="hover:text-blue-500 transition-colors">Lahore</button>
          <span>•</span>
          <button onClick={handleCitySelect} className="hover:text-blue-500 transition-colors">Tokyo</button>
          <span>•</span>
          <button onClick={handleCitySelect} className="hover:text-blue-500 transition-colors">Paris</button>
        </div>
      </div>
    </div>
  );
}

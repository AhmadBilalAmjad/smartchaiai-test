import { useState } from 'react';
import MeteoAPIDisplay from './components/MeteoAPIDisplay';
import DjangoAPIDisplay from './components/DjangoAPIDisplay';

const App = () => {
  const [view, setView] = useState<'meteo' | 'django'>('meteo');
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-lg w-full max-w-lg rounded-2xl shadow-xl p-6 space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center">Weather App - {view === 'meteo' ? 'Open Meteo' : 'Django'}</h1>
        <div className="flex justify-center items-center space-x-4">
          <div className="flex border-b border-gray-200">
            <button
              className={`flex-1 min-w-[120px] py-2 px-4 text-center ${view === 'meteo'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
                }`}
              onClick={() => setView('meteo')}
            >
              Meteo API
            </button>
            <button
              className={`flex-1 min-w-[120px] py-2 px-4 text-center ${view === 'django'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
                }`}
              onClick={() => setView('django')}
            >
              Django API
            </button>
          </div>
        </div>
        {view === 'meteo' && <MeteoAPIDisplay />}
        {view === 'django' && <DjangoAPIDisplay />}
      </div>
    </div>
  );
}

export default App;

import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning } from "lucide-react";
import { getWeatherType } from "../../utils/weatherCodes";

const WeatherIcon = ({ code }: { code: number }) => {
  if (!code) return null;
  const condition = getWeatherType(code);

  switch (condition) {
    case 'clear':
      return <Sun className="w-16 h-16 text-yellow-400" />;
    case 'clouds':
      return <Cloud className="w-16 h-16 text-gray-400" />;
    case 'rain':
      return <CloudRain className="w-16 h-16 text-blue-400" />;
    case 'snow':
      return <CloudSnow className="w-16 h-16 text-blue-200" />;
    case 'thunderstorm':
      return <CloudLightning className="w-16 h-16 text-yellow-600" />;
    default:
      return <Cloud className="w-16 h-16 text-gray-400" />;
  }
};

export default WeatherIcon
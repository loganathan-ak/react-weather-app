import icon01d from './01d.png';
import icon02d from './02d.png';
import icon03d from './03d.png';
import icon04d from './04d.png';
import icon09d from './09d.png';
import icon10d from './10d.png';
import icon11d from './11d.png';
import icon13d from './13d.png';
import icon50d from './50d.png';

const iconMap = {
  // Day icons
  '01d': icon01d,
  '02d': icon02d,
  '03d': icon03d,
  '04d': icon04d,
  '09d': icon09d,
  '10d': icon10d,
  '11d': icon11d,
  '13d': icon13d,
  '50d': icon50d,

  // Night fallbacks (maps night icons to daytime equivalents)
  '01n': icon01d,
  '02n': icon02d,
  '03n': icon03d,
  '04n': icon04d,
  '09n': icon09d,
  '10n': icon10d,
  '11n': icon11d,
  '13n': icon13d,
  '50n': icon50d,
};

export const getWeatherIcon = (code) => {
  return iconMap[code] || `https://openweathermap.org/img/wn/${code}@2x.png`;
};

export default iconMap;
import { MoonIcon } from '../assets/icons/MoonIcon';
import { NightCloudsIcon } from '../assets/icons/NightCloudsIcon';
import { NightRainIcon } from '../assets/icons/NightRainIcon';
import { NightSnowIcon } from '../assets/icons/NightSnowIcon';
import { NightStormIcon } from '../assets/icons/NightStormIcon';
import { NightWindIcon } from '../assets/icons/NightWindIcon';
import { SunIcon } from '../assets/icons/SunIcon';
import { CloudsIcon } from '../assets/icons/CloudsIcon';
import { RainIcon } from '../assets/icons/RainIcon';
import { SnowIcon } from '../assets/icons/SnowIcon';
import { ThunderStormIcon } from '../assets/icons/ThunderStormIcon';
import { WindIcon } from '../assets/icons/WindIcon';

export const iconMapper = (weather, size) => {
  const isNight = weather.icon?.includes('n');
  const condition = weather.main;

  if (isNight) {
    switch (condition) {
      case 'Clear':
        return <MoonIcon width={size} height={size} />;
      case 'Clouds':
        return <NightCloudsIcon width={size} height={size} />;
      case 'Rain':
        return <NightRainIcon width={size} height={size} />;
      case 'Snow':
        return <NightSnowIcon width={size} height={size} />;
      case 'Thunderstorm':
        return <NightStormIcon width={size} height={size} />;
      case 'Drizzle':
        return <NightRainIcon width={size} height={size} />;
      case 'Atmosphere':
      case 'Mist':
      case 'Haze':
      case 'Fog':
      case 'Dust':
        return <NightWindIcon width={size} height={size} />;
      default:
        return <MoonIcon width={size} height={size} />;
    }
  } else {
    switch (condition) {
      case 'Clear':
        return <SunIcon width={size} height={size} />;
      case 'Clouds':
        return <CloudsIcon width={size} height={size} />;
      case 'Rain':
        return <RainIcon width={size} height={size} />;
      case 'Snow':
        return <SnowIcon width={size} height={size} />;
      case 'Thunderstorm':
        return <ThunderStormIcon width={size} height={size} />;
      case 'Drizzle':
        return <RainIcon width={size} height={size} />;
      case 'Atmosphere':
      case 'Mist':
      case 'Haze':
      case 'Fog':
      case 'Dust':
        return <WindIcon width={size} height={size} />;
      default:
        return <SunIcon width={size} height={size} />;
    }
  }
};

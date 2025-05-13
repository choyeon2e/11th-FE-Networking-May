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

export const iconMapper = (weather) => {
  const isNight = weather.icon?.includes('n');
  const condition = weather.main;

  if (isNight) {
    switch (condition) {
      case 'Clear':
        return <MoonIcon width={160} height={160} />;
      case 'Clouds':
        return <NightCloudsIcon width={160} height={160} />;
      case 'Rain':
        return <NightRainIcon width={160} height={160} />;
      case 'Snow':
        return <NightSnowIcon width={160} height={160} />;
      case 'Thunderstorm':
        return <NightStormIcon width={160} height={160} />;
      case 'Drizzle':
        return <NightRainIcon width={160} height={160} />;
      case 'Atmosphere':
      case 'Mist':
      case 'Haze':
      case 'Fog':
      case 'Dust':
        return <NightWindIcon width={160} height={160} />;
      default:
        return <MoonIcon width={160} height={160} />;
    }
  } else {
    switch (condition) {
      case 'Clear':
        return <SunIcon width={160} height={160} />;
      case 'Clouds':
        return <CloudsIcon width={160} height={160} />;
      case 'Rain':
        return <RainIcon width={160} height={160} />;
      case 'Snow':
        return <SnowIcon width={160} height={160} />;
      case 'Thunderstorm':
        return <ThunderStormIcon width={160} height={160} />;
      case 'Drizzle':
        return <RainIcon width={160} height={160} />;
      case 'Atmosphere':
      case 'Mist':
      case 'Haze':
      case 'Fog':
      case 'Dust':
        return <WindIcon width={160} height={160} />;
      default:
        return <SunIcon width={160} height={160} />;
    }
  }
};

export const descMapper = (weather) => {
  switch (weather) {
    case 'Clear':
      return '맑음';
    case 'Clouds':
      return '흐림';
    case 'Rain':
      return '비';
    case 'Snow':
      return '눈';
    case 'Thunderstorm':
      return '뇌우';
    case 'Drizzle':
      return '이슬비';
    case 'Atmosphere':
    case 'Mist':
    case 'Haze':
    case 'Fog':
    case 'Dust':
      return '안개';
    default:
      return '맑음';
  }
};

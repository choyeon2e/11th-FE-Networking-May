function getDustLevel(value, type = 'pm10') {
  if (type === 'pm10') {
    if (value <= 30) return '좋음';
    if (value <= 80) return '보통';
    return '나쁨';
  } else if (type === 'pm2_5') {
    if (value <= 15) return '좋음';
    if (value <= 35) return '보통';
    return '나쁨';
  }
}

export default getDustLevel;

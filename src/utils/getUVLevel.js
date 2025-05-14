function getUVLevel(uvi) {
  if (uvi <= 2) return '좋음';
  if (uvi <= 7) return '보통';
  return '위험';
}

export default getUVLevel;

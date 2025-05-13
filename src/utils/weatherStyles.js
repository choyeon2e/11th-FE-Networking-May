import { palette } from '../styles/palette';

export const weatherStyles = (c) => {
  switch (c) {
    case '좋음':
      return { backgroundColor: palette.skyblue, color: palette.blue };
    case '보통':
      return { backgroundColor: palette.mint, color: palette.green };
    case '나쁨':
      return { backgroundColor: palette.coral, color: palette.red };
  }
};

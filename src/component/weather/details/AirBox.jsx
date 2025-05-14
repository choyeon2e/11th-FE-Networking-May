import styled from 'styled-components';
import { weatherStyles } from '../../../utils/weatherStyles';

function AirBox({ label, value, level, type, isHover, setIsHover }) {
  const styles = weatherStyles(level);

  return (
    <AirBoxStyle
      backgroundColor={styles.backgroundColor}
      onMouseEnter={() => setIsHover(type)}
      onMouseLeave={() => setIsHover(null)}
    >
      {label}
      <Value color={styles.color}>
        {isHover === type ? `${value}` : level}
      </Value>
    </AirBoxStyle>
  );
}

export default AirBox;

const AirBoxStyle = styled.div`
  display: flex;
  width: 120px;
  padding: 12px 24px;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border-radius: 12px;
  background-color: ${({ backgroundColor }) => backgroundColor};
`;

const Value = styled.div`
  color: ${({ color }) => color};
`;

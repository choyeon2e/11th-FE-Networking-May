import { useState } from 'react';
import styled from 'styled-components';
import { palette } from '../../styles/palette';

function WeekWeather({ weatherData }) {
  return (
    <Wrapper>
      <LocText>주간 예보</LocText>
    </Wrapper>
  );
}

export default WeekWeather;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  padding: 24px;
  flex-direction: column;
  width: 1080px;
  border-radius: 16px;
  gap: 12px;
  border: 2px solid ${palette.gray10};
  box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.1);
`;

const LocText = styled.div`
  color: ${palette.gray100};
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 24px;
`;

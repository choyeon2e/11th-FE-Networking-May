import styled from 'styled-components';
import AirBox from './AirBox';
import { palette } from '../../../styles/palette';

function AirDetail({
  fine,
  fineLevel,
  ultraFine,
  ultraFineLevel,
  uvInfo,
  uvLevel,
  sunrise,
  isHover,
  setIsHover,
}) {
  return (
    <DetailWrap>
      <AirBox
        label='미세먼지'
        value={fine}
        level={fineLevel}
        type='fine'
        isHover={isHover}
        setIsHover={setIsHover}
      />
      <AirBox
        label='초미세먼지'
        value={ultraFine}
        level={ultraFineLevel}
        type='ultraFine'
        isHover={isHover}
        setIsHover={setIsHover}
      />
      <AirBox
        label='자외선'
        value={uvInfo}
        level={uvLevel}
        type='uv'
        isHover={isHover}
        setIsHover={setIsHover}
      />
      <DetailBox>
        일출
        <ForColor>{sunrise}</ForColor>
      </DetailBox>
    </DetailWrap>
  );
}

export default AirDetail;

const DetailWrap = styled.div`
  display: flex;
  padding: 12px 0px;
  justify-content: center;
  gap: 16px;
  font-size: 12px;
  font-weight: 500;
`;

const DetailBox = styled.div`
  display: flex;
  width: 120px;
  padding: 12px 24px;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border-radius: 12px;
  background-color: ${palette.lime};
`;

const ForColor = styled.div`
  color: ${palette.yellow};
  font-weight: 700;
`;

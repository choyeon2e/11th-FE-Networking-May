import styled from 'styled-components';
import { CloudsIcon } from './../../assets/icons/CloudsIcon';
import { MultiplyIcon } from './../../assets/icon/MultiplyIcon';

function LocationModal({ onClose }) {
  const handleClose = () => {
    onClose();
  };

  return (
    <Backdrop onClick={onClose}>
      <Container onClick={(e) => e.stopPropagation()}>
        <IconStyled onClick={handleClose}>
          <MultiplyIcon />
        </IconStyled>
        <Title>
          <CloudsIcon /> 날씨 위치 추가
        </Title>
      </Container>
    </Backdrop>
  );
}

export default LocationModal;

const Backdrop = styled.div`
  top: 0;
  left: 0;
  z-index: 999;
  width: 100vw;
  height: 100vh;
  background-color: rgba(41, 46, 46, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
`;

const Container = styled.div`
  width: 624px;
  height: 641px;
  padding: 36px 72px;
  border-radius: 16px;
  background-color: white;
  box-shadow: 4px 4px 4px 3px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
`;

const Title = styled.div`
  display: flex;
  font-size: 32px;
  font-weight: 700;
  align-items: center;
  gap: 16px;
`;

const IconStyled = styled.div`
  position: absolute;
  cursor: pointer;
  right: 16px;
  top: 16.5px;
`;

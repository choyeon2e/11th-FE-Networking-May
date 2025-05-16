import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { NightStormIcon } from './../../assets/icons/NightStormIcon';
import { palette } from './../../styles/palette';

function DeleteModal({ onClose, onDelete }) {
  return ReactDOM.createPortal(
    <Backdrop onClick={onClose}>
      <Container onClick={(e) => e.stopPropagation()}>
        <Title>정말로 삭제하시겠습니까?</Title>
        <NightStormIcon />
        <ButtonWrapper>
          <Cancel onClick={onClose}>취소하기</Cancel>
          <Delete onClick={onDelete}>삭제하기</Delete>
        </ButtonWrapper>
      </Container>
    </Backdrop>,
    document.getElementById('modal-root')
    //ReCharts 사용으로 인해 모달창에 그래프 겹쳐보이지 않게하기위함~!
  );
}

export default DeleteModal;

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
  width: 545px;
  height: 354px;
  display: flex;
  padding: 36px 108px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  border-radius: 16px;
  background: ${palette.gray0};
  box-shadow: 4px 4px 4px 3px rgba(0, 0, 0, 0.25);
`;

const Title = styled.div`
  display: flex;
  font-size: 32px;
  font-weight: 700;
  align-items: center;
  gap: 16px;
  color: ${palette.gray60};
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
`;

const Cancel = styled.button`
  all: unset;
  cursor: pointer;
  width: 118px;
  height: 36px;
  font-size: 20px;
  font-weight: 500;
  border: 1px solid ${palette.gray60};
  border-radius: 6px;
  text-align: center;
`;

const Delete = styled.button`
  all: unset;
  cursor: pointer;
  color: ${palette.gray0};
  background: ${palette.gray60};
  width: 118px;
  height: 36px;
  font-size: 20px;
  font-weight: 500;
  border-radius: 6px;
  border: 1px solid ${palette.gray60};
  text-align: center;
`;

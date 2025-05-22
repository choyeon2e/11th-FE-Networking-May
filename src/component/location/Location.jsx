import { styled, css } from 'styled-components';
import { MapPinIcon } from './../../assets/icon/MapPinIcon';
import { PlusIcon } from './../../assets/icon/PlusIcon';
import { palette } from '../../styles/palette';
import { useState } from 'react';
import LocationModal from './LocationModal';
import LocationDiv from './LocationDiv';
import { AnimatePresence } from 'framer-motion';

function Location({ checkedLocationId, setCheckedLocationId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Wrapper>
      <ListWrapper>
        <MapPinIcon />
        위치 목록
      </ListWrapper>
      <Space />
      <PlusWrapper iscursor onClick={() => setIsModalOpen(true)}>
        <PlusIcon />
        추가하기
      </PlusWrapper>
      <Space />
      <LocationDiv
        checkedLocationId={checkedLocationId}
        setCheckedLocationId={setCheckedLocationId}
      ></LocationDiv>
      <AnimatePresence>
        {isModalOpen && <LocationModal onClose={() => setIsModalOpen(false)} />}
      </AnimatePresence>
    </Wrapper>
  );
}

export default Location;

const activeStyle = css`
  background-color: ${palette.gray10};
  border-radius: 15px;
  box-shadow: 2px 4px 4px 0px #0000001a;
  width: 200px;
`;

const Wrapper = styled.div`
  width: 248px;
  padding: 48px 16px 48px 16px;
  text-align: center;
  border-top-right-radius: 48px;
  border-bottom-right-radius: 48px;
  box-shadow: 2px 0px 4px 0px #0000001a;
  position: fixed;
  left: 0;
`;

const ListWrapper = styled.div`
  align-items: center;
  display: flex;
  font-size: 20px;
  font-weight: 700;
  gap: 16px;
`;

const PlusWrapper = styled.div`
  align-items: center;
  display: flex;
  font-size: 20px;
  font-weight: 700;
  gap: 16px;
  padding: 4px 0px;
  cursor: ${({ iscursor }) => (iscursor ? 'pointer' : 'default')};
  &:hover {
    ${activeStyle}
  }
`;
const Space = styled.div`
  height: 40px;
`;

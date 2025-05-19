import styled from 'styled-components';
import { MapPinIcon } from './../../assets/icon/MapPinIcon';
import { PlusIcon } from './../../assets/icon/PlusIcon';
import { useState } from 'react';
import LocationModal from './LocationModal';
import LocationDiv from './LocationDiv';
import { AnimatePresence } from 'framer-motion';

function Location({
  locations,
  setLocations,
  checkedLocationId,
  setCheckedLocationId,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Wrapper>
      <Flex>
        <MapPinIcon />
        위치 목록
      </Flex>
      <Space />
      <Flex iscursor onClick={() => setIsModalOpen(true)}>
        <PlusIcon />
        추가하기
      </Flex>
      <Space />
      <LocationDiv
        checkedLocationId={checkedLocationId}
        setCheckedLocationId={setCheckedLocationId}
        locations={locations}
        setLocations={setLocations}
      ></LocationDiv>
      <AnimatePresence>
        {isModalOpen && (
          <LocationModal
            locations={locations}
            setLocations={setLocations}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </Wrapper>
  );
}

export default Location;

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

const Flex = styled.div`
  align-items: center;
  display: flex;
  font-size: 20px;
  font-weight: 700;
  gap: 16px;
  cursor: ${({ iscursor }) => (iscursor ? 'pointer' : 'default')};
`;

const Space = styled.div`
  height: 40px;
`;

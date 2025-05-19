import styled, { css } from 'styled-components';
import { useState } from 'react';
import DeleteModal from './DeleteModal';
import { PinClayIcon } from '../../assets/icon/PinClayIcon';
import { PinColorIcon } from '../../assets/icon/PinColorIcon';
import { TrashCanIcon } from '../../assets/icon/TrashCanIcon';
import { palette } from '../../styles/palette';
import { AnimatePresence } from 'framer-motion';

function LocationDiv({
  locations,
  setLocations,
  checkedLocationId,
  setCheckedLocationId,
}) {
  const [pinnedMap, setPinnedMap] = useState({});
  const [deleteLocationId, setDeleteLocationId] = useState(null);
  const handleOnPinned = (id) => {
    setPinnedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const handleOnCheck = (id) => {
    if (checkedLocationId === id) {
      setCheckedLocationId(null);
    } else {
      setCheckedLocationId(id);
    }
  };
  const deleteLocation = (id) => {
    setLocations((prev) => prev.filter((data) => data.id !== id));
  };
  const handleOnDelete = (id) => {
    setDeleteLocationId(id);
  };
  const handleModalClose = () => {
    setDeleteLocationId(null);
  };
  const sortedLocations = [...locations].sort((x, y) => {
    const firstPinned = pinnedMap[x.id] || false;
    const secondPinned = pinnedMap[y.id] || false;

    if (firstPinned === secondPinned) return 0;
    return firstPinned ? -1 : 1;
  });
  return (
    <div>
      <Container>
        {sortedLocations.map((location) => {
          const isPinned = !!pinnedMap[location.id];
          const isChecked = checkedLocationId === location.id;
          return (
            <Wrapper
              onClick={() => handleOnCheck(location.id)}
              key={location.id}
              checked={isChecked}
            >
              <PinWrapper
                onClick={(e) => {
                  e.stopPropagation();
                  handleOnPinned(location.id);
                }}
              >
                {isPinned ? <PinColorIcon /> : <PinClayIcon />}
              </PinWrapper>
              <LocationDivName>{location.place_name}</LocationDivName>

              <TrashCanIcon
                onClick={(e) => {
                  e.stopPropagation();
                  handleOnDelete(location.id);
                }}
              />
            </Wrapper>
          );
        })}
      </Container>

      <AnimatePresence>
        {deleteLocationId && (
          <DeleteModal
            onClose={handleModalClose}
            onDelete={() => {
              deleteLocation(deleteLocationId);
              setCheckedLocationId(null);
              handleModalClose();
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default LocationDiv;

const Container = styled.div`
  display: flex;
  height: 700px;
  flex-direction: column;
  padding: 3px;
  gap: 8px;
  align-items: center;
  overflow-y: auto;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const activeStyle = css`
  background-color: ${palette.gray10};
  border-radius: 15px;
  box-shadow: 2px 4px 4px 0px #0000001a;
`;
const Wrapper = styled.div`
  display: flex;
  width: 200px;
  padding: 8px;
  align-items: center;
  flex-direction: row;
  margin-right: auto;
  gap: 12px;
  cursor: pointer;

  background-color: white;
  border-radius: 4px;
  box-shadow: none;

  .trash-icon {
    display: none;
    cursor: pointer;
  }

  &:hover {
    ${activeStyle}
    .trash-icon {
      display: block;
    }
  }

  ${({ checked }) => checked && activeStyle}
`;
const LocationDivName = styled.div`
  display: flex;
  width: 148px;
  align-items: center;
  color: ${palette.gray60};
  font-size: 16px;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PinWrapper = styled.div``;

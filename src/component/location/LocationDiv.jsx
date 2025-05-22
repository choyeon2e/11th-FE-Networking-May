import styled, { css } from 'styled-components';
import { useMemo, useState } from 'react';
import DeleteModal from './DeleteModal';
import {
  useDeletePlace,
  usePlaceList,
  useTogglePinPlace,
} from '../../hooks/useLocation';
import { PinClayIcon } from '../../assets/icon/PinClayIcon';
import { PinColorIcon } from '../../assets/icon/PinColorIcon';
import { TrashCanIcon } from '../../assets/icon/TrashCanIcon';
import { palette } from '../../styles/palette';
import { AnimatePresence } from 'framer-motion';

function LocationDiv({ checkedLocationId, setCheckedLocationId }) {
  const [deleteLocationId, setDeleteLocationId] = useState(null);
  const { data: locations = [] } = usePlaceList();
  const deletePlace = useDeletePlace();
  const togglePinPlace = useTogglePinPlace();

  const handleOnPinned = (location) => {
    const { placeId, isPinned } = location;
    togglePinPlace.mutate({ placeId, isPinned });
  };

  const handleOnCheck = (id) => {
    if (checkedLocationId === id) {
      setCheckedLocationId(null);
    } else {
      setCheckedLocationId(id);
    }
  };

  const deleteLocation = (id) => {
    setCheckedLocationId(null);
    deletePlace.mutate(id);
    handleModalClose();
  };

  const handleOnDelete = (id) => {
    setDeleteLocationId(id);
  };

  const handleModalClose = () => {
    setDeleteLocationId(null);
  };
  const sortedLocations = useMemo(() => {
    return [...locations].sort((a, b) => {
      if (a.isPinned === b.isPinned) return 0;
      return a.isPinned ? -1 : 1;
    });
  }, [locations]);
  return (
    <div>
      <Container>
        {sortedLocations.map((location) => {
          const isChecked = checkedLocationId === location.placeId;
          return (
            <Wrapper
              key={location.placeId}
              onClick={() => handleOnCheck(location.placeId)}
              checked={isChecked}
            >
              <PinWrapper
                onClick={(e) => {
                  e.stopPropagation();
                  handleOnPinned(location);
                }}
              >
                {location.isPinned ? <PinColorIcon /> : <PinClayIcon />}
              </PinWrapper>
              <LocationDivName>{location.placeName}</LocationDivName>

              <TrashCanIcon
                onClick={(e) => {
                  e.stopPropagation();
                  handleOnDelete(location.placeId);
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
              setCheckedLocationId(null);
              deleteLocation(deleteLocationId);
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

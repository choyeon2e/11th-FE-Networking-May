import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { palette } from '../../styles/palette';
import { TickIcon } from './../../assets/icon/TickIcon';

function LocationList({ places, onClose, locations, setLocations }) {
  const [checkedPlaceId, setCheckedPlaceId] = useState(null);
  const handleOnCheck = useCallback((id) => {
    setCheckedPlaceId((prevId) => (prevId === id ? null : id));
  }, []);
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);
  const addLocation = (data) => {
    setLocations((prev) => [...prev, data]);
  };
  const handleOnSubmit = async () => {
    if (checkedPlaceId === null) {
      alert('장소를 선택해 주세요.');
      return;
    }
    const selectedPlace = places.find((place) => {
      return place.id === checkedPlaceId;
    });
    if (!selectedPlace) return;

    const isAlreadyAdded = locations.some(
      (location) => location.id === selectedPlace.id
    );
    if (isAlreadyAdded) {
      alert('이미 추가된 장소입니다');
      return;
    }
    try {
      const response = await fetch('', {
        // URL 필요
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          place_name: selectedPlace.place_name,
          place_longitude: selectedPlace.x, // 경도
          place_latitude: selectedPlace.y, // 위도
        }),
      });
    } catch (err) {
      console.log('전송 실패', err);
    }
    addLocation(selectedPlace);

    handleClose();
  };

  return (
    <Container>
      <ListWrapper>
        {places.map((place) => (
          <PlaceList
            onClick={() => handleOnCheck(place.id)}
            key={place.id}
            checked={checkedPlaceId === place.id}
          >
            <PlaceName>{place.place_name}</PlaceName>
            <AddressName>{place.address_name}</AddressName>
            {checkedPlaceId === place.id && <TickIcon />}
          </PlaceList>
        ))}
      </ListWrapper>
      <SubmitWrapper>
        <LocationSubmit onClick={handleOnSubmit}>확인</LocationSubmit>
      </SubmitWrapper>
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 48px;
`;
const ListWrapper = styled.div`
  display: flex;
  height: 240px;
  padding: 8px 16px;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  gap: 16px;
  align-self: stretch;
  border-radius: 8px;
  border: 1px solid ${palette.gray40};
  overflow: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const PlaceList = styled.ul`
  cursor: pointer;
  position: relative;
  width: 100%;
  padding: 8px 16px;
  list-style-type: none;

  border-bottom: 1px solid ${palette.gray40};
`;
const PlaceName = styled.li`
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  padding-bottom: 6px;
`;
const AddressName = styled.li`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: ${palette.gray40};
`;

const SubmitWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  align-self: stretch;
`;
const LocationSubmit = styled.button`
  width: 95px;
  height: 36px;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  display: flex;
  border-radius: 6px;
  color: ${palette.gray0};
  background: ${palette.gray60};
  padding: 6px 30px;
`;

export default LocationList;

import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { palette } from '../../styles/palette';
import { TickIcon } from './../../assets/icon/TickIcon';
import { createPlace } from '../../apis/fetchLocation';

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
      alert('이미 추가된 장소입니다.');
      return;
    }
    try {
      const placeData = {
        placeName: selectedPlace.place_name,
        addressName: selectedPlace.address_name || '',
        roadAddressName: selectedPlace.road_address_name || '',
        longitude: selectedPlace.x,
        latitude: selectedPlace.y,
      };
      const newPlace = await createPlace(placeData);
      addLocation(newPlace);
      handleClose();
    } catch (err) {
      alert('장소 추가 중 오류가 발생했습니다');
      console.error(err);
    }
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
  padding: 0px 16px;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
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
  width: 448px;
  height: 53px;
  padding: 0px 12px;
  list-style-type: none;
  border-bottom: 1px solid ${palette.gray40};
  li:not(:first-child) {
    padding-top: 4px;
  }
`;
const PlaceName = styled.li`
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;
const AddressName = styled.li`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  color: ${palette.gray40};
  padding-bottom: 4px;
`;

const SubmitWrapper = styled.div`
  display: flex;
  height: 36px;
  justify-content: flex-end;
  align-items: flex-end;
  align-self: stretch;
`;
const LocationSubmit = styled.button`
  width: 95px;
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

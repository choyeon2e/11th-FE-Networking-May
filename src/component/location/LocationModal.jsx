import styled from 'styled-components';
import { CloudsIcon } from './../../assets/icons/CloudsIcon';
import { MultiplyIcon } from './../../assets/icon/MultiplyIcon';
import { useEffect, useState } from 'react';
import LocationList from './LocationList';
import useDebounce from '../../hooks/useDebounce';
import { ZoomIcon } from '../../assets/icon/ZoomIcon';

const { kakao } = window;
function LocationModal({ onClose, locations, setLocations }) {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]); // 검색 결과 리스트를 위한 state
  const [isSearched, setIsSearched] = useState(false);

  const handleClose = () => {
    onClose();
  };
  const debouncedSearch = useDebounce(search, 500);
  useEffect(() => {
    if (debouncedSearch) {
      searchPlace(debouncedSearch);
    }
  }, [debouncedSearch]);
  const handleOnInput = (e) => {
    setSearch(e.target.value);
    setIsSearched(false); // 입력값 바뀌면 다시 리스트 숨김
  };

  const searchPlace = (search) => {
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(search, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setSearchResults(data);
      } else {
        setSearchResults([]);
      }
    });
  };

  const handleOnSearch = () => {
    setIsSearched(true);
  };

  const handleOnEnter = (e) => {
    if (e.key === 'Enter') {
      handleOnSearch();
    }
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
        <LocationTitle>
          <LocationName>장소 이름</LocationName>
          <InputWrapper>
            <SearchInput
              placeholder='장소를 입력해 주세요.'
              onChange={handleOnInput}
              onKeyDown={handleOnEnter}
              value={search}
            ></SearchInput>
            <ZoomIcon onClick={handleOnSearch} />
          </InputWrapper>
        </LocationTitle>
        {isSearched && (
          <LocationList
            locations={locations}
            setLocations={setLocations}
            places={searchResults}
            onClose={handleClose}
          />
        )}
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
  gap: 48px;
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

const LocationTitle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const LocationName = styled.div`
  font-size: 24px;
  font-weight: 600;
  text-align: left;
  margin-bottom: 5px;
`;
const InputWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  border: none;
  border-bottom: 1px solid black;
`;
const SearchInput = styled.input`
  width: 100%;
  height: 32px;
  border: none;
  margin-right: 5px;
  outline: none;
`;

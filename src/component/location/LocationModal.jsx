import styled from 'styled-components';
import { CloudsIcon } from './../../assets/icons/CloudsIcon';
import { MultiplyIcon } from './../../assets/icon/MultiplyIcon';
import { useEffect, useState } from 'react';
import LocationList from './LocationList';
import { ZoomIcon } from '../../assets/icon/ZoomIcon';
import ReactDOM from 'react-dom';
import { palette } from '../../styles/palette';
import { motion } from 'framer-motion';

const { kakao } = window;
function LocationModal({ onClose }) {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearched, setIsSearched] = useState(false);

  const handleOnInput = (e) => {
    setSearch(e.target.value);
    setIsSearched(false);
  };

  const searchPlace = (search) => {
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(search, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setSearchResults(data);
      } else {
        setSearchResults([]);
      }
      setIsSearched(true);
    });
  };
  const handleOnSearch = () => {
    if (!search.trim()) return;
    searchPlace(search);
  };

  const handleOnEnter = (e) => {
    if (e.key === 'Enter') {
      handleOnSearch();
    }
  };

  return ReactDOM.createPortal(
    <Backdrop
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Container
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        <IconStyled onClick={onClose}>
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
        {isSearched &&
          (searchResults.length > 0 ? (
            <LocationList places={searchResults} onClose={onClose} />
          ) : (
            <SearchStatus>검색 결과가 없습니다 😢</SearchStatus>
          ))}
      </Container>
    </Backdrop>,
    document.getElementById('modal-root')
    //ReCharts 사용으로 인해 모달창에 그래프 겹쳐보이지 않게하기위함~!
  );
}

export default LocationModal;

const Backdrop = styled(motion.div)`
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

const Container = styled(motion.div)`
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
const SearchStatus = styled.div`
  color: ${palette.red};
  font-weight: 600;
  margin-top: 100px;
  text-align: center;
  font-size: 20px;
  margin-left: 150px;
`;

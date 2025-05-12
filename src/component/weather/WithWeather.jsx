import styled from 'styled-components';

function WithWeather() {
  return (
    <Wrapper>
      <Now></Now>
    </Wrapper>
  );
}

export default WithWeather;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Now = styled.div`
  display: flex;
  width: 1080px;
  padding: 32px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  border-radius: 16px;
  border: 2px solid var(--color-gray-10, #f2f2f2);
  background: var(--color-gray-0, #fff);
  box-shadow: 0px 0px 8px 2px rgba(0, 0, 0, 0.1);
`;

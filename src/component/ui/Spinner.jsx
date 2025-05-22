import styled, { keyframes } from 'styled-components';
import { palette } from '../../styles/palette';

const Spinner = () => {
  return <SpinnerIcon />;
};

export default Spinner;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerIcon = styled.div`
  width: 24px;
  height: 24px;
  border: 3px solid #ccc;
  border-top: 3px solid ${palette.blue};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

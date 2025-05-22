import styled, { css } from 'styled-components';

const CenteredBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ fixed, marginLeft }) =>
    fixed &&
    css`
      position: fixed;
      top: 50%;
      left: ${marginLeft ? `calc(50% + ${parseInt(marginLeft)}px / 2)` : '50%'};
      transform: translate(-50%, -50%);
      width: 100vw;
      height: 100vh;
      z-index: 999;
    `}

  ${({ width }) =>
    width &&
    css`
      width: ${width};
    `}
  
  ${({ height }) =>
    height &&
    css`
      height: ${height};
    `}
`;

export default CenteredBox;

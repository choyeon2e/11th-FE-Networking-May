import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    @font-face {
    font-family: 'Pretendard-Regular';
    src: url('https://fastly.jsdelivr.net/gh/Project-Noonnu/noonfonts_2107@1.1/Pretendard-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
    }

    body {
    background-color: #fff;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    font-family: 'Pretendard-Regular';
    }

    * {
        box-sizing: border-box;
        color: inherit;
    }
`;

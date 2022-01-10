import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css);

  body {
    width: 100%;
    height: 100vh;
    margin: 0 0 0 0;
    padding: 0 0 0 0;
    font-family: KOTRAHOPE;
    
    background-color: ${({ theme }) => theme.colors.black2};

    @font-face {
      font-family: KOTRAHOPE;
      src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2110@1.0/KOTRAHOPE.woff2') format('woff2');
      font-weight: normal;
      font-style: normal;
    }
  }

  #root {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

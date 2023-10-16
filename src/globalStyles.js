import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  .bold {
    font-weight:bold;
  }

  .noMargin{
    margin: 0;
  }

  .left {
    text-align: left;
  }

/* Custom classes */
.card {
  background-color: rgba(255,233,197,0.7);
  border-color: #3F2121;
}
`;

export default GlobalStyle;
import { createGlobalStyle } from 'styled-components';
import  checkedicon  from "../assets/icons/checked.svg";
import  questionicon  from "../assets/icons/question.svg";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Montserrat:300,600');
  
  *, *::before, *::after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  html {
    font-size: 62.5%; 
  }
  
  body {
    margin: 0;
    padding: 0;
    font-size: 1.6rem;
    font-family: "Montserrat", sans-serif;
  }
  .statusicon{

    margin-left:5px;
  }
  .statusicon.checked{
    background-image:url(${checkedicon});
    background-repeat: no-repeat;
    width:24px;
    height:24px;
  }

  .statusicon.question{
    background-image:url(${questionicon});
    background-repeat: no-repeat;
    width:24px;
    height:24px;
  }
`;

export default GlobalStyle;

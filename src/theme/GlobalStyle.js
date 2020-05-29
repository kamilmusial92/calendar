import { createGlobalStyle } from 'styled-components';
import  checkedicon  from "../assets/icons/checked.svg";
import  questionicon  from "../assets/icons/question.svg";

const GlobalStyle = createGlobalStyle`

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
  
  .fc-day-grid-event .fc-content2 {
  /* force events to be one-line tall */
  white-space: nowrap;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1px 2px 0px 2px;
}

.fc-status.checked{
  background-image:url(${checkedicon});
  background-repeat: no-repeat;
  width:16px;
  height:16px;
  
}

.fc-status.question{
  background-image:url(${questionicon});
  background-repeat: no-repeat;
  width:16px;
  height:16px;
  
}
.fc-day-grid-event .fc-surname {
  font-size: 1rem;

 }



.fc-day-grid-event .fc-time {
  font-size: 0.9rem;
}
.fc-day-grid-event .fc-content {
  /* force events to be one-line tall */
  
  display: flex;
  flex-direction: row;
  padding: 2px 2px 2px 2px;
}
.fc-day-grid-event .fc-avatar {
 width:40px;
 padding-bottom: 3px;
 border-radius: 5px;
}


.fc-day-grid-event .fc-title {
  font-weight:bold;

}

.fc-day-grid-event .fc-status {
  position: absolute;
  right:2px

}
.fc-event {
  position: relative;
  /* for resize handle and other inner positioning */
  display: block;
  /* make the <a> tag block */
  font-size: 0.85em;
  line-height: 1.4;
  border-radius: 3px;
  border: 1px solid #3788d8;
  /*padding: 10px;*/
  border-left: 4px solid;
}

.fc-event,
.fc-event:hover {
  /*color: #fff;*/
  /* default TEXT color */
  text-decoration: none;
  cursor: pointer;

  /* if <a> has an href */
}

.fc-unthemed td.fc-today {
  background: #71ed63
}
.fc-unthemed td.fc-sat {
  background: #e04c4c
}

.fc-unthemed td.fc-sun {
  background: #e04c4c
}

.fc-unthemed th,
.fc-unthemed td,
.fc-unthemed thead,
.fc-unthemed tbody,
.fc-unthemed .fc-divider,
.fc-unthemed .fc-row,
.fc-unthemed .fc-content,
.fc-unthemed .fc-popover,
.fc-unthemed .fc-list-view,
.fc-unthemed .fc-list-heading td {
  border-color: #c6c6c6;
}


.react-datepicker-wrapper {
  display: flex;
  padding: 0;
  border: 0;
  min-width:50px;
}

.react-datepicker__input-container {
  position: relative;
  display: flex;
  min-width:50px;
}
.react-datepicker__input-container,input{
  height: calc(1.5em + 2rem + 2px);
  padding: 0.5rem 1.5rem;
  display: flex;
  min-width:50px;
  line-height: 1.5;
  border-radius: 2rem;
  border: none;
  outline: none;
}
.react-datepicker {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 1.2rem;
  background-color: #fff;
  color: #000;
  border: 1px solid #aeaeae;
  border-radius: 0.3rem;
  display: inline-block;
  position: relative;
}
.react-datepicker__current-month,
.react-datepicker-time__header,
.react-datepicker-year-header {
  margin-top: 0;
  color: #000;
  font-weight: bold;
  font-size: 1.2rem;
}

#external-events input{
  min-width: 14px;
}
`;

export default GlobalStyle;

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
  a:hover{
    text-decoration: none;
    color:black;
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
.fc-button-group
{
  display: block;
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

.checkbox:not(:checked),
.checkbox:checked {
            position: absolute;
            left: -9999px;
        }
        .checkbox:not(:checked) + label,
        .checkbox:checked + label {
            position: relative;
            padding-left: 29px;
            cursor: pointer;
            margin-bottom: 4px;
            display: inline-block;
            font-size: 17px;
        }
        /* checkbox aspect */
        .checkbox:not(:checked) + label:before,
        .checkbox:checked + label:before {
            content: '';
            position: absolute;
            left: 1px; top: 1px;
            width: 22px; height: 22px;
            border: 2px solid #cccccc;
            background: #ffffff;
            border-radius: 5px;
            box-shadow: inset 0 1px 3px rgba(0,0,0,.1);
        }
        /* checked mark aspect */
        .checkbox:not(:checked) + label:after,
        .checkbox:checked + label:after {
            content: '✔';
            position: absolute;
            top: 0px; left: 5px;
            font-size: 20px;
            line-height: 1.2;
            color: #09ad7e;
            transition: all .2s;
        }
        /* checked mark aspect changes */
        .checkbox:not(:checked) + label:after {
            opacity: 0;
            transform: scale(0);
        }
        .checkbox:checked + label:after {
            opacity: 1;
            transform: scale(1);
        }
        /* disabled checkbox */
        .checkbox:disabled:not(:checked) + label:before,
        .checkbox:disabled:checked + label:before {
            box-shadow: none;
            border-color: #999999;
            background-color: #dddddd;
        }
        .checkbox:disabled:checked + label:after {
            color: #999999;
        }
        .checkbox:disabled + label {
            color: #aaaaaa;
        }
        /* accessibility */
        .checkbox:checked:focus + label:before,
        .checkbox:not(:checked):focus + label:before {
            border: 2px dotted #0000ff;
        }
        /* hover style just for information */
        label:hover:before {
            border: 2px solid #4778d9!important;
            background: #ffffff
        }



`;

export default GlobalStyle;

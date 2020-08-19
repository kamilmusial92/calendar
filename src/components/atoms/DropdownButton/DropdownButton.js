import React from 'react'
import styled, { css } from 'styled-components';
import { Dropdown } from 'react-bootstrap';
import moment from 'moment';


const StyledDropDownButton= styled(Dropdown)`
   .btn{
     height:37px;
     font-size: 14px;
     border-radius: 50px;
     width:150px;
     font-weight: 600;
    
     background-color:${({ theme, pagecolor }) => theme[pagecolor].background};
     color:${({ theme, pagecolor }) => theme[pagecolor].text};
     border: none;
    
   }
   .dropdown-menu{
      width:150px;
      background-color:${({ theme, pagecolor }) => theme[pagecolor].backgroundElement};
      
   }
   .dropdown-item{
      font-size:14px;
      color:${({ theme, pagecolor }) => theme[pagecolor].text};
   }
   .dropdown-item.active, .dropdown-item:active{
    background-color:${({ theme, pagecolor }) => theme[pagecolor].background};
   }
   .dropdown-item:hover, .dropdown-item:focus{
    background-color:${({ theme, pagecolor }) => theme[pagecolor].background};
   }
`;

const DropdownButton =({setStartDate,setEndDate,pagecolor}) =>{


    return (

        <StyledDropDownButton pagecolor={pagecolor}>
        <StyledDropDownButton.Toggle variant="secondary" id="dropdown-basic">
        Menu
        </StyledDropDownButton.Toggle>
      
        <StyledDropDownButton.Menu>
          <StyledDropDownButton.Item onClick={()=>{setStartDate(moment(new Date()).startOf('month')); setEndDate(moment(new Date()).endOf('month'))}} as="button" active>Aktualny miesiąc</StyledDropDownButton.Item>
          <StyledDropDownButton.Item onClick={()=>{setStartDate(moment(new Date()).startOf('month').subtract(1,'month')); setEndDate(moment(new Date()).endOf('month').subtract(1,'month'))}} as="button">Poprzedni miesiąc</StyledDropDownButton.Item>
          <StyledDropDownButton.Item onClick={()=>{setStartDate(moment(new Date()).startOf('year')); setEndDate(moment(new Date()).endOf('year'))}} as="button">Aktualny rok</StyledDropDownButton.Item>
          <StyledDropDownButton.Item onClick={()=>{setStartDate(moment(new Date()).startOf('year').subtract(1,'year')); setEndDate(moment(new Date()).endOf('year').subtract(1,'year'))}} as="button">Poprzedni rok</StyledDropDownButton.Item>
        </StyledDropDownButton.Menu>
      </StyledDropDownButton>
    )
}

export default DropdownButton;

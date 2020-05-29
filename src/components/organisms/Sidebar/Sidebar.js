import React, {Component} from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import Switch from 'components/atoms/Input/Switch';

import logoutIcon from 'assets/icons/logout.svg';
import calendarIcon from 'assets/icons/calendar.svg';
import bellIcon from 'assets/icons/bell.svg';
import statisticsIcon from 'assets/icons/statistics.svg';
import sunnyIcon from 'assets/icons/sunny.svg';
import moonIcon from 'assets/icons/moon.svg';
import settingsIcon from 'assets/icons/settings.svg';
import polandIcon from 'assets/icons/poland.svg';
import englandIcon from 'assets/icons/uk.svg';
import logoIcon from 'assets/icons/interactivelogo.svg';


import withContext from 'hoc/withContext';


const StyledWrapper = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  padding: 25px 0;
  width: 100px;
  height: 100vh;
  background-color: ${({ activeColor, theme }) => (activeColor ? theme[activeColor] : theme.note)};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-wrap:nowrap;
  z-index:9998;

    @media (max-width: 768px) {
     padding:10px;
      width: 100vw;
      height:50px;
      flex-direction: row;
      
    }
`;

const StyledLogoLink = styled(NavLink)`
  display: block;
  width: 100px;
  height: 67px;
  background-image: url(${logoIcon});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 80%;
  border: none;
  margin-bottom: 10vh;
  
    @media (max-width: 768px) {
    margin:0;
    
    }
`;

const StyledLogoutButton = styled(ButtonIcon)`
  margin-top: auto;
    
    @media (max-width: 768px) {
      display: flex;
     
   
    }
`;

const StyledLinksList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  @media (max-width: 768px) {
    display: flex;
  
    }
  
`;

const StyledLangList = styled.ul`
  margin-top: auto;
 
  padding: 0;
  list-style: none;
  
    @media (max-width: 768px) {
      display: flex;
      
    }
`;

const StyledLangButton=styled(ButtonIcon)`

  width:37px;
  height:37px;

`;

const StyledSwitch=styled.div`
margin-top: auto;
display: flex;
  justify-content: space-around;
  bottom: 200px;
  padding: 0;
  @media (max-width: 768px) {
      display: flex;
     
      
    }
`;

class Sidebar extends Component 
{


  

  render() {
    const  { pageContext,handleSetLanguage,handleSetPageColor } =this.props;

    const langType=localStorage.getItem('langType');
    
    return (
    <StyledWrapper activeColor={pageContext.sidebarColor}>
      <StyledLogoLink to="/calendar" />


      <StyledLinksList>
       

        <li>
          <ButtonIcon  as={NavLink} to="/calendar/dashboard" icon={calendarIcon}  />
        </li>
      
        <li>
          <ButtonIcon  as={NavLink} to="/calendar/statistics" icon={statisticsIcon}  />
        </li> 
      

      
      </StyledLinksList>

      <StyledSwitch>
        <ButtonIcon small icon={sunnyIcon} onClick={handleSetPageColor('sun')}/>  

        <Switch currentPageColor={pageContext.pageColor}  handleSetPageColor={handleSetPageColor}/>
        
        <ButtonIcon small icon={moonIcon} onClick={handleSetPageColor('moon')}/> 
      </StyledSwitch>

      <StyledLangList>
        <li>
        <StyledLangButton icon={englandIcon} active={(langType) == 'en' ? 'active' : ''} onClick={handleSetLanguage('en')} />
        </li>
        <li>
        <StyledLangButton icon={polandIcon} active={(langType) == 'pl' ? 'active' : ''} onClick={handleSetLanguage('pl')} />
        </li>
      </StyledLangList>

      <StyledLogoutButton as={NavLink} to="/calendar/logout" icon={logoutIcon} />
    </StyledWrapper>
    );
  }
}
    

  
  Sidebar.propTypes = {
    pageContext: PropTypes.shape({
      sidebarColor:PropTypes.string,
      pageColor:PropTypes.string,
    }),
    handleSetLanguage: PropTypes.func.isRequired,
    handleSetPageColor: PropTypes.func.isRequired,
  };

  Sidebar.defaultProps = {
    pageContext: PropTypes.shape({
      sidebarColor:'notes',
      pageColor:'sun'
    })
  };

export default withContext(Sidebar);
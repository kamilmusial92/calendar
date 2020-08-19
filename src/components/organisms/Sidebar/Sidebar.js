import React, {Component} from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import Switch from 'components/atoms/Input/Switch';

import logoutIcon from 'assets/icons/logout.svg';
import calendarIcon from 'assets/icons/calendar.svg';
import bellIcon from 'assets/icons/bell.svg';
import cautionIcon from 'assets/icons/caution.svg';

import statisticsIcon from 'assets/icons/statistics.svg';
import sunnyIcon from 'assets/icons/sunny.svg';
import moonIcon from 'assets/icons/moon.svg';
import settingsIcon from 'assets/icons/settings.svg';
import polandIcon from 'assets/icons/poland.svg';
import englandIcon from 'assets/icons/uk.svg';
import { connect } from 'react-redux';


import withContext from 'hoc/withContext';


const StyledWrapper = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  padding: 25px 0;
  width: 100px;
  height: 100vh;
  background-color: ${({ activeColor}) => activeColor};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-wrap:nowrap;
  z-index:9998;

  ${({ theme }) => theme.mq.tablet} {
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
  background-image: url(${({logo}) => logo});
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: 80%;
  border: none;
  margin-bottom: 10vh;
  
  ${({ theme }) => theme.mq.tablet} {
    margin:0;
    
    }

    ${({ theme }) => theme.mq.mobile} {
    display:none;
    
    }
`;

const StyledLogoutButton = styled(ButtonIcon)`
  margin-top: auto;
    
  ${({ theme }) => theme.mq.tablet} {
      display: flex;
     
   
    }
`;

const StyledLinksList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;

  ${({ theme }) => theme.mq.tablet} {
    display: flex;
  
    }
  
`;

const StyledLangList = styled.ul`
  margin-top: auto;
 
  padding: 0;
  list-style: none;
  
  ${({ theme }) => theme.mq.tablet} {
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
  ${({ theme }) => theme.mq.tablet} {
      display: flex;
     
      
    }
`;

const StyledAlertIcon=styled.div`
    width:27px;
    height:27px;
    background-color: hsl(0, 100%, 60%);
    border-radius:20px;
    float: right;
  
    background-image:url(${({icon}) => icon});
    background-repeat:no-repeat;
    background-position:50% 50%;
    background-size:60%;

    ${({ theme }) => theme.mq.tablet} {
      width:17px;
      height:17px;

    }
  
`;

class Sidebar extends Component 
{


  

  render() {
    
    const  {eventsfromcalendar, pageContext,handleSetLanguage,handleSetPageColor, authuserinfo} =this.props;

    const langType=localStorage.getItem('langType');
    const logocompany=authuserinfo && authuserinfo.company && authuserinfo.company.logo ;
    
    const roleAdmin = authuserinfo && authuserinfo.roles && authuserinfo.roles.filter(role=>role.name=='SuperAdmin').length;
      const roleCustomer = authuserinfo && authuserinfo.roles && authuserinfo.roles.filter(role=>role.name=='Customer').length ;
      const permission = authuserinfo && authuserinfo.workplace && authuserinfo.workplace.permissions  && authuserinfo.workplace.permissions.filter(perm=>perm.name=='AcceptableEvents').length;
   

      const notificationalert=eventsfromcalendar.filter(element => element.status == 1 );

    return (
    <StyledWrapper activeColor={pageContext.sidebarColor}>
      <StyledLogoLink logo={logocompany} to="/" />


      <StyledLinksList>
       

        <li>
          <ButtonIcon  as={NavLink} to="/calendar" icon={calendarIcon}  />
        </li>
      
        <li>
          <ButtonIcon  as={NavLink} to="/statistics" icon={statisticsIcon}  />
        </li> 
        {roleAdmin || roleCustomer || permission ?
        <li>
          <ButtonIcon  as={NavLink} to="/notifications" icon={bellIcon}  >
          {notificationalert.length ?
           <StyledAlertIcon  icon={cautionIcon}  />
           :''
          }
          </ButtonIcon>
        </li>
        : ''
        }

        <li>
          <ButtonIcon  as={NavLink} to="/settings" icon={settingsIcon}  />
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

      <StyledLogoutButton as={NavLink} to="/logout" icon={logoutIcon} />
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
      
    }),
    pageurl:window.location.pathname.substr(1)
  };

  const mapStateToProps = state => {

    const {  authuserinfo, eventsfromcalendar} = state;
  
    return {  authuserinfo,eventsfromcalendar };
  };

export default  connect(
  mapStateToProps,
  null,
)(withContext(Sidebar));
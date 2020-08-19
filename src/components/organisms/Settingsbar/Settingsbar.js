import React, {Component, useRef, useEffect} from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import { connect } from 'react-redux';
import {routes} from 'routes';

import bellIcon from 'assets/icons/bell.svg';

import customerIcon from 'assets/icons/customer.svg';
import avatarIcon from 'assets/icons/avatar.svg';
import usersIcon from 'assets/icons/users.svg';
import personIcon from 'assets/icons/person.svg';
import companyIcon from 'assets/icons/building.svg';

import gsap from "gsap"
import withContext from 'hoc/withContext';


const StyledWrapper = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  padding: 5px 5px 5px 5px;
  margin: 200px 0 0 98px;
  width: 80px;
  background-color:${({ theme, pagecolor }) => theme[pagecolor].backgroundElement};
  border: 2px solid ${({ activeColor }) => activeColor};

  display: flex;
  border-radius: 0px 20px 20px 0;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  flex-wrap:nowrap;
  z-index:9990;
  
    ${({ theme }) => theme.mq.tablet} {
    
    /* margin: 200px 0 0 -2px;*/
      display: flex;
      flex-direction: row;
      margin:48px 22% 0 22%;
      align-items:center;
      justify-content:center;
      width: 55vw;
     
      border-radius: 0px 0px 20px 20px;
    }

   
`;



const StyledLinksList = styled.ul`
  margin: 0px;
  padding: 0;
  list-style: none;

  ${({ theme }) => theme.mq.tablet} {
    
      display: flex;
      flex-direction: row;
    
    }
  
`;



class Settingsbar extends Component

{

  constructor(){
    super();
   
    this.tlUserInfo = null;

    this.FormUserInfoWrap= null;
    
}

  componentDidMount(){

    const { getAuthUserInfo } = this.props;
    
    //getAuthUserInfo();
  
    this.tlUserInfo = gsap.timeline({defaults:{ease:'power3.inOut'}})
    .set([this.FormUserInfoWrap,this.UserMenuWrap], {autoAlpha: 0})
    .fromTo(this.FormUserInfoWrap, { x: "-100"}, {duration: 1, x:"+=100", autoAlpha:1})
   
   
    
  }

  render(){
const {pageContext,authuserinfo}=this.props;
  
  const permission = authuserinfo && authuserinfo.workplace && authuserinfo.workplace.permissions  && authuserinfo.workplace.permissions.filter(perm=>perm.name=='Users').length;
  const roleAdmin = authuserinfo && authuserinfo.roles && authuserinfo.roles.filter(role=>role.name=='SuperAdmin').length;
  const roleCustomer = authuserinfo && authuserinfo.roles && authuserinfo.roles.filter(role=>role.name=='Customer').length;



  



  
    return (
     
    <StyledWrapper  ref={div => this.FormUserInfoWrap = div} pagecolor={pageContext.pageColor} activeColor={pageContext.sidebarColor}>
     


      <StyledLinksList>
       
      {roleAdmin ? 
        <li>
          <ButtonIcon medium as={NavLink} to={routes.settings.customers.home} icon={customerIcon} activeColor={pageContext.sidebarColor} />
        </li>
        : ''}

      {permission || roleAdmin || roleCustomer ? 
        <li>
        <ButtonIcon medium as={NavLink} to={routes.settings.users.home} icon={usersIcon} activeColor={pageContext.sidebarColor} />
        </li>
      : ''}

       

        <li>
          <ButtonIcon medium as={NavLink} to={routes.settings.avatar} icon={avatarIcon} activeColor={pageContext.sidebarColor} />
        </li>
        
        <li>
        <ButtonIcon medium as={NavLink} to={routes.settings.person} icon={personIcon} activeColor={pageContext.sidebarColor} />
        </li>

        {roleAdmin || roleCustomer ? 
        <li>
        <ButtonIcon medium as={NavLink} to={`/settings/company/${authuserinfo.company_id}`} icon={companyIcon} activeColor={pageContext.sidebarColor} />
        </li>
        : ''}

      </StyledLinksList>

   

    

     
    </StyledWrapper>
    
  
    );
  }
}

    

  
  Settingsbar.propTypes = {
    pageContext: PropTypes.shape({
      sidebarColor:PropTypes.string,
      pageColor:PropTypes.string,
    })
   
  };

  Settingsbar.defaultProps = {
    pageContext: PropTypes.shape({
      sidebarColor:'notes',
      pageColor:'sun'
    })
  };

  const mapStateToProps = state => {

    const {  authuserinfo} = state;
  
    return {  authuserinfo};
  };

  

export default connect(
  mapStateToProps,
  null,
)(withContext(Settingsbar));
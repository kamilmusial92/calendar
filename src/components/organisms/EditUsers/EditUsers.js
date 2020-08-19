import React, {Component}   from 'react'
import PropTypes from 'prop-types';

import styled, { css } from 'styled-components';
import { Formik, Form, Field } from 'formik';
import { Redirect, NavLink } from 'react-router-dom';


import Paragraph from 'components/atoms/Paragraph/Paragraph';
import Heading from 'components/atoms/Heading/Heading';
import Button from 'components/atoms/Button/Button';
import Input from 'components/atoms/Input/Input';
import ErrorMessage from 'components/atoms/ErrorMessage/ErrorMessage';
import ListMenu from 'components/atoms/ListMenu/ListMenu';
import Item from 'components/atoms/ListMenu/Item';

import {  fetchUsersInfo as fetchUsersInfoAction } from 'actions/user';
import {clearMessage as clearMessageAction} from 'actions';
import { connect } from 'react-redux';
import withContext from 'hoc/withContext';
import gsap from "gsap";
import {alerts} from 'helpers/alerts';
import DefaultTable from 'components/molecules/Table/DefaultTable';
import SmallSpinner from 'components/atoms/Spinner/SmallSpinner';

import Card from 'components/molecules/Card/Card';
import HeaderWrapper from 'components/atoms/HeaderWrapper/HeaderWrapper';
import InnerWrapper from 'components/atoms/InnerWrapper/InnerWrapper';
import Buttons from 'components/atoms/Buttons/Buttons';
import ButtonsInTable from 'components/atoms/Buttons/ButtonsInTable';


const StyledWrapper = styled.div`
  display:flex;

  ${({ theme }) => theme.mq.standard} {
   
   flex-direction:column-reverse;
   max-width:500px;
 }

 ${({ theme }) => theme.mq.tablet} {
   max-width:400px;
 }
 ${({ theme }) => theme.mq.mobile} {
   max-width:300px;
 }
`;



const StyledInnerWrapper= styled(InnerWrapper)`
   
   
    max-height:100%;
    
`;

const StyledMenu = styled(Card)`
  height: 100%;
  margin-left:20px;

    ${({ theme }) => theme.mq.standard} {
      margin: 0 0 10px 0;
      height: 100px;
    
    }
    ${({ theme }) => theme.mq.mobile} {
      margin: 0 0 10px 0;
      height: 100%;
    
    }
 
`;




class EditUsers extends Component {
    constructor(){
        super();
        this.ShowUserInfoWrap = null;
        this.FormUserInfoWrap = null;
      
        this.tlUserInfo = null;
        this.tlUserInfoForm = null;
        
    
        this.toggleUserInfoForm = this.toggleUserInfo.bind(this);
       
    }

   

    componentDidMount(){

        const { fetchUsersInfo,  clearMessage } = this.props;

       // clearMessage();
        fetchUsersInfo();
    
        this.tlUserInfo = gsap.timeline({defaults:{ease:'power3.inOut'}})
        .set([this.ShowUserInfoWrap,this.FormUserInfoWrap, this.FormChangePasswordWrap], {autoAlpha: 0})
        .fromTo(this.ShowUserInfoWrap, { y: "-100"}, {duration: 1, y:"+=100", autoAlpha:1})
       
        
    }

    toggleUserInfo(){
    
        this.tlUserInfo.to(this.ShowUserInfoWrap, {duration: 0.4,  autoAlpha:0});
        this.tlUserInfoForm = gsap.timeline({defaults:{ease:'power3.inOut'}})
       
        .fromTo(this.FormUserInfoWrap, { y: "-100"}, {duration: 1, y:"+=100", autoAlpha:1})
      }

   

    render() {
        
      const {pageContext,authuserinfo, usersinfo, message, clearMessage, isLoadingContent, alert} =this.props;
     

      const permission = authuserinfo && authuserinfo.workplace && authuserinfo.workplace.permissions  && authuserinfo.workplace.permissions.filter(perm=>perm.name=='Users').length;
      const roleAdmin = authuserinfo && authuserinfo.roles && authuserinfo.roles.filter(role=>role.name=='SuperAdmin').length;
      const roleCustomer = authuserinfo && authuserinfo.roles && authuserinfo.roles.filter(role=>role.name=='Customer').length;
     
    const headers=[];
    headers.push(pageContext.t('event.surname'),pageContext.t('card.stand'),pageContext.t('table.action'))

    const body=[];
 
    usersinfo.map(event=>(
      body.push({surname:event.name, stand: event && event.workplace && event.workplace.name, button:<ButtonsInTable><Button as={NavLink} to={`users/${event.id}`}  activecolor={pageContext.sidebarColor} small>{pageContext.t('card.edit')}</Button> <Button as={NavLink} to={`users/${event.id}`}  activecolor={pageContext.sidebarColor} small>{pageContext.t('button.permissions')}</Button></ButtonsInTable>})
    ));

   /* if(message=='accessdenied')
    {
      return <Redirect to={routes.error404} />;
    }*/

  

        return (
        <StyledWrapper ref={div => this.ShowUserInfoWrap = div}>
        {permission || roleAdmin || roleCustomer ?
          <>
            <Card pagecolor={pageContext.pageColor}>
                <HeaderWrapper  activeColor={pageContext.sidebarColor}>
                    <Heading>{pageContext.t('card.users')}</Heading>
                    
                
                </HeaderWrapper>
                <StyledInnerWrapper  pagecolor={pageContext.pageColor}>
                {alert  ? alerts(pageContext,'alerts.',message,'success') : ''}
                {!isLoadingContent ? 
                <DefaultTable type="users" headers={headers} body={body}/>
                : <SmallSpinner activecolor={pageContext.sidebarColor} className="loader" />}
        
                </StyledInnerWrapper>
              
            </Card>

            <StyledMenu pagecolor={pageContext.pageColor}>
              <HeaderWrapper  activeColor={pageContext.sidebarColor}>
                <Heading>Menu</Heading>
              </HeaderWrapper>

              <ListMenu pagecolor={pageContext.pageColor}>
               
                <Item><Button as={NavLink} to={`users/${authuserinfo.company_id}/create`} activecolor={pageContext.sidebarColor} small>Dodaj pracownika</Button></Item>
                

              </ListMenu>
            </StyledMenu>
          
           
            </>
            : ''}
        </StyledWrapper>
        )
    }
  
}
    

const mapStateToProps = state => {

    const { alert, message, usersinfo, authuserinfo, isLoadingContent} = state;
  
    return {alert, message, usersinfo, authuserinfo, isLoadingContent};
  };
  
  const mapDispatchToProps = dispatch => ({
  
    fetchUsersInfo: () => dispatch(fetchUsersInfoAction()),
    clearMessage: () =>dispatch(clearMessageAction())
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withContext(EditUsers));
import React, {Component}   from 'react'
import PropTypes from 'prop-types';

import styled, { css } from 'styled-components';
import { Formik, Form, Field } from 'formik';
import { Redirect, NavLink } from 'react-router-dom';
import {routes} from 'routes';
import SmallSpinner from 'components/atoms/Spinner/SmallSpinner';


import Paragraph from 'components/atoms/Paragraph/Paragraph';
import Heading from 'components/atoms/Heading/Heading';
import Button from 'components/atoms/Button/Button';
import Input from 'components/atoms/Input/Input';
import ErrorMessage from 'components/atoms/ErrorMessage/ErrorMessage';
import ListMenu from 'components/atoms/ListMenu/ListMenu';
import Item from 'components/atoms/ListMenu/Item';
import Image from 'components/atoms/Image/Image';

import {   fetchCustomersInfo as  fetchCustomersInfoAction } from 'actions/company';
import {clearMessage as clearMessageAction} from 'actions';
import { connect } from 'react-redux';
import withContext from 'hoc/withContext';
import gsap from "gsap";
import {alerts} from 'helpers/alerts';
import DefaultTable from 'components/molecules/Table/DefaultTable';

import Card from 'components/molecules/Card/Card';
import HeaderWrapper from 'components/atoms/HeaderWrapper/HeaderWrapper';
import InnerWrapper from 'components/atoms/InnerWrapper/InnerWrapper';
import Buttons from 'components/atoms/Buttons/Buttons';

const StyledWrapper = styled.div`
  display:flex;

  ${({ theme }) => theme.mq.standard} {
   
   flex-direction:column-reverse;
   max-width:700px;
 }

 ${({ theme }) => theme.mq.tablet} {
   max-width:700px;
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

const StyledImage=styled(Image)`

    width:100px;
   
    
    height:100px;
    
    ${({ theme }) => theme.mq.tablet} {
        width:50px;
   
    
        height:50px;
        }
`;



class List extends Component {
    constructor(){
        super();
        this.ShowUserInfoWrap = null;
        this.FormUserInfoWrap = null;
      
        this.tlUserInfo = null;
        this.tlUserInfoForm = null;
        
    
        this.toggleUserInfoForm = this.toggleUserInfo.bind(this);
       
    }

   

    componentDidMount(){

        const {  fetchCustomersInfo,  clearMessage } = this.props;

        clearMessage();
        fetchCustomersInfo();
    
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
        
      const {pageContext,authuserinfo, customersinfo, message, clearMessage, isLoadingContent, alert} =this.props;
 

    
      const roleAdmin = authuserinfo && authuserinfo.roles && authuserinfo.roles.filter(role=>role.name=='SuperAdmin').length;
    
     
    const headers=[];
    headers.push("Logo",pageContext.t('company.name'),pageContext.t('version'),"Status",pageContext.t('table.action'))

    const body=[];
 
    customersinfo && customersinfo.map(customer=>(
      
        body.push({logo: <StyledImage img={customer.logo}/>, name:customer.name, access:customer.access&&customer.access.name, status:customer.active, button:<Button as={NavLink} to={`/settings/company/${customer.id}`}  activecolor={pageContext.sidebarColor} small>{pageContext.t('card.edit')}</Button>})
      ));

 

  

        return (
        <StyledWrapper ref={div => this.ShowUserInfoWrap = div}>
        { roleAdmin ?
          <>
            <Card pagecolor={pageContext.pageColor}>
                <HeaderWrapper  activeColor={pageContext.sidebarColor}>
                    <Heading>{pageContext.t('card.customers')}</Heading>
                    
                
                </HeaderWrapper>
                <StyledInnerWrapper  pagecolor={pageContext.pageColor}>
                {alert ? alerts(pageContext,'alerts.',message,'success') : ''}
                {!isLoadingContent ? 
                <DefaultTable type="customers" headers={headers} body={body}/>
                : <SmallSpinner activecolor={pageContext.sidebarColor} className="loader" />}
        
                </StyledInnerWrapper>
              
            </Card>

            <StyledMenu pagecolor={pageContext.pageColor}>
              <HeaderWrapper  activeColor={pageContext.sidebarColor}>
                <Heading>Menu</Heading>
              </HeaderWrapper>

              <ListMenu pagecolor={pageContext.pageColor}>
               
                <Item><Button as={NavLink} to={routes.settings.customers.create} activecolor={pageContext.sidebarColor} small>Dodaj klienta</Button></Item>
                

              </ListMenu>
            </StyledMenu>
          
           
            </>
            : ''}
        </StyledWrapper>
        )
    }
  
}
    

const mapStateToProps = state => {

    const { alert,message, customersinfo, authuserinfo, isLoadingContent} = state;
  
    return { alert,message, customersinfo, authuserinfo, isLoadingContent};
  };
  
  const mapDispatchToProps = dispatch => ({
  
    fetchCustomersInfo: () => dispatch(fetchCustomersInfoAction()),
    clearMessage: () =>dispatch(clearMessageAction())
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withContext(List));
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

import {getWorkPlaces as getWorkPlacesAction} from 'actions/workplace';
import { getCompanyInfo as getCompanyInfoAction } from 'actions/company';

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
import ButtonsInTable from 'components/atoms/Buttons/ButtonsInTable';

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
        
    
       
       
    }

   

    componentDidMount(){

        const { id,  getWorkPlaces, getCompanyInfo, clearMessage } = this.props;
        getWorkPlaces(id);
       // getCompanyInfo(id);
        //clearMessage();
       
    
        this.tlUserInfo = gsap.timeline({defaults:{ease:'power3.inOut'}})
        .set([this.ShowUserInfoWrap], {autoAlpha: 0})
        .fromTo(this.ShowUserInfoWrap, { y: "-100"}, {delay:1,duration: 1, y:"+=100", autoAlpha:1})
       
        
    }

   

   

    render() {
        
      const {id, pageContext,authuserinfo,  message, workplaces, clearMessage, companyinfo, isLoadingContent, alert} =this.props;


    
      const roleAdmin = authuserinfo && authuserinfo.roles && authuserinfo.roles.filter(role=>role.name=='SuperAdmin').length;
      const roleCustomer = authuserinfo && authuserinfo.roles && authuserinfo.roles.filter(role=>role.name=='Customer').length && companyinfo.id==authuserinfo.company_id;
     
    const headers=[];
    headers.push(pageContext.t('name'),pageContext.t('table.action'))

    const body=[];
 
    workplaces && workplaces.map(workplace=>(
      
        body.push({name:workplace.name, button:<ButtonsInTable><Button as={NavLink} to={`/settings/company/${id}/workplaces/edit/${workplace.id}`}  activecolor={pageContext.sidebarColor} small>{pageContext.t('card.edit')}</Button> <Button as={NavLink} to={`/settings/company/${id}/workplaces/permissions/${workplace.id}`}  activecolor={pageContext.sidebarColor} small>{pageContext.t('button.permissions')}</Button> </ButtonsInTable> })
      ));

 

    

        return (
        <StyledWrapper ref={div => this.ShowUserInfoWrap = div}>
        { roleAdmin || roleCustomer ?
          <>
            <Card pagecolor={pageContext.pageColor}>
                <HeaderWrapper  activeColor={pageContext.sidebarColor}>
                    <Heading>{pageContext.t('card.workplaces')}</Heading>
                    
                
                </HeaderWrapper>
                <StyledInnerWrapper  pagecolor={pageContext.pageColor}>
                {alert  ? alerts(pageContext,'alerts.',message,'success') : ''}
                {!isLoadingContent ?
                <DefaultTable  headers={headers} body={body}/>
                : <SmallSpinner activecolor={pageContext.sidebarColor} className="loader" />}
        
                </StyledInnerWrapper>
                <Buttons pagecolor={pageContext.pageColor} activeColor={pageContext.sidebarColor}>
              
                    <Button type="button"
                    as={NavLink} to={`/settings/company/${id}`} medium back >
                    {pageContext.t('button.back')}
                    </Button>
                </Buttons>
            </Card>

            <StyledMenu pagecolor={pageContext.pageColor}>
              <HeaderWrapper  activeColor={pageContext.sidebarColor}>
                <Heading>Menu</Heading>
              </HeaderWrapper>

              <ListMenu pagecolor={pageContext.pageColor}>
               
                <Item><Button as={NavLink} to={`/settings/company/${id}/workplaces/create`} activecolor={pageContext.sidebarColor} small>Dodaj stanowisko</Button></Item>
                

              </ListMenu>
            </StyledMenu>
          
           
            </>
            : ''}
        </StyledWrapper>
        )
    }
  
}
    

const mapStateToProps = state => {

    const { alert, message, workplaces, authuserinfo, companyinfo, isLoadingContent} = state;
  
    return { alert, message, workplaces, authuserinfo, companyinfo, isLoadingContent};
  };
  
  const mapDispatchToProps = dispatch => ({
    getCompanyInfo: (id) =>dispatch(getCompanyInfoAction(id)),

    getWorkPlaces: (id) => dispatch(getWorkPlacesAction(id)),
    clearMessage: () =>dispatch(clearMessageAction())
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withContext(List));
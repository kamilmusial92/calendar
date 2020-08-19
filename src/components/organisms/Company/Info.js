import React, {Component}   from 'react'
import PropTypes from 'prop-types';

import styled, { css } from 'styled-components';

import { Redirect, NavLink } from 'react-router-dom';
import {routes} from 'routes';
import SmallSpinner from 'components/atoms/Spinner/SmallSpinner';

import Paragraph from 'components/atoms/Paragraph/Paragraph';
import Heading from 'components/atoms/Heading/Heading';
import Button from 'components/atoms/Button/Button';
import Card from 'components/molecules/Card/Card';
import HeaderWrapper from 'components/atoms/HeaderWrapper/HeaderWrapper';
import InnerWrapper from 'components/atoms/InnerWrapper/InnerWrapper';
import Buttons from 'components/atoms/Buttons/Buttons';
import ListMenu from 'components/atoms/ListMenu/ListMenu';
import Item from 'components/atoms/ListMenu/Item';

import Image from 'components/atoms/Image/Image';

import { getCompanyInfo as getCompanyInfoAction } from 'actions/company';

import {clearMessage as clearMessageAction} from 'actions';
import { connect } from 'react-redux';
import withContext from 'hoc/withContext';
import gsap from "gsap";
import {alerts} from 'helpers/alerts';


const StyledWrapper = styled.div`
  display:flex;
 
  justify-content: flex-start;
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

const StyledInnerWrapper= styled(InnerWrapper)`
   
    flex-direction: row;
    justify-content: start;
  
`;
const InfoContent= styled.div`
    display: flex;
    flex-direction:column;
    padding:10px;
`;


const StyledImage=styled(Image)`

    width:300px;
   
    min-width:100px;;
    height:240px;
    max-height:320px;
    ${({ theme }) => theme.mq.mobile} {
           display:none;
        }
`;




class Info extends Component {

  constructor(){
    super();
   
    this.tlUserInfo = null;

    this.FormUserInfoWrap= null;
    
}
  componentDidUpdate(prevProps, prevState) {

    const { id, getCompanyInfo } = this.props;


    if (id !== prevProps.id) {
      getCompanyInfo(id);
    }
  }

  componentDidMount(){

    const { id,  clearMessage, getCompanyInfo } = this.props;

    getCompanyInfo(id);
    clearMessage();
   

    this.tlUserInfo = gsap.timeline({defaults:{ease:'power3.inOut'}})
        .set([this.FormUserInfoWrap,this.UserMenuWrap], {autoAlpha: 0})
        .fromTo(this.FormUserInfoWrap, { y: "-100"}, { delay:1,duration: 1, y:"+=100", autoAlpha:1})
       
    
  }

    render() {
      
        const {id, authuserinfo, companyinfo, pageContext,  message, clearMessage, isLoadingContent} =this.props;
     
        const permission = authuserinfo && authuserinfo.workplace && authuserinfo.workplace.permissions  && authuserinfo.workplace.permissions.filter(perm=>perm.name=='Users').length;
        const roleAdmin = authuserinfo && authuserinfo.roles && authuserinfo.roles.filter(role=>role.name=='SuperAdmin').length;
        const roleCustomer = authuserinfo && authuserinfo.roles && authuserinfo.roles.filter(role=>role.name=='Customer').length && companyinfo.id==authuserinfo.company_id;

        const companyemail=companyinfo && companyinfo.users && companyinfo.users[0].email;
        
        const access=companyinfo && companyinfo.access && companyinfo.access.name;
      
      
      
        return (
       
         
          <StyledWrapper ref={div => this.FormUserInfoWrap = div}>
          { roleAdmin || roleCustomer  ?
            <>
            <Card pagecolor={pageContext.pageColor}>
              <HeaderWrapper  activeColor={pageContext.sidebarColor}>
                <Heading>{pageContext.t('company.data')}</Heading>
              
             
              </HeaderWrapper>
              <StyledInnerWrapper pagecolor={pageContext.pageColor}>
             
              {!isLoadingContent ?
               <>
                  <StyledImage img={companyinfo.logo}/>
                  <InfoContent>
                  {alerts(pageContext,'alerts',message,'success')} 
                    <Heading medium>{pageContext.t('company.name')}</Heading>
                    <Paragraph medium>{companyinfo.name}</Paragraph>

                    <Heading medium> {pageContext.t('company.url')}</Heading>
                    <Paragraph medium>{companyinfo.url}</Paragraph>

                    <Heading medium>E-mail</Heading>
                    <Paragraph medium>{companyemail}</Paragraph>

                    <Heading medium>{pageContext.t('version')}</Heading>
                    <Paragraph medium>{access}</Paragraph>
                  </InfoContent>
                </>
                :<SmallSpinner activecolor={pageContext.sidebarColor} className="loader" />}
              </StyledInnerWrapper>
              
              <Buttons pagecolor={pageContext.pageColor} activeColor={pageContext.sidebarColor}>
              {!isLoadingContent ? 
                <>

              <Button as={NavLink} to={`/settings/company/${companyinfo.id}/logotype`}  medium activecolor={pageContext.sidebarColor} >
              {pageContext.t('button.changelogotype')}
              </Button>

              <Button as={NavLink} to={`/settings/company/${companyinfo.id}/maincolor`}  medium activecolor={pageContext.sidebarColor} >
              {pageContext.t('button.changecolor')}
              </Button>

              </>
              : ''}
             
            
              </Buttons>
             
            </Card>

            <StyledMenu pagecolor={pageContext.pageColor}>
              <HeaderWrapper  activeColor={pageContext.sidebarColor}>
                <Heading>Menu</Heading>
              </HeaderWrapper>

             
              <ListMenu pagecolor={pageContext.pageColor}>
              {!isLoadingContent ? 
                <>
              <Item><Button as={NavLink} to={`/settings/company/${companyinfo.id}/workplaces`} activecolor={pageContext.sidebarColor} small>Zarządzaj stanowiskami</Button></Item>
              <Item><Button as={NavLink} to={`/settings/company/${companyinfo.id}/payments`} activecolor={pageContext.sidebarColor} small>Zarządzaj płatnościami</Button></Item>
               
                </>
                : ''}

              </ListMenu>
            </StyledMenu>
            </>
            : ''}
          </StyledWrapper>
         
        )
    }
}

const mapStateToProps = state => {

  const { message,  authuserinfo, companyinfo, isLoadingContent} = state;

  return { message,  authuserinfo, companyinfo, isLoadingContent};
};

const mapDispatchToProps = dispatch => ({
  getCompanyInfo: (id) =>dispatch(getCompanyInfoAction(id)),
  clearMessage: () =>dispatch(clearMessageAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withContext(Info)); 
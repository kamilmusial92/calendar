import React, { Component, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect, NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import Heading from 'components/atoms/Heading/Heading';
import Alert from 'components/atoms/Alert/Alert';

import Button from 'components/atoms/Button/Button';
import InputFile from 'components/atoms/Input/InputFile';
import Card from 'components/molecules/Card/Card';
import HeaderWrapper from 'components/atoms/HeaderWrapper/HeaderWrapper';
import InnerWrapper from 'components/atoms/InnerWrapper/InnerWrapper';
import Buttons from 'components/atoms/Buttons/Buttons';

import Image from 'components/atoms/Image/Image';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {alerts} from 'helpers/alerts';

import { getCompanyInfo as getCompanyInfoAction, changeSidebarColor as changeSidebarColorAction } from 'actions/company';
import {clearMessage as clearMessageAction} from 'actions';
import withContext from 'hoc/withContext';
import gsap from "gsap";
import { connect } from 'react-redux';
import { ChromePicker } from 'react-color';


const StyledWrapper = styled.div`
  display:flex;
`;

const StyledCard = styled(Card)`
  
  position:absolute;
 
`;


const StyledInnerWrapper= styled(InnerWrapper)`
   
    flex-direction: column;
    justify-content: start;
    
`;





class ChangeMainColor extends Component {
  constructor(){
    super();
    this.ShowAvatarWrap = null;
    this.FormAvatarWrap = null;
    
    this.tlAvatar = null;
    this.tlAvatarForm = null;
    

  }

  state = {
    background: '#',
  };

  componentDidUpdate(prevProps){
   const {authuserinfo, companyinfo, pageContext} = this.props;
 

    if (pageContext.sidebarColor && pageContext.sidebarColor!== this.state.background && this.state.background=='#') {
      
      if(authuserinfo.company_id==companyinfo.id)
      {
        this.setState({ background: pageContext.sidebarColor });
      }
      else{
        this.setState({ background: companyinfo.sidebarcolor });
      }
    }
  }

  componentDidMount(){

    const { id,  clearMessage, getCompanyInfo, pageContext} = this.props;
    clearMessage();
    getCompanyInfo(id);

   

    this.tlAvatar = gsap.timeline({defaults:{ease:'power3.inOut'}})
    .set([this.ShowAvatarWrap,  this.FormAvatarWrap], {autoAlpha: 0})
    .fromTo(this.ShowAvatarWrap, { y: "-100"}, {duration: 1, y:"+=100", autoAlpha:1})
   
    
  }    

 
  handleChangeColorOnPicker = (color) => {
    this.setState({ background: color.hex });
  };
 
    
    render(){

        const {id,pageContext, companyinfo, authuserinfo, message, clearMessage, changeSidebarColor } =this.props;
       
        const {background} = this.state;

        const roleAdmin = authuserinfo && authuserinfo.roles && authuserinfo.roles.filter(role=>role.name=='SuperAdmin').length;
        const roleCustomer = authuserinfo && authuserinfo.roles && authuserinfo.roles.filter(role=>role.name=='Customer').length && companyinfo.id==authuserinfo.company_id;

        return (
            <StyledWrapper>
                <StyledCard pagecolor={pageContext.pageColor} ref={div => this.ShowAvatarWrap = div}>
                { roleAdmin || roleCustomer ?
                    <> 
                    <HeaderWrapper  activeColor={pageContext.sidebarColor}>
                    <Heading>Theme Color</Heading>
                   
                    
                    </HeaderWrapper>

                    <Formik enableReinitialize
                    initialValues={{ sidebarcolor: background}}
                   
            
                    onSubmit={values => {
                      changeSidebarColor(values, id);
                     // this.setState({ redirect: `/settings/company/${id}` });

                  
                   }}
            
                    >  
                   {({ values, handleChange, handleBlur }) => (
                    <Form>
                      <StyledInnerWrapper  pagecolor={pageContext.pageColor}>
                  
              
                      {alerts(pageContext,'alerts',message,'success')}

                  
                        <ChromePicker disableAlpha={true} color={ this.state.background }
                        onChange={ this.handleChangeColorOnPicker } />
                    
                     

                      </StyledInnerWrapper>
                    
                    <Buttons pagecolor={pageContext.pageColor} activeColor={pageContext.sidebarColor}>
                    
                    <Button type="button"  as={NavLink} to={`/settings/company/${id}`}  medium back activecolor={pageContext.sidebarColor} >
                    {pageContext.t('button.back')}
                    </Button>

                    <Button type='submit'  medium mediumaccept activecolor={pageContext.sidebarColor} >
                    {pageContext.t('button.save')}
                    </Button>
            
                  
                    </Buttons>
                    </Form>
                    )}
                    </Formik>
                    </>
                    : ''}
                </StyledCard>

              

            </StyledWrapper>
        );
    }
}

ChangeMainColor.propTypes = {
 
 
    pageColor: PropTypes.oneOf(['sun', 'moon'])

}

ChangeMainColor.defaultProps = {
    pageColor: 'sun',
   
  
  
};



const mapStateToProps = state => {

  const { message, authuserinfo, companyinfo} = state;

  return { message, authuserinfo, companyinfo };
};

const mapDispatchToProps = dispatch => ({
  changeSidebarColor: (values, id) =>dispatch(changeSidebarColorAction(values, id)),
  getCompanyInfo: (id) =>dispatch(getCompanyInfoAction(id)),
  clearMessage: () =>dispatch(clearMessageAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withContext(ChangeMainColor));



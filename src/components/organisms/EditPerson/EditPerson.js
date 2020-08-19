import React, { Component, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import styled, { css } from 'styled-components';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import Heading from 'components/atoms/Heading/Heading';
import HeaderWrapper from 'components/atoms/HeaderWrapper/HeaderWrapper';
import InnerWrapper from 'components/atoms/InnerWrapper/InnerWrapper';
import Buttons from 'components/atoms/Buttons/Buttons';

import Button from 'components/atoms/Button/Button';
import Card from 'components/molecules/Card/Card';

import { Formik, Form, Field } from 'formik';
import Input from 'components/atoms/Input/Input';
import { connect } from 'react-redux';

import ErrorMessage from 'components/atoms/ErrorMessage/ErrorMessage';
import { editAuthUserInfo as editAuthUserInfoAction, changeUserPassword as changeUserPasswordAction } from 'actions/user';
import {clearMessage as clearMessageAction} from 'actions';
import withContext from 'hoc/withContext';
import gsap from "gsap"
import * as Yup from 'yup'; 
import {alerts} from 'helpers/alerts';

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



const EditUserSchema = Yup.object().shape({
  surname: Yup.string()
    .min(4, 'tooshort')
    .required('required'),

  email: Yup.string()
    .email('invalidemail')
    .required('required'),
    
});

function equalTo(ref, msg) {
  return Yup.mixed().test({
    name: 'equalTo',
    exclusive: false,
    message: msg || '${path} must be the same as ${reference}',
    params: {
      reference: ref.path,
    },
    test: function(value) {
      return value === this.resolve(ref);
    },
  });
}
Yup.addMethod(Yup.string, 'equalTo', equalTo);

const ChangePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'tooshort')
    .required('required'),

  newpassword: Yup.string()
    .min(6, 'tooshort')
    .required('required'),
    
    newpasswordrepeat: Yup.string().equalTo(Yup.ref('newpassword'), 'passwordsdonotmatch').required('Required'),
});

class EditPerson extends Component {
  constructor(){
    super();
    this.ShowUserInfoWrap = null;
    this.FormUserInfoWrap = null;
    this.FormChangePasswordWrap = null;
    this.tlUserInfo = null;
    this.tlUserInfoForm = null;
    this.tlChangePasswordForm = null;

    this.toggleUserInfoForm = this.toggleUserInfo.bind(this);
    this.toggleChangePasswordForm = this.toggleChangePassword.bind(this);
   
}


  componentDidMount(){

    const {  clearMessage } = this.props;
    clearMessage();
    

    this.tlUserInfo = gsap.timeline({defaults:{ease:'power3.inOut'}})
    .set([this.ShowUserInfoWrap,this.FormUserInfoWrap, this.FormChangePasswordWrap], {autoAlpha: 0})
    .fromTo(this.ShowUserInfoWrap, { y: "-100"}, {duration: 1, y:"+=100", autoAlpha:1})
   
    
  }

  toggleUserInfo(){
    
    this.tlUserInfo.to(this.ShowUserInfoWrap, {duration: 0.4,  autoAlpha:0});
    this.tlUserInfoForm = gsap.timeline({defaults:{ease:'power3.inOut'}})
   
    .fromTo(this.FormUserInfoWrap, { y: "-100"}, {duration: 1, y:"+=100", autoAlpha:1})
  }

  toggleChangePassword(){

    this.tlUserInfo.to(this.ShowUserInfoWrap, {duration: 0.4,  autoAlpha:0});
    this.tlChangePasswordForm = gsap.timeline({defaults:{ease:'power3.inOut'}})
   
    .fromTo(this.FormChangePasswordWrap, { y: "-100"}, {duration: 1, y:"+=100", autoAlpha:1})
  }

  toggleBackToUserInfo = (tl,wrap) => {
    
    tl.to(wrap, {duration: 0.1,  autoAlpha:0});
      this.tlUserInfo = gsap.timeline({defaults:{ease:'power3.inOut'}})
    
      .fromTo(this.ShowUserInfoWrap, { y: "-100"}, {duration: 1, y:"+=100", autoAlpha:1})
  }

  

 
 render(){

 const {pageContext, editAuthUserInfo, changeUserPassword, authuserinfo, message, clearMessage} =this.props;



          if(message=='passwordchanged')
          {
            
            this.toggleBackToUserInfo(this.tlChangePasswordForm,this.FormChangePasswordWrap);
          }

          if(message=='dataauthhasbeenchanged')
          {
            this.toggleBackToUserInfo(this.tlUserInfoForm,this.FormUserInfoWrap)
          }
         
     
      
          const workplace = authuserinfo && authuserinfo.workplace && authuserinfo.workplace.name

     
    return (
      <>
     <StyledWrapper>
      <StyledCard pagecolor={pageContext.pageColor} ref={div => this.ShowUserInfoWrap = div}>
        <HeaderWrapper  activeColor={pageContext.sidebarColor}>
          <Heading>{pageContext.t('card.userdata')}</Heading>
          
         
        </HeaderWrapper>
        <StyledInnerWrapper  pagecolor={pageContext.pageColor}>
       

        {alerts(pageContext,'alerts',message,'success')}
          <Heading medium>{pageContext.t('event.surname')}</Heading>
          <Paragraph medium>{authuserinfo.name}</Paragraph>

          <Heading medium> {pageContext.t('card.stand')}</Heading>
          <Paragraph medium>{workplace}</Paragraph>

          <Heading medium>E-mail</Heading>
          <Paragraph medium>{authuserinfo.email}</Paragraph>
          

        </StyledInnerWrapper>
        
        <Buttons pagecolor={pageContext.pageColor} activeColor={pageContext.sidebarColor}>
         
          <Button onClick={()=>{this.toggleUserInfoForm(); clearMessage();}} medium activecolor={pageContext.sidebarColor} >
          {pageContext.t('card.edit')}
          </Button>

          <Button  onClick={()=>{this.toggleChangePasswordForm(); clearMessage();}} medium activecolor={pageContext.sidebarColor} >
          {pageContext.t('card.changepass')}
          </Button>
        </Buttons>

      </StyledCard>

      
      <StyledCard pagecolor={pageContext.pageColor} ref={div => this.FormUserInfoWrap = div}>
        <HeaderWrapper  activeColor={pageContext.sidebarColor}>
          <Heading>{pageContext.t('card.changeuserdata')}</Heading>
          
         
        </HeaderWrapper>
        <Formik enableReinitialize
        initialValues={{ surname: authuserinfo.name, email: authuserinfo.email}}
        validationSchema={EditUserSchema}

        onSubmit={values => {
          editAuthUserInfo(values);
          
        }}
  
        >  
        {({ values, handleChange, handleBlur,errors, touched }) => (
          <Form>
          <InnerWrapper  pagecolor={pageContext.pageColor}>
          {message!='datahasbeenchanged' ? alerts(pageContext,'card.validate',message,'') : ''}

            <Heading medium>{pageContext.t('event.surname')}</Heading>
            <Input card
            type="text"
            name="surname"
            placeholder={values.surname}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.surname} 
            className={`form-control ${
              errors.surname && touched.surname ? "is-invalid" : ""
            }`}
            />
            {errors.surname && touched.surname ? (
              <ErrorMessage>{pageContext.t(`card.validate.${errors.surname}`)}</ErrorMessage>
            ) : null}

            <Heading medium>E-mail</Heading>
            <Input card
            type="text"
            name="email"
            placeholder={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            className={`form-control ${
              errors.email && touched.email ? "is-invalid" : ""
            }`}
            />
            {errors.email && touched.email ? (
              <ErrorMessage>{pageContext.t(`card.validate.${errors.email}`)}</ErrorMessage>
            ) : null}

          </InnerWrapper>
          
          <Buttons pagecolor={pageContext.pageColor} activeColor={pageContext.sidebarColor}>
          
            <Button type="button"
            onClick={()=>{this.toggleBackToUserInfo(this.tlUserInfoForm,this.FormUserInfoWrap); clearMessage();}} medium  >
            {pageContext.t('button.back')}
            </Button>

            <Button type="submit" medium mediumaccept activecolor={pageContext.sidebarColor} >
            {pageContext.t('button.save')}
            </Button>
          </Buttons>
          </Form>
        )}
        </Formik>
      </StyledCard>

      <StyledCard pagecolor={pageContext.pageColor} ref={div => this.FormChangePasswordWrap = div}>
        <HeaderWrapper  activeColor={pageContext.sidebarColor}>
          <Heading>{pageContext.t('card.changepassword')}</Heading>
          
         
        </HeaderWrapper>

        <Formik enableReinitialize
        initialValues={{ password: '', newpassword: '', newpasswordrepeat: ''}}
      
        validationSchema={ChangePasswordSchema}
        onSubmit={(values, {resetForm} )=> {
          changeUserPassword(values , '');
          resetForm({})
        }}
      >  
      {({ values, handleChange, handleBlur,errors, touched }) => (
        <Form>
        <InnerWrapper  pagecolor={pageContext.pageColor}>
        {message!='passwordchanged' ? alerts(pageContext,'card.validate',message,'') : ''}
      

          <Heading medium>Aktualne hasło</Heading>
          <Input card
          type="password"
          name="password"
          placeholder="Podaj aktualne hasło"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.password}
          className={`form-control ${
            errors.password && touched.password ? "is-invalid" : ""
          }`}
          />
          {errors.password && touched.password ? (
            <ErrorMessage>{pageContext.t(`card.validate.${errors.password}`)}</ErrorMessage>
          ) : null}

          <Heading medium>Nowe hasło</Heading>
          <Input card
          type="password"
          name="newpassword"
          placeholder="Podaj nowe hasło"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.newpassword}
          className={`form-control ${
            errors.newpassword && touched.newpassword ? "is-invalid" : ""
          }`}
          />
          {errors.newpassword && touched.newpassword ? (
            <ErrorMessage>{pageContext.t(`card.validate.${errors.newpassword}`)}</ErrorMessage>
          ) : null}

          <Heading medium>Powtórz nowe hasło</Heading>
          <Input card
          type="password"
          name="newpasswordrepeat"
          placeholder="Powtórz nowe hasło"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.newpasswordrepeat}
          className={`form-control ${
            errors.newpasswordrepeat && touched.newpasswordrepeat ? "is-invalid" : ""
          }`}
          />
          {errors.newpasswordrepeat && touched.newpasswordrepeat ? (
            <ErrorMessage>{pageContext.t(`card.validate.${errors.newpasswordrepeat}`)}</ErrorMessage>
          ) : null}

        </InnerWrapper>
        
        <Buttons pagecolor={pageContext.pageColor} activeColor={pageContext.sidebarColor}>
         
          <Button type="button"
          onClick={()=>{this.toggleBackToUserInfo(this.tlChangePasswordForm,this.FormChangePasswordWrap); clearMessage();}} medium  >
          {pageContext.t('button.back')}
          </Button>

          <Button type="submit" medium mediumaccept activecolor={pageContext.sidebarColor} >
         {pageContext.t('button.save')}
          </Button>
        </Buttons>
      </Form>
      )}
      </Formik>
      </StyledCard>

  </StyledWrapper>
      
      </>
    );
 }
  
}

EditPerson.propTypes = {
 
 
    pageColor: PropTypes.oneOf(['sun', 'moon'])

}

EditPerson.defaultProps = {
    pageColor: 'sun',
   
  
  
};



const mapStateToProps = state => {

  const { message, authuserinfo} = state;

  return { message, authuserinfo };
};

const mapDispatchToProps = dispatch => ({
  editAuthUserInfo: (values) => dispatch(editAuthUserInfoAction(values)),
  changeUserPassword: (values) => dispatch(changeUserPasswordAction(values)),
 
  clearMessage: () =>dispatch(clearMessageAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withContext(EditPerson));

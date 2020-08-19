import React, {Component}   from 'react'
import PropTypes from 'prop-types';

import styled, { css } from 'styled-components';
import { Formik, Form, Field } from 'formik';
import { Redirect, NavLink } from 'react-router-dom';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import Heading from 'components/atoms/Heading/Heading';
import Button from 'components/atoms/Button/Button';
import Input from 'components/atoms/Input/Input';
import Card from 'components/molecules/Card/Card';
import HeaderWrapper from 'components/atoms/HeaderWrapper/HeaderWrapper';
import InnerWrapper from 'components/atoms/InnerWrapper/InnerWrapper';
import Buttons from 'components/atoms/Buttons/Buttons';
import Select from 'components/atoms/Input/Select';

import ErrorMessage from 'components/atoms/ErrorMessage/ErrorMessage';
import { editUserInfo as editUserInfoAction, getUserInfo as getUserInfoAction } from 'actions/user';
import {getAuthWorkPlaces as getAuthWorkPlacesAction} from 'actions/workplace';
import {clearMessage as clearMessageAction} from 'actions';
import { connect } from 'react-redux';
import withContext from 'hoc/withContext';
import gsap from "gsap";
import {alerts} from 'helpers/alerts';

import * as Yup from 'yup'; 


const StyledWrapper = styled.div`
  display:flex;
`;


const EditUserSchema = Yup.object().shape({
    surname: Yup.string()
      .min(4, 'tooshort')
      .required('required'),
  
    email: Yup.string()
      .email('invalidemail')
      .required('required'),
      
  });
  

class EditUserForm extends Component {

  constructor(){
    super();
    this.ShowUserInfoWrap = null;
    this.FormUserInfoWrap = null;
  
    this.tlUserInfo = null;
    this.FormUserInfoWrap= null;
   
}

state={
  redirect:null
}


  componentDidMount(){

    const { id, getUserInfo, getAuthWorkPlaces} = this.props;
    
    getUserInfo(id);
    getAuthWorkPlaces();


    this.tlUserInfo = gsap.timeline({defaults:{ease:'power3.inOut'}})
        .set([this.FormUserInfoWrap,this.FormUserInfoWrap, this.FormChangePasswordWrap], {autoAlpha: 0})
        .fromTo(this.FormUserInfoWrap, { y: "-100"}, {duration: 1, y:"+=100", autoAlpha:1})
   
    
}

    render() {
       
        const {id, authuserinfo, pageContext, getuserinfo, message, clearMessage, workplaces, editUserInfo} =this.props;
        const {redirect}=this.state;

        const permission = authuserinfo && authuserinfo.workplace && authuserinfo.workplace.permissions  && authuserinfo.workplace.permissions.filter(perm=>perm.name=='Users').length;
        const roleAdmin = authuserinfo && authuserinfo.roles && authuserinfo.roles.filter(role=>role.name=='SuperAdmin').length;
        const roleCustomer = authuserinfo && authuserinfo.roles && authuserinfo.roles.filter(role=>role.name=='Customer').length;

        const workplace = getuserinfo && getuserinfo.workplace && getuserinfo.workplace.id

        if(redirect)
        {
          return <Redirect to={redirect} />;
        }

     
      
        return (
            <StyledWrapper ref={div => this.FormUserInfoWrap = div}>
            {permission || roleAdmin || roleCustomer ?
            <>
            <Card pagecolor={pageContext.pageColor}>
            <HeaderWrapper  activeColor={pageContext.sidebarColor}>
              <Heading>{pageContext.t('card.changeuserdata')}</Heading>
              
             
            </HeaderWrapper>
            <Formik enableReinitialize
            initialValues={{ surname: getuserinfo.name, email: getuserinfo.email, workplace: workplace}}
            validationSchema={EditUserSchema}
    
            onSubmit={values => {
              editUserInfo(values,id);
              this.setState({ redirect: `/settings/users/${id}` });

             
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
                
                <Heading medium>Stanowisko</Heading>
                <Select  
                name="workplace" 
                onChange={handleChange}
             
                onBlur={handleBlur}
                
                >
                {workplaces.filter(item => item.id === values.workplace).map(item => (
                  <option key={item.id} selected  value={item.id}>{item.name}</option>
                ))
                }
      
                  
                {workplaces.filter(event =>event.id !== values.workplace).map(event => (
      
                    
                    <option key={event.id}  value={event.id}>{event.name}</option>
                  ))
                }
                </Select>
              </InnerWrapper>
              
              <Buttons pagecolor={pageContext.pageColor} activeColor={pageContext.sidebarColor}>
              
                <Button type="button"
                as={NavLink} to={`/settings/users/${id}`} medium back >
                {pageContext.t('button.back')}
                </Button>
    
                <Button type="submit" medium mediumaccept activecolor={pageContext.sidebarColor} >
                {pageContext.t('button.save')}
                </Button>
              </Buttons>
              </Form>
            )}
            </Formik>
          </Card>
          </>
          : ''}
          </StyledWrapper>
        )
    }
}

const mapStateToProps = state => {

  const { message, getuserinfo, authuserinfo, workplaces} = state;

  return { message, getuserinfo, authuserinfo, workplaces};
};

const mapDispatchToProps = dispatch => ({
  editUserInfo: (values, id) => dispatch(editUserInfoAction(values, id)),
  getUserInfo: (id) => dispatch(getUserInfoAction(id)),
  getAuthWorkPlaces: () =>dispatch(getAuthWorkPlacesAction()),

  clearMessage: () =>dispatch(clearMessageAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withContext(EditUserForm));
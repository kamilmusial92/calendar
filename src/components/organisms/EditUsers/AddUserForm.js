import React, {Component}   from 'react'
import PropTypes from 'prop-types';

import styled, { css } from 'styled-components';
import { Formik, Form, Field } from 'formik';
import { Redirect, NavLink } from 'react-router-dom';
import {routes} from 'routes';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import Heading from 'components/atoms/Heading/Heading';
import Button from 'components/atoms/Button/Button';
import Input from 'components/atoms/Input/Input';
import Select from 'components/atoms/Input/Select';

import Card from 'components/molecules/Card/Card';
import HeaderWrapper from 'components/atoms/HeaderWrapper/HeaderWrapper';
import InnerWrapper from 'components/atoms/InnerWrapper/InnerWrapper';
import Buttons from 'components/atoms/Buttons/Buttons';

import ErrorMessage from 'components/atoms/ErrorMessage/ErrorMessage';
import {  addUser as addUserAction } from 'actions/user';
import {getWorkPlaces as getWorkPlacesAction} from 'actions/workplace';
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
      .min(1, 'tooshort')
      .required('required'),
  
    email: Yup.string()
      .email('invalidemail')
      .required('required'),
      
  });
  

class AddUserForm extends Component {

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

    const { id, getWorkPlaces, clearMessage } = this.props;
    clearMessage();
    getWorkPlaces(id);
    
   

    this.tlUserInfo = gsap.timeline({defaults:{ease:'power3.inOut'}})
        .set([this.FormUserInfoWrap], {autoAlpha: 0})
       .fromTo(this.FormUserInfoWrap, { y: "-100"}, {duration: 1, y:"+=100", autoAlpha:1})
   
    
    }

    render() {
       
        const { pageContext, message, authuserinfo, clearMessage, editUserInfo, workplaces, addUser} =this.props;
        const {redirect}=this.state;

        const permission = authuserinfo && authuserinfo.workplace && authuserinfo.workplace.permissions  && authuserinfo.workplace.permissions.filter(perm=>perm.name=='Users').length;
        const roleAdmin = authuserinfo && authuserinfo.roles && authuserinfo.roles.filter(role=>role.name=='SuperAdmin').length;
        const roleCustomer = authuserinfo && authuserinfo.roles && authuserinfo.roles.filter(role=>role.name=='Customer').length;

        const workplace=workplaces.slice(0, 1).map(item=>item.id);
     
        if(redirect)
        {
          return <Redirect to={redirect} />;
        }

        return (
          

         
            <StyledWrapper ref={div => this.FormUserInfoWrap = div}>
            {permission || roleAdmin || roleCustomer ?
            <Card pagecolor={pageContext.pageColor}>
            <HeaderWrapper  activeColor={pageContext.sidebarColor}>
              <Heading>{pageContext.t('card.adduser')}</Heading>
              
             
            </HeaderWrapper>
            <Formik enableReinitialize
            initialValues={{ surname: '', email: '', workplace:workplace[0]}}
            validationSchema={EditUserSchema}
    
            onSubmit={values => {
              addUser(values);
              this.setState({ redirect: `/settings/users` });

             
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
                {workplaces.map(item => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))
                  }
                </Select>
              </InnerWrapper>
              
              <Buttons pagecolor={pageContext.pageColor} activeColor={pageContext.sidebarColor}>
              
                <Button type="button"
                as={NavLink} to={routes.settings.users.home} medium back >
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
          :   ''}
          </StyledWrapper>
      
         
        )
    }
}

const mapStateToProps = state => {

  const { message, workplaces, authuserinfo } = state;

  return { message, workplaces, authuserinfo};
};

const mapDispatchToProps = dispatch => ({
  addUser: (values) => dispatch(addUserAction(values)),
  getWorkPlaces: (id) =>dispatch(getWorkPlacesAction(id)),
  clearMessage: () =>dispatch(clearMessageAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withContext(AddUserForm));
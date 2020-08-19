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
import { addCustomer as addCustomerAction } from 'actions/company';
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

    company: Yup.string()
   
    .required('required'),
  
    email: Yup.string()
      .email('invalidemail')
      .required('required'),
      
  });
  

class AddCustomerForm extends Component {

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

    const {   clearMessage } = this.props;
    clearMessage();
   
    
   

    this.tlUserInfo = gsap.timeline({defaults:{ease:'power3.inOut'}})
        .set([this.FormUserInfoWrap], {autoAlpha: 0})
       .fromTo(this.FormUserInfoWrap, { y: "-100"}, {duration: 1, y:"+=100", autoAlpha:1})
   
    
    }

    render() {
       
        const { pageContext, message, authuserinfo, clearMessage, addCustomer} =this.props;
        const {redirect}=this.state;

        const roleAdmin = authuserinfo && authuserinfo.roles && authuserinfo.roles.filter(role=>role.name=='SuperAdmin').length;
       

      
     
        if(redirect)
        {
          return <Redirect to={redirect} />;
        }

        return (
          

         
            <StyledWrapper ref={div => this.FormUserInfoWrap = div}>
            { roleAdmin ?
            <Card pagecolor={pageContext.pageColor}>
            <HeaderWrapper  activeColor={pageContext.sidebarColor}>
              <Heading>{pageContext.t('company.add')}</Heading>
              
             
            </HeaderWrapper>
            <Formik enableReinitialize
            initialValues={{ surname: '', email: '', company: ''}}
            validationSchema={EditUserSchema}
    
            onSubmit={values => {
              addCustomer(values);
              this.setState({ redirect: `/settings/customers` });

             
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
                    
                <Heading medium>{pageContext.t('company.name')}</Heading>
                <Input card
                type="text"
                name="company"
                placeholder={values.company}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.company}
                className={`form-control ${
                  errors.company && touched.company ? "is-invalid" : ""
                }`}
                />
                {errors.company && touched.company ? (
                  <ErrorMessage>{pageContext.t(`card.validate.${errors.company}`)}</ErrorMessage>
                ) : null}

              </InnerWrapper>
              
              <Buttons pagecolor={pageContext.pageColor} activeColor={pageContext.sidebarColor}>
              
                <Button type="button"
                as={NavLink} to={routes.settings.users} medium back >
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

  const { message, authuserinfo } = state;

  return { message,  authuserinfo};
};

const mapDispatchToProps = dispatch => ({
  addCustomer: (values) => dispatch(addCustomerAction(values)),
 
  clearMessage: () =>dispatch(clearMessageAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withContext(AddCustomerForm));
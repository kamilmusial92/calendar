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

import { createWorkPlace as createWorkPlaceAction } from 'actions/workplace';
import { getCompanyInfo as getCompanyInfoAction } from 'actions/company';

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
    name: Yup.string()
    
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

    const { id,  getCompanyInfo, clearMessage } = this.props;
    clearMessage();
    getCompanyInfo(id);
   
   

    this.tlUserInfo = gsap.timeline({defaults:{ease:'power3.inOut'}})
        .set([this.FormUserInfoWrap], {autoAlpha: 0})
       .fromTo(this.FormUserInfoWrap, { y: "-100"}, {duration: 1, y:"+=100", autoAlpha:1})
   
    
    }

    render() {
       
        const { id,companyinfo, pageContext, message, authuserinfo,clearMessage, createWorkPlace} =this.props;
        const {redirect}=this.state;

        const roleAdmin = authuserinfo && authuserinfo.roles && authuserinfo.roles.filter(role=>role.name=='SuperAdmin').length;
        const roleCustomer = authuserinfo && authuserinfo.roles && authuserinfo.roles.filter(role=>role.name=='Customer').length && companyinfo.id==authuserinfo.company_id;

      


      
     
        if(redirect)
        {
          return <Redirect to={redirect} />;
        }

        return (
          

         
            <StyledWrapper ref={div => this.FormUserInfoWrap = div}>
            { roleAdmin || roleCustomer?
            <Card pagecolor={pageContext.pageColor}>
            <HeaderWrapper  activeColor={pageContext.sidebarColor}>
              <Heading>{pageContext.t('card.workplacecreate')}</Heading>
              
             
            </HeaderWrapper>
            <Formik enableReinitialize
            initialValues={{ name: ''}}
            validationSchema={EditUserSchema}
    
            onSubmit={values => {
            createWorkPlace(values, id);
             this.setState({ redirect: `/settings/company/${id}/workplaces` });

             
            }}
      
            >  
            {({ values, handleChange, handleBlur,errors, touched }) => (
              <Form>
              <InnerWrapper  pagecolor={pageContext.pageColor}>
             
              {message!='workplacehasbeenchange' ? alerts(pageContext,'card.validate',message,'') : ''}
              
                <Heading medium>{pageContext.t('name')}</Heading>
                <Input card
                type="text"
                name="name"
                placeholder={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name} 
                className={`form-control ${
                  errors.name && touched.name ? "is-invalid" : ""
                }`}
                />
                {errors.name && touched.name ? (
                  <ErrorMessage>{pageContext.t(`card.validate.${errors.name}`)}</ErrorMessage>
                ) : null}
    
                
              </InnerWrapper>
              
              <Buttons pagecolor={pageContext.pageColor} activeColor={pageContext.sidebarColor}>
              
                <Button type="button"
                as={NavLink} to={`/settings/company/${id}/workplaces`} medium back >
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

const mapStateToProps = (state, ownProps) => {


  const { message, authuserinfo, companyinfo } = state;
  
    return {
     
      message,  authuserinfo, companyinfo
    };
  

};

const mapDispatchToProps = dispatch => ({
 
  createWorkPlace:(values,id) =>dispatch(createWorkPlaceAction(values, id)),
  getCompanyInfo: (id) =>dispatch(getCompanyInfoAction(id)),
  clearMessage: () =>dispatch(clearMessageAction())
}); 
 
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withContext(AddUserForm));
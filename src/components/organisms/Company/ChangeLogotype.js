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

import { getCompanyInfo as getCompanyInfoAction, uploadLogotype as uploadLogotypeAction } from 'actions/company';
import {clearMessage as clearMessageAction} from 'actions';
import withContext from 'hoc/withContext';
import gsap from "gsap";
import { connect } from 'react-redux';
import * as Yup from 'yup'; 


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


const StyledEditButton= styled(Button)`
  display: ${({isVisibleEditButton}) => isVisibleEditButton ? 'flex': 'none'};
`;


  const FILE_SIZE = 8000 * 1024;
  const SUPPORTED_FORMATS = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    "image/png"
   
  ];
  const validationSchema = Yup.object().shape({
    
    file: Yup
      .mixed()
      .required("A file is required")
      .test(
        "fileSize",
        "File too large",
        value => value && value.size <= FILE_SIZE
      )
      .test(
        "fileFormat",
        "Unsupported Format",
        value => value && SUPPORTED_FORMATS.includes(value.type)
      )
  });

class ChangeLogotype extends Component {
  constructor(){
    super();
    this.ShowAvatarWrap = null;
    this.FormAvatarWrap = null;
    
    this.tlAvatar = null;
    this.tlAvatarForm = null;
    

    this.toggleAvatarForm = this.toggleAvatar.bind(this);
  }

  state={
    isVisibleEditButton: true
  }

  componentDidMount(){

    const { id,  clearMessage, getCompanyInfo} = this.props;
    clearMessage();
    getCompanyInfo(id);

  

    this.tlAvatar = gsap.timeline({defaults:{ease:'power3.inOut'}})
    .set([this.ShowAvatarWrap,  this.FormAvatarWrap], {autoAlpha: 0})
    .fromTo(this.ShowAvatarWrap, { y: "-100"}, {duration: 1, y:"+=100", autoAlpha:1})
   
    
  }    

  toggleAvatar(){
    
    this.setState({
      isVisibleEditButton: false,
    });
    
    this.tlAvatarForm = gsap.timeline({defaults:{ease:'power3.inOut'}})
   
    .fromTo(this.FormAvatarWrap, { y: "-100px"}, {duration: 0.5, y:"+=450px", autoAlpha:1})
    
  }

  hideAvatar(){
    
    this.setState({
      isVisibleEditButton: true,
    });
    
   
  
    this.tlAvatarForm.to(this.FormAvatarWrap, {duration: 0.4,  autoAlpha:0})
  }
    
    render(){

        const {id, pageContext, companyinfo, authuserinfo, message, clearMessage, uploadLogotype} =this.props;
       
        const {isVisibleEditButton}= this.state;

        const roleAdmin = authuserinfo && authuserinfo.roles && authuserinfo.roles.filter(role=>role.name=='SuperAdmin').length;
        const roleCustomer = authuserinfo && authuserinfo.roles && authuserinfo.roles.filter(role=>role.name=='Customer').length && companyinfo.id==authuserinfo.company_id;

        return (
            <StyledWrapper>
                <StyledCard pagecolor={pageContext.pageColor} ref={div => this.ShowAvatarWrap = div}>
                { roleAdmin || roleCustomer ?
                    <> 
                    <HeaderWrapper  activeColor={pageContext.sidebarColor}>
                    <Heading>Logotype</Heading>
                   
                    
                    </HeaderWrapper>
                    <StyledInnerWrapper  pagecolor={pageContext.pageColor}>
                
            
                    {alerts(pageContext,'alerts',message,'success')}
                    <Image img={companyinfo.logo}/>
                   
            
                    </StyledInnerWrapper>
                    
                    <Buttons pagecolor={pageContext.pageColor} activeColor={pageContext.sidebarColor}>
                    
                    <Button type="button"  as={NavLink} to={`/settings/company/${id}`}  medium back activecolor={pageContext.sidebarColor} >
                    {pageContext.t('button.back')}
                    </Button>

                    <StyledEditButton isVisibleEditButton={isVisibleEditButton} onClick={()=>{this.toggleAvatar(); clearMessage();}} medium activecolor={pageContext.sidebarColor} >
                    {pageContext.t('card.edit')}
                    </StyledEditButton>
            
                  
                    </Buttons>
                    </>
                    : ''}
                </StyledCard>

                <StyledCard pagecolor={pageContext.pageColor} ref={div => this.FormAvatarWrap = div}>
                  <HeaderWrapper  activeColor={pageContext.sidebarColor}>
                  <Heading>{pageContext.t('card.uploadimage')}</Heading>
                  
                  
                  </HeaderWrapper>
                    <Formik 
                    initialValues={{   file: undefined}}
                 
                    validationSchema={validationSchema}
                    validateOnBlur={true}

                    onSubmit={values => {
                   
                      uploadLogotype(values, id);
                      this.hideAvatar();
                    }}
              
                    > 
                    {({ values, handleChange, handleBlur,errors, touched,  setFieldValue}) => (
                      <Form>
                    <StyledInnerWrapper  pagecolor={pageContext.pageColor}>
                  
                    {errors.file ? (
                        <Alert>{errors.file}</Alert>
                      ) : null}
                
                    <Field 
                    title="Select a file"
                    component={InputFile}
                    name="file"
                    setFieldValue={setFieldValue}
                    errorMessage={errors["file"] ? errors["file"] : undefined}
                   touched={touched["file"]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                   
                   
                    />
                  
                  

                  
            
                    </StyledInnerWrapper>
                    
                    <Buttons pagecolor={pageContext.pageColor} activeColor={pageContext.sidebarColor}>
                   
                  

                    <Button type="submit" medium activecolor={pageContext.sidebarColor} >
                    Wgraj
                    </Button>
            
                  
                    </Buttons>
                    </Form>
                    )}
                    </Formik>
                </StyledCard>

            </StyledWrapper>
        );
    }
}

ChangeLogotype.propTypes = {
 
 
    pageColor: PropTypes.oneOf(['sun', 'moon'])

}

ChangeLogotype.defaultProps = {
    pageColor: 'sun',
   
  
  
};



const mapStateToProps = state => {

  const { message, authuserinfo, companyinfo} = state;

  return { message, authuserinfo, companyinfo };
};

const mapDispatchToProps = dispatch => ({
  uploadLogotype: (values, id) => dispatch(uploadLogotypeAction(values, id)),
  getCompanyInfo: (id) =>dispatch(getCompanyInfoAction(id)),
  clearMessage: () =>dispatch(clearMessageAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withContext(ChangeLogotype));



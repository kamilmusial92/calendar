import React, { Component, useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

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

import {  uploadAvatar as uploadAvatarAction } from 'actions/user';
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

class EditAvatar extends Component {
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

    const { fetchUserInfo,  clearMessage} = this.props;
    clearMessage();
    

    this.tlAvatar = gsap.timeline({defaults:{ease:'power3.inOut'}})
    .set([this.ShowAvatarWrap,  this.FormAvatarWrap], {autoAlpha: 0})
    .fromTo(this.ShowAvatarWrap, { y: "-100"}, {duration: 1, y:"+=100", autoAlpha:1})
   
    
  }    

  toggleAvatar(){
    
    this.setState({
      isVisibleEditButton: false,
    });
    
    this.tlAvatarForm = gsap.timeline({defaults:{ease:'power3.inOut'}})
   
    .fromTo(this.FormAvatarWrap, { y: "-100px"}, {duration: 0.5, y:"+=400px", autoAlpha:1})
    
  }

  hideAvatar(){
    
    this.setState({
      isVisibleEditButton: true,
    });
    
   
  
    this.tlAvatarForm.to(this.FormAvatarWrap, {duration: 0.4,  autoAlpha:0})
  }
    
    render(){

        const {pageContext,  authuserinfo, message, clearMessage, uploadAvatar} =this.props;
       const {isVisibleEditButton}= this.state;
        return (
            <StyledWrapper>
                <StyledCard pagecolor={pageContext.pageColor} ref={div => this.ShowAvatarWrap = div}>
                    <HeaderWrapper  activeColor={pageContext.sidebarColor}>
                    <Heading>Avatar</Heading>
                   
                    
                    </HeaderWrapper>
                    <StyledInnerWrapper  pagecolor={pageContext.pageColor}>
                
            
                    {alerts(pageContext,'alerts',message,'success')}
                    <Image img={authuserinfo.avatar_path}/>
                   
            
                    </StyledInnerWrapper>
                    
                    <Buttons pagecolor={pageContext.pageColor} activeColor={pageContext.sidebarColor}>
                    
                    <StyledEditButton isVisibleEditButton={isVisibleEditButton} onClick={()=>{this.toggleAvatar(); clearMessage();}} medium activecolor={pageContext.sidebarColor} >
                    {pageContext.t('card.edit')}
                    </StyledEditButton>
            
                  
                    </Buttons>
        
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
                      
                      uploadAvatar(values);
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

EditAvatar.propTypes = {
 
 
    pageColor: PropTypes.oneOf(['sun', 'moon'])

}

EditAvatar.defaultProps = {
    pageColor: 'sun',
   
  
  
};



const mapStateToProps = state => {

  const { message, authuserinfo} = state;

  return { message, authuserinfo };
};

const mapDispatchToProps = dispatch => ({
  uploadAvatar: (values) => dispatch(uploadAvatarAction(values)),
  
  clearMessage: () =>dispatch(clearMessageAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withContext(EditAvatar));



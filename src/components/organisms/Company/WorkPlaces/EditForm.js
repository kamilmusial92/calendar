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
import trashIcon from 'assets/icons/trash.svg';
import Modal from 'components/molecules/Modal/Modal';


import ErrorMessage from 'components/atoms/ErrorMessage/ErrorMessage';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';

import {removeWorkPlace as removeWorkPlaceAction, editWorkPlace as editWorkPlaceAction, getWorkPlaces as  getWorkPlacesAction } from 'actions/workplace';
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
  redirect:null,
  modalVisible:false,
  isAccept: false
}

  componentDidUpdate(prevState, prevProps){

    const { id, removeWorkPlace, workplaceid, alert, message } = this.props;
    
    if(this.state.isAccept && this.state.isAccept!=prevProps.isAccept)
    {
     
      removeWorkPlace(workplaceid);
    
    }

    if(message=='workplacehasbeenremoved' )
    {
   
      this.setState({ redirect: `/settings/company/${id}/workplaces` });
    }
  }

  componentDidMount(){

    const { id,  getCompanyInfo, getWorkPlaces, clearMessage } = this.props;
    clearMessage();
    getCompanyInfo(id);
    getWorkPlaces(id);
   

    this.tlUserInfo = gsap.timeline({defaults:{ease:'power3.inOut'}})
        .set([this.FormUserInfoWrap], {autoAlpha: 0})
       .fromTo(this.FormUserInfoWrap, { y: "-100"}, {duration: 1, y:"+=100", autoAlpha:1})
   
    
    }

    showModal = (text) =>{
  

  
      this.setState ({
        messageModal: text,
        modalVisible: true,
      });
      
    }

    hideModal= () =>{
      this.setState ({
      modalVisible: false,
    });
   }
  

    acceptedAction = () =>{
      this.setState ({
        isAccept: true,
      });
    }

  

  

    render() {
       
        const { id, workplaceid,companyinfo, pageContext, message, authuserinfo, workplaceItem,clearMessage, editWorkPlace, removeWorkPlace, alert} =this.props;
        const {redirect, modalVisible, isAccept}=this.state;

        const roleAdmin = authuserinfo && authuserinfo.roles && authuserinfo.roles.filter(role=>role.name=='SuperAdmin').length;
        const roleCustomer = authuserinfo && authuserinfo.roles && authuserinfo.roles.filter(role=>role.name=='Customer').length && companyinfo.id==authuserinfo.company_id;

        const workplace=workplaceItem && workplaceItem[0] && workplaceItem[0].name;

      
     
        if(redirect)
        {
          return <Redirect to={redirect} />;
        }

        if(message=='accessdenied')
        {
          return <Redirect to={routes.error404} />;
        }
       
        const textModal="Czy chcesz usunąć to stanowisko?";

        return (
          

         <>
         <Modal hideModal={this.hideModal} text={textModal} message={message} error={alert} acceptedAction={this.acceptedAction} isAccept={isAccept}  isVisible={modalVisible}/>
            <StyledWrapper ref={div => this.FormUserInfoWrap = div}>
           
            { roleAdmin || roleCustomer?
            <Card pagecolor={pageContext.pageColor}>
            <HeaderWrapper  activeColor={pageContext.sidebarColor}>
              <Heading>{pageContext.t('card.workplaceedit')}</Heading>
              <ButtonIcon small   icon={trashIcon} onClick={this.showModal}  />
             
            </HeaderWrapper>
            <Formik enableReinitialize
            initialValues={{ name: workplace}}
            validationSchema={EditUserSchema}
    
            onSubmit={values => {
            editWorkPlace(values, workplaceid);
             this.setState({ redirect: `/settings/company/${id}/workplaces` });

             
            }}
      
            >  
            {({ values, handleChange, handleBlur,errors, touched }) => (
              <Form>
              <InnerWrapper  pagecolor={pageContext.pageColor}>
             
            
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
              
                <Button type="button" onClick={()=>clearMessage()}
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
      
         </>
        )
    }
}

const mapStateToProps = (state, ownProps) => {


  const { alert, message,workplaces, authuserinfo, companyinfo } = state;
  
    return {
      workplaceItem: workplaces.filter(item=>item.id==ownProps.workplaceid),
      message, workplaces, authuserinfo, companyinfo, alert
    };
  

};

const mapDispatchToProps = dispatch => ({
  removeWorkPlace: (id) => dispatch(removeWorkPlaceAction(id)),
  editWorkPlace: (values ,id) => dispatch(editWorkPlaceAction(values, id)),
  getWorkPlaces: (id) => dispatch(getWorkPlacesAction(id)),
  getCompanyInfo: (id) =>dispatch(getCompanyInfoAction(id)),
  clearMessage: () =>dispatch(clearMessageAction())
}); 
 
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withContext(AddUserForm));
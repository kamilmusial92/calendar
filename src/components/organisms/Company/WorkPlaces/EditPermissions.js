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
import Checkbox from 'components/atoms/Input/Checkbox';


import Card from 'components/molecules/Card/Card';
import HeaderWrapper from 'components/atoms/HeaderWrapper/HeaderWrapper';
import InnerWrapper from 'components/atoms/InnerWrapper/InnerWrapper';
import Buttons from 'components/atoms/Buttons/Buttons';

import ErrorMessage from 'components/atoms/ErrorMessage/ErrorMessage';

import { createWorkPlace as createWorkPlaceAction, getPermissions as getPermissionsAction, editWorkplacePermission as editWorkplacePermissionAction, getWorkPlaces as getWorkPlacesAction} from 'actions/workplace';
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
  filter:[]
}

componentDidUpdate(prevProps)
{
    const { workplaceItem } = this.props;
    if(prevProps.workplaceItem!=workplaceItem )
    {   
        const currentperm=workplaceItem && workplaceItem[0] && workplaceItem[0].permissions;
        const currentpermid=currentperm&&currentperm.map(perm=>perm.id)   ;

        const list=this.state.filter;

        if(currentpermid)
        {
        this.setState({ 
            filter:
              
              currentpermid
             
            
          });
        }
    }
}

  componentDidMount(){
 
    const { workplaceItem, workplaceid, id,getWorkPlaces, getPermissions, getCompanyInfo, clearMessage } = this.props;
    clearMessage();
    getWorkPlaces(id);
    getCompanyInfo(id);
    getPermissions();
  

   

    this.tlUserInfo = gsap.timeline({defaults:{ease:'power3.inOut'}})
        .set([this.FormUserInfoWrap], {autoAlpha: 0})
       .fromTo(this.FormUserInfoWrap, { y: "-100"}, {duration: 1, y:"+=100", autoAlpha:1})
   
    
    }


    addToFilter = (data) =>{
     
        const list=this.state.filter;
  
          if(list.filter(element=>element===data).length > 0)
          {
            
            const newlist=list.filter(element=>element!==data)
            this.setState({ 
              filter:[
               
                ...newlist
              ]
            })
            
        
          }
          else{
            
            this.setState({ 
              filter:[
                ...list, 
                data
              ]
            })
            
          }
      }

    render() {
       
        const {workplaceItem,workplaceid, id,companyinfo, pageContext, workplaces,message, authuserinfo,clearMessage, editWorkplacePermission, permissions} =this.props;
        const {redirect, filter}=this.state;

        const roleAdmin = authuserinfo && authuserinfo.roles && authuserinfo.roles.filter(role=>role.name=='SuperAdmin').length;
        const roleCustomer = authuserinfo && authuserinfo.roles && authuserinfo.roles.filter(role=>role.name=='Customer').length && companyinfo.id==authuserinfo.company_id;

   //   const currentperm=workplaceItem && workplaceItem[0] && workplaceItem[0].permissions;
        const workplacename=workplaceItem && workplaceItem[0] && workplaceItem[0].name;



        if(redirect)
        {
          return <Redirect to={redirect} />;
        }

        return (
          

         
            <StyledWrapper ref={div => this.FormUserInfoWrap = div}>
            { roleAdmin || roleCustomer?
            <Card pagecolor={pageContext.pageColor}>
            <HeaderWrapper  activeColor={pageContext.sidebarColor}>
              <Heading>{pageContext.t('card.workplacepermission')} {workplacename}</Heading>
              
             
            </HeaderWrapper>
            <Formik enableReinitialize
            initialValues={{ permission: filter}}
            
    
            onSubmit={values => {
            editWorkplacePermission(values, id, workplaceid);
             this.setState({ redirect: `/settings/company/${id}/workplaces` });

             
            }}
      
            >  
            {({ values, handleChange, handleBlur,errors, touched, setFieldValue}) => (
              <Form>
              <InnerWrapper  pagecolor={pageContext.pageColor}>
             
             
              
                <Heading medium>Ustaw</Heading>
                {permissions.map(permission=>(
                 
                    <Field
                    type="checkbox"
                    name='permission'
                    id={permission.id}
                    label={permission.name}
                    filter={filter}
                    addToFilter={this.addToFilter}
                    
                    setFieldValue={setFieldValue}
                    component={Checkbox}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    />
                
                ))
}
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


  const { workplaces, permissions, message, authuserinfo, companyinfo } = state;
  
    return {
        workplaceItem: workplaces.filter(item=>item.id==ownProps.workplaceid),
        permissions,message,  authuserinfo, companyinfo
    };
  

};

const mapDispatchToProps = dispatch => ({
 
  createWorkPlace:(values,id) =>dispatch(createWorkPlaceAction(values, id)),
  getCompanyInfo: (id) =>dispatch(getCompanyInfoAction(id)),
  getPermissions:()=>dispatch(getPermissionsAction()),
  editWorkplacePermission:(values,companyid,id) => dispatch(editWorkplacePermissionAction(values, companyid,id)),
  clearMessage: () =>dispatch(clearMessageAction()),
  getWorkPlaces: (id) => dispatch(getWorkPlacesAction(id)),

}); 
 
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withContext(AddUserForm));
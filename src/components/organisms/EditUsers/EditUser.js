import React, {Component}   from 'react'
import PropTypes from 'prop-types';

import styled, { css } from 'styled-components';
import { Formik, Form, Field } from 'formik';
import { Redirect, NavLink } from 'react-router-dom';
import {routes} from 'routes';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import Heading from 'components/atoms/Heading/Heading';
import Button from 'components/atoms/Button/Button';
import Card from 'components/molecules/Card/Card';
import HeaderWrapper from 'components/atoms/HeaderWrapper/HeaderWrapper';
import InnerWrapper from 'components/atoms/InnerWrapper/InnerWrapper';
import Buttons from 'components/atoms/Buttons/Buttons';
import ListMenu from 'components/atoms/ListMenu/ListMenu';
import Item from 'components/atoms/ListMenu/Item';
import Modal from 'components/molecules/Modal/Modal';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import trashIcon from 'assets/icons/trash.svg';

import Image from 'components/atoms/Image/Image';
import Input from 'components/atoms/Input/Input';
import ErrorMessage from 'components/atoms/ErrorMessage/ErrorMessage';
import { editUserInfo as editUserInfoAction, getUserInfo as getUserInfoAction, changeUserStatus as changeUserStatusAction, deleteUser as deleteUserAction } from 'actions/user';
import {clearMessage as clearMessageAction} from 'actions';
import { connect } from 'react-redux';
import withContext from 'hoc/withContext';
import gsap from "gsap";
import {alerts} from 'helpers/alerts';
import SmallSpinner from 'components/atoms/Spinner/SmallSpinner';


const StyledWrapper = styled.div`
  display:flex;
 
  justify-content: flex-start;
  ${({ theme }) => theme.mq.standard} {
   
    flex-direction:column-reverse;
    max-width:500px;
  }

  ${({ theme }) => theme.mq.tablet} {
    max-width:400px;
  }
  ${({ theme }) => theme.mq.mobile} {
    max-width:300px;
  }
  
`;

const StyledMenu = styled(Card)`
  height: 100%;
  margin-left:20px;

    ${({ theme }) => theme.mq.standard} {
      margin: 0 0 10px 0;
      height: 100px;
    
    }
    ${({ theme }) => theme.mq.mobile} {
      margin: 0 0 10px 0;
      height: 100%;
    
    }
 
`;

const StyledInnerWrapper= styled(InnerWrapper)`
   
    flex-direction: row;
    justify-content: start;
  
`;
const InfoContent= styled.div`
    display: flex;
    flex-direction:column;
    padding:10px;
`;


const StyledImage=styled(Image)`

    width:300px;
   
    min-width:100px;;
    height:240px;
    max-height:320px;
    ${({ theme }) => theme.mq.mobile} {
           display:none;
        }
`;




class EditUser extends Component {

  constructor(){
    super();
   
    this.tlUserInfo = null;

    this.FormUserInfoWrap= null;
    
}

state={
  redirect:null,
  modalVisible:false,
  isAccept: false,
  isChangeStatus: false,
  isDelete: false,
  messageModal:''
}

componentDidUpdate(prevState, prevProps){

  const { id, deleteUser, changeUserStatus, alert, message } = this.props;
 
  if(this.state.isAccept && this.state.isChangeStatus && this.state.isAccept!=prevProps.isAccept)
  {
   
    changeUserStatus(id);
    this.hideModal();

    this.setState ({
      isAccept: false,
    });
  }

  if(this.state.isAccept && this.state.isDelete && this.state.isAccept!=prevProps.isAccept)
  {
   
    deleteUser(id);
    this.hideModal();

    this.setState ({
      isAccept: false,
    });
  }

  if(message=='deleteusersuccess' )
  {
 
    this.setState({ redirect: `/settings/users` });
  }
  
}

  componentDidMount(){

    const { id, getUserInfo, clearMessage } = this.props;
    clearMessage();
    getUserInfo(id);

    this.tlUserInfo = gsap.timeline({defaults:{ease:'power3.inOut'}})
        .set([this.FormUserInfoWrap,this.UserMenuWrap], {autoAlpha: 0})
        .fromTo(this.FormUserInfoWrap, { y: "-100"}, {duration: 1, y:"+=100", autoAlpha:1})
       
    
}


  showModal = (text, type) =>{


    this.setState ({
      messageModal: text,
      modalVisible: true,
      isChangeStatus: type=='isChangeStatus' ? true : false,
      isDelete: type=='isDelete' ? true : false
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
       
        const {id, authuserinfo, pageContext, getuserinfo, message, clearMessage, editUserInfo, isLoadingContent} =this.props;
        const {redirect, modalVisible, isAccept, messageModal}=this.state;

        const permission = authuserinfo && authuserinfo.workplace && authuserinfo.workplace.permissions  && authuserinfo.workplace.permissions.filter(perm=>perm.name=='Users').length;
        const roleAdmin = authuserinfo && authuserinfo.roles && authuserinfo.roles.filter(role=>role.name=='SuperAdmin').length;
        const roleCustomer = authuserinfo && authuserinfo.roles && authuserinfo.roles.filter(role=>role.name=='Customer').length;

        const roleUser= getuserinfo && getuserinfo.roles && getuserinfo.roles.filter(role=>role.name=='User').length;

        const workplace = getuserinfo && getuserinfo.workplace && getuserinfo.workplace.name

        if(redirect)
        {
          return <Redirect to={redirect} />;
        }
        
        if(message=='accessdenied')
        {
          return <Redirect to={routes.error404} />;
        }
      
        return (
          <>
          <Modal hideModal={this.hideModal} text={messageModal}  error={alert} acceptedAction={this.acceptedAction} isAccept={isAccept}  isVisible={modalVisible}/>
          
          <StyledWrapper ref={div => this.FormUserInfoWrap = div}>
          {permission || roleAdmin || roleCustomer ?
            <>
            <Card pagecolor={pageContext.pageColor}>
              <HeaderWrapper  activeColor={pageContext.sidebarColor}>
                <Heading>{pageContext.t('card.userdata')}</Heading>
              {(roleAdmin || roleCustomer) && roleUser ?
                <ButtonIcon small   icon={trashIcon} onClick={()=>this.showModal('Czy chcesz usunąć użytkownika?', 'isDelete')}  />
                : ''}
             
              </HeaderWrapper>
              <StyledInnerWrapper pagecolor={pageContext.pageColor}>
             
              {!isLoadingContent ?
                <>
                  <StyledImage img={getuserinfo.avatar_path}/>
                  <InfoContent>
                  {alerts(pageContext,'alerts',message,'success')} 
                    <Heading medium>{pageContext.t('event.surname')}</Heading>
                    <Paragraph medium>{getuserinfo.name}</Paragraph>

                    <Heading medium> {pageContext.t('card.stand')}</Heading>
                    <Paragraph medium>{workplace}</Paragraph>

                    <Heading medium>E-mail</Heading>
                    <Paragraph medium>{getuserinfo.email}</Paragraph>
                    <Heading medium>Status</Heading>
                    <Paragraph medium>{getuserinfo.active ? pageContext.t('user.active') : pageContext.t('user.inactive')}</Paragraph>

                  </InfoContent>
                  </>
                  :<SmallSpinner activecolor={pageContext.sidebarColor} className="loader" />}

              </StyledInnerWrapper>
              
              <Buttons pagecolor={pageContext.pageColor} activeColor={pageContext.sidebarColor}>
              
              <Button as={NavLink} to={`/settings/users/${id}/edit`}  medium activecolor={pageContext.sidebarColor} >
              {pageContext.t('card.edit')}
              </Button>
              
              {(roleAdmin || roleCustomer) && roleUser ?
              <Button onClick={()=>this.showModal('Czy chcesz zmienić status?', 'isChangeStatus')} back medium activecolor={pageContext.sidebarColor} >
              {getuserinfo.active ? pageContext.t('button.inactive') : pageContext.t('button.active')}
              </Button>
                : ''}
            
              </Buttons>
             
            </Card>

            <StyledMenu pagecolor={pageContext.pageColor}>
              <HeaderWrapper  activeColor={pageContext.sidebarColor}>
                <Heading>Menu</Heading>
              </HeaderWrapper>

              <ListMenu pagecolor={pageContext.pageColor}>
               
                <Item><Button activecolor={pageContext.sidebarColor} small>Export</Button></Item>
                <Item><Button activecolor={pageContext.sidebarColor} small>Calendar</Button></Item>
                <Item><Button activecolor={pageContext.sidebarColor} small>Kwestionariusz</Button></Item>

              </ListMenu>
            </StyledMenu>
            </>
            : ''}
          </StyledWrapper>
          </>
        )
    }
}

const mapStateToProps = state => {

  const { message, getuserinfo, authuserinfo, isLoadingContent} = state;

  return { message, getuserinfo, authuserinfo, isLoadingContent};
};

const mapDispatchToProps = dispatch => ({
  deleteUser: (id) =>dispatch(deleteUserAction(id)),
  changeUserStatus: (id) =>dispatch(changeUserStatusAction(id)),
  editUserInfo: (values, id) => dispatch(editUserInfoAction(values, id)),
  getUserInfo: (id) => dispatch(getUserInfoAction(id)),
  clearMessage: () =>dispatch(clearMessageAction())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withContext(EditUser));
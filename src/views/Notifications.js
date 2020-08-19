import React, { Component }  from 'react'
import styled from 'styled-components';

import UserPageTemplate from 'templates/UserPageTemplate';
import NewItemBar from 'components/organisms/NewItemBar/NewItemBar';
import Heading from 'components/atoms/Heading/Heading';
import SmallSpinner from 'components/atoms/Spinner/SmallSpinner';

import Paragraph from 'components/atoms/Paragraph/Paragraph';
import Button from 'components/atoms/Button/Button';
import Card from 'components/molecules/Card/Card';
import HeaderWrapper from 'components/atoms/HeaderWrapper/HeaderWrapper';
import InnerWrapper from 'components/atoms/InnerWrapper/InnerWrapper';
import PropTypes from 'prop-types';
import DefaultTable from 'components/molecules/Table/DefaultTable';
//import {Spinner} from 'react-bootstrap';
import { StatusText, DateFormat} from 'helpers/events';
import withContext from 'hoc/withContext';

import { connect } from 'react-redux';
import moment from 'moment';
import gsap from "gsap";



const StyledWrapper = styled.div`
  display:flex;
  padding-left: 100px;
  padding-top:20px;
  max-height: 100vh;

    ${({ theme }) => theme.mq.tablet} {
        padding-left:10%;
        margin-top:40px;
        max-width:700px;
    }
    ${({ theme }) => theme.mq.mobile} {
       
           padding-left:10%;
           padding-right:5%;
           max-width:300px;
    }

    ${({ theme }) => theme.mq.standard} {
    
    flex-direction:column-reverse;
    max-width:700px;
    }


 
`;

const StyledInnerWrapper= styled(InnerWrapper)`
   
   
    max-height:100%;
    
`;



class Notifications extends Component {

  constructor(){
    super();
    this.ShowUserInfoWrap = null;
    this.FormUserInfoWrap = null;
  
    this.tlUserInfo = null;
    this.tlUserInfoForm = null;
    

    this.toggleUserInfoForm = this.toggleUserInfo.bind(this);
   
}

  state = {
    calendarEvents:[],
    idItem:null,
    isNewItemBarVisible:false,
    titleItem:null,
    contentItem:null,
    surnameItem:null,
    statusItem:null,
    startItem:null,
    endItem:null,
    alldayItem:null,
    useridItem:null,
  }

  componentDidUpdate(prevProps, prevState) {

    if(this.props.message!=prevProps.message && (this.props.message=='eventaccepted' ||  this.props.message=='eventrejected'))
    {
      this.setState({
        statusItem: 4
      });
    }
  }
  
  componentDidMount(){

   
    

    this.tlUserInfo = gsap.timeline({defaults:{ease:'power3.inOut'}})
    .set([this.ShowUserInfoWrap,this.FormUserInfoWrap, this.FormChangePasswordWrap], {autoAlpha: 0})
    .fromTo(this.ShowUserInfoWrap, { y: "-100"}, {duration: 1, y:"+=100", autoAlpha:1})
   
    
}

toggleUserInfo(){

    this.tlUserInfo.to(this.ShowUserInfoWrap, {duration: 0.4,  autoAlpha:0});
    this.tlUserInfoForm = gsap.timeline({defaults:{ease:'power3.inOut'}})
   
    .fromTo(this.FormUserInfoWrap, { y: "-100"}, {duration: 1, y:"+=100", autoAlpha:1})
  }
  
  

    showItemBar = (idItem,titleItem,contentItem,surnameItem,statusItem,startItem,endItem,alldayItem) =>{
      this.setState({ 

        isNewItemBarVisible: true,
        idItem,titleItem,contentItem,surnameItem,statusItem,startItem,endItem,alldayItem
      });
    }

    closeItemBar = () =>{

      this.setState({ 
  
        isNewItemBarVisible:false
        
      });
      
    }


    render() {
  
    const {isNewItemBarVisible,idItem,titleItem,contentItem,surnameItem,statusItem,startItem,endItem,alldayItem,useridItem} = this.state;
    const {isLoadingContent,authuserinfo,pageContext,eventsfromcalendar } = this.props;


    const headers=[];
    headers.push(pageContext.t('event.surname'),pageContext.t('statistics.category'),'Stanowisko',pageContext.t('event.dateofnotification'),pageContext.t('table.action'))

    const body=[];

    eventsfromcalendar.filter(event=>event.status==1).map(event=>(
      body.push({surname:event.surname,eventname:event.event_name,position:'Stanowisko',date:moment(event.updated.date).format("DD-MM-YYYY HH:mm"),button:<Button onClick={() => this.showItemBar(event.id,event.title,event.description,event.surname,event.status,DateFormat(event.start,'start',event.allDay),DateFormat(event.end,'end',event.allDay),event.allDay)} activecolor={pageContext.sidebarColor} small>{pageContext.t('table.view')}</Button>})
    ));

    const roleAdmin = authuserinfo && authuserinfo.roles && authuserinfo.roles.filter(role=>role.name=='SuperAdmin').length;
    const roleCustomer = authuserinfo && authuserinfo.roles && authuserinfo.roles.filter(role=>role.name=='Customer').length ;
    const permission = authuserinfo && authuserinfo.workplace && authuserinfo.workplace.permissions  && authuserinfo.workplace.permissions.filter(perm=>perm.name=='AcceptableEvents').length;
 

    return (
      
    <UserPageTemplate >
      <StyledWrapper ref={div => this.ShowUserInfoWrap = div}>
      {roleAdmin || roleCustomer || permission ?
        <Card pagecolor={pageContext.pageColor}>
          <HeaderWrapper  activeColor={pageContext.sidebarColor}>
            <Heading>{pageContext.t('card.notifications')}</Heading>
                    
                
          </HeaderWrapper>
          <StyledInnerWrapper  pagecolor={pageContext.pageColor}>
          {!isLoadingContent ? 
           <DefaultTable  headers={headers} body={body}/>
           : <SmallSpinner activecolor={pageContext.sidebarColor} className="loader" />}
           
          </StyledInnerWrapper>
        </Card>
          : ''}
          </StyledWrapper>
    
        <NewItemBar  ref={this.setWrapperRef}  toasts={this.Toasts}  handleClose={this.closeItemBar} id={idItem} title={titleItem} content={contentItem} status={statusItem} surname={surnameItem} start={startItem} end={endItem} userid={useridItem} allday={alldayItem} isVisible={isNewItemBarVisible} />
    
     
    </UserPageTemplate> 
    )
  }

}

Notifications.propTypes = {
 
 
  pageColor: PropTypes.oneOf(['sun', 'moon']),
  eventsfromcalendar: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      status: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      
      start: PropTypes.string.isRequired,
      end: PropTypes.string.isRequired,
      allDay: PropTypes.number.isRequired,
      surname: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
      userid: PropTypes.number.isRequired,
    }),
  )

 
};

Notifications.defaultProps = {
  pageColor: 'sun',
 
  eventsfromcalendar:[],

};

const mapStateToProps = state => {
  const {message, authuserinfo,eventsfromcalendar, isLoadingContent} = state;
 
  return { message, authuserinfo,eventsfromcalendar, isLoadingContent };
};



export default withContext(connect(mapStateToProps,null)(Notifications));
import React, { useRef, useEffect, useState }  from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Input from 'components/atoms/Input/Input';
import Button from 'components/atoms/Button/Button';
import withContext from 'hoc/withContext';
import Heading from 'components/atoms/Heading/Heading';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import { connect } from 'react-redux';
import { addItemToCalendar as addItemAction, changeItemStatus as changeItemStatusAction } from 'actions';
import { Formik, Form, Field } from 'formik';
import {alerts} from 'helpers/alerts';


import moment from 'moment';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import pl from 'react-datepicker/node_modules/date-fns/locale/pl';
import en from 'react-datepicker/node_modules/date-fns/locale/en-GB';

registerLocale('pl', pl);
registerLocale('en', en);


const StyledWrapper = styled.div`
  border-left: 10px solid ${({  activecolor }) => activecolor};
  z-index: 9999;
  position: fixed;
  display: flex;
  padding: 100px 40px;
  flex-direction: column;
  right: 0;
  top: 0;
  height: 100vh;
  width: 480px;
  color:${({ theme, pagecolor }) => theme[pagecolor].text};

  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  transform: translate(${({ isVisible }) => (isVisible ? '0' : '100%')});
  transition: transform 0.25s ease-in-out;
  background-color:${({ theme, pagecolor }) => theme[pagecolor].background};

    @media (max-width: 768px) {
      padding-top:20px;
     width:380px;
     margin-top:50px;
   
    }
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
`;

const StyledTextArea = styled(Input)`
  margin: 30px 0 100px;
  border-radius: 20px;
  height: 30vh;

    @media (max-width: 768px) {
      margin-bottom:20px;
       height: 20vh;
     }
`;

const StyledSelect = styled.select`
   margin-top: 30px;
  
  
`;

const StyledInput = styled(Input)`
  margin-top: 30px;
`;

const StyledButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;



const StyledWraperButtons = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledButtonSmall = styled(Button)`
  margin:40px 0px 0px 0px;
  
`;

const StyledHead = styled.div`
  display:flex;
  flex-direction: row;
`;




const statusiconChecked='checked' ;
const statusiconQuestion='question' ;


const datepicker = (lang,active,type,datetime, allday, setStartDate,setEndDate) =>{
  if(active=='disabled')
  {
    var props={

      disabled:1
     }
  }
 

  return (
   
    allday 
    ? 
    <DatePicker
    selected={Date.parse(datetime)}
    onChange={date => type=='start' ? setStartDate(date) : setEndDate(date)}
    {...props}
    locale={lang.t('lang')}
    dateFormat="dd-MM-yyyy"
  />
    : 
    <DatePicker
    selected={Date.parse(datetime)}
    onChange={date => type=='start' ? setStartDate(date) : setEndDate(date)}
    showTimeSelect="true"
    timeFormat="HH:mm"
    timeIntervals={15}
    timeCaption={lang.t('time')}
    dateFormat="dd-MM-yyyy HH:mm"
    {...props}
    locale={lang.t('lang')}
  />
  )
}



  
const NewItemBar = ({alert, authuserinfo, message, setStartDate, setEndDate, toasts, changeTitle,changeContent, pageContext, isVisible,changeItemStatus, addItemToCalendar, handleRemove, handleClose,title,content,status,surname,start,end,allday,userid,events,id }) => {

  let endTime='';

  if(allday)
  {
    endTime=moment(end).add(1,"days").format(`${(allday) ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm'}`)
  }
  else{
    endTime=moment(end).format(`${(allday) ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm'}`)
  }

    function useOutsideAlerter(ref) {
        useEffect(() => {
         
          function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
              if(window.innerWidth > 768)
              {  
              handleClose();
              }
            }
          }
      
          // Bind the event listener
          document.addEventListener("mousedown", handleClickOutside);
          return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
          };
        }, [ref]);
      }

    const wrapperRef = useRef(null);
      useOutsideAlerter(wrapperRef);
    
    
      const roleAdmin = authuserinfo && authuserinfo.roles && authuserinfo.roles.filter(role=>role.name=='SuperAdmin').length;
      const roleCustomer = authuserinfo && authuserinfo.roles && authuserinfo.roles.filter(role=>role.name=='Customer').length ;
      const permission = authuserinfo && authuserinfo.workplace && authuserinfo.workplace.permissions  && authuserinfo.workplace.permissions.filter(perm=>perm.name=='AcceptableEvents').length;
   

      
    return (
    <StyledWrapper ref={wrapperRef} isVisible={isVisible} pagecolor={pageContext.pageColor} activecolor={pageContext.sidebarColor}>
    <StyledHead>
      <Heading > {pageContext.t('event.title')} - {title}</Heading>
      <span className={`statusicon ${status == 2 ? statusiconChecked : ''} ${status == 1 ? statusiconQuestion : ''}`}></span>
    </StyledHead>
    <Paragraph>{surname}</Paragraph>
      
    <Paragraph>
      <b>{pageContext.t('from')} </b>
    
      {datepicker(pageContext,(userid ==localStorage.getItem('userID') && status == 0) ? 'active' : "disabled","start",start,allday,setStartDate,setEndDate)}
      </Paragraph>
      
      <Paragraph>
      <b> {pageContext.t('to')} </b> 
      {datepicker(pageContext,(userid ==localStorage.getItem('userID') && status == 0) ? 'active' : "disabled","end",end,allday,setEndDate,setEndDate)}
      </Paragraph>
  

    <Formik
    enableReinitialize
      initialValues={{ title: title==null ? '' : title, content: content==null ? '' : content, start: moment(start).format(`${(allday) ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm'}`), end: endTime, allDay: allday}}
      
      
      onSubmit={values => {
       
        addItemToCalendar(values);

        toasts(values)

        handleClose();
       
        
      }}

      

    >
    
      {({ values, handleChange, handleBlur }) => (
         
        <StyledForm>
         {(userid ==localStorage.getItem('userID') && status == 0) ? 
          <StyledSelect  
          name="title" 
          onChange={(e) => {
            handleChange(e);
          
            changeTitle(e.target.value.split(','));
        }}
       
          onBlur={handleBlur}
         
          className="form-control form-control-lg" 
         
          
          >

          
          
          {events.filter(item => item.mark === values.title).map(item => (
            <option key={item.id} selected  value={[item.mark,item.borderColor]}>{item.name}</option>
          ))
          }

            
          {events.filter(event =>event.mark !== values.title).map(event => (

              
              <option key={event.id}  value={[event.mark,event.borderColor]}>{event.name}</option>
            ))
          }
          
        </StyledSelect>
        : ''}

          <StyledTextArea
            name="content"
            as="textarea"
            onChange={(e) => {
            handleChange(e);
        
            changeContent(e.target.value);
        }}
            onBlur={handleBlur}
           
            disabled={(userid ==localStorage.getItem('userID') && status == 0) ? '' : "true"} 
            value={values.content}
          />
           {alert && status==4 ? alerts(pageContext,'alerts.',message,'success') : ''}
        <StyledWraperButtons>
          <StyledButtons>

            { userid ==localStorage.getItem('userID') && status == 0 ?  
          

            <Button type="submit" activecolor={pageContext.sidebarColor}>
            {pageContext.t('button.send')}
            </Button>
            :
            ''
            }
          

            <Button type="button" onClick={ handleClose} secondary >
            {pageContext.t('button.cancel')}
            </Button>

          </StyledButtons>

          { userid == localStorage.getItem('userID') && status == 0 ? 
            <StyledButtonSmall type="button" onClick={ handleRemove}  remove >
            {pageContext.t('button.remove')}
            </StyledButtonSmall>
            : 
            ''
          }
          
          {  status == 1 && (roleAdmin || roleCustomer || permission)  ? 
          <>
          <StyledButtons>
            <StyledButtonSmall type="button" onClick={()=>changeItemStatus(id,2)} accept >
            {pageContext.t('button.accept')}
            </StyledButtonSmall>
            <StyledButtonSmall type="button" onClick={()=>changeItemStatus(id,3)} remove >
            {pageContext.t('button.reject')}
            </StyledButtonSmall>
          </StyledButtons>
          </>
          : 
          ''
          }
         

        </StyledWraperButtons>
       
       

        </StyledForm>
      )}
    </Formik>

 

  </StyledWrapper>

);
};

  NewItemBar.propTypes = {
  
    isVisible: PropTypes.bool,
    addItemToCalendar: PropTypes.func.isRequired,
    changeItemStatus: PropTypes.func.isRequired,
    pageContext: PropTypes.shape({
      sidebarColor:PropTypes.string,
      pageColor:PropTypes.string
    }),
    setStartDate: PropTypes.func.isRequired,
     setEndDate: PropTypes.func.isRequired,
     changeTitle: PropTypes.func.isRequired,
     handleRemove: PropTypes.func.isRequired, 
     handleClose: PropTypes.func.isRequired,
  
    events: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        mark: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
      
      }),
    )
  };
  
  NewItemBar.defaultProps = {
   
  
    events:[],
    isVisible: false,
    pageContext: PropTypes.shape({
      sidebarColor:'notes',
      pageColor:'sun'
    })
  };
  
  const mapStateToProps = state => {

    const { message,alert, authuserinfo} = state;
  
    return { message,alert, authuserinfo };
  };

  const mapDispatchToProps = dispatch => ({
    addItemToCalendar: (values) => dispatch(addItemAction(values)),
    changeItemStatus: (id,status) => dispatch(changeItemStatusAction(id,status)),
  });
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps,
  )(withContext(NewItemBar));
  
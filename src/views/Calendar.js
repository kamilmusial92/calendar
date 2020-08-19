import React, { Component }  from 'react'
import styled from 'styled-components';
import Heading from 'components/atoms/Heading/Heading';
import CalendarTemplate from 'templates/CalendarTemplate';
import NewItemBar from 'components/organisms/NewItemBar/NewItemBar';
import Toast from 'components/molecules/Toast/Toast';
import Spinner from 'components/atoms/Spinner/Spinner';
import HeaderWrapper from 'components/atoms/HeaderWrapper/HeaderWrapper';
import Card from 'components/molecules/Card/Card';
import ListMenu from 'components/atoms/ListMenu/ListMenu';

import PropTypes from 'prop-types';
import FullCalendar from '@fullcalendar/react'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from "@fullcalendar/timegrid";
import plLocale from '@fullcalendar/core/locales/pl';
import enLocale from '@fullcalendar/core/locales/en-gb';
import withContext from 'hoc/withContext';
import '../theme/main.scss' // webpack must be configured to do this

import { fetchEvents, fetchToasts, updateToastStatus as updateToastStatusAction } from 'actions';
import { connect } from 'react-redux';
import moment from 'moment';


const StyledCalendar=styled.div`
 
.fc-event,
.fc-event-dot {
  background-color:${({ theme, pagecolor }) => theme[pagecolor].backgroundElement};
  color:${({ theme, pagecolor }) => theme[pagecolor].text};
  border-color:${props =>props.bordercolor};
}
.fc-event.fc-selected2 {
  z-index: 9999 !important;
  /* overcomes inline z-index */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}
.fc-avatar{
  max-width:40px;
 max-height:40px;

  ${({ theme }) => theme.mq.mobile} {
   max-width:0px;
    max-height:0px;
  }
  
}
`;

const StyledGrip = styled.div`
   position:relative;
   display: flex;
  flex-direction: column;
  justify-content: flex-start;
  @media (max-width: 768px) {
    display:none;
    }
`;

const StyledToasts = styled.div`
  z-index: 10000;
  position: fixed;
  display: flex;
  flex-direction: column;
  width: 280px;

  left: 120px;
  top: 50px;
  
  transform: translate(${({ isVisible }) => (isVisible ? '0' : '-200%')});
  transition: transform 0.25s ease-in-out;
  
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



const StyledWraperList=styled.div`
  width:100%;
  margin-top:20px;
`;

const StyledEventList=styled.div`
  margin:5px;
  padding:10px;
  background-color:${({ theme, pagecolor }) => theme[pagecolor].backgroundElement};
  color:${({ theme, pagecolor }) => theme[pagecolor].text};
 
  border-color: ${props =>props.bordercolor} !important;
  border: 1px solid #ddd;
  border-left: 4px solid #ddd;
  overflow: hidden;
`;



 class Calendar extends Component {

 
  

  state = {
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
    langCalendar:'pl',
  

    calendarEvents: {},
    toasts: [],
    toastListVisible:false
  };



  componentDidUpdate(prevProps, prevState) {
   


    if (this.props.toasts !== prevProps.toasts) {
      this.AddtoToastFromEvents(this.props.toasts);
    }

    if (this.props.eventsfromcalendar !== prevProps.eventsfromcalendar) {
      
    

      this.setState({
        calendarEvents:[
          this.state.calendarEvents,...this.props.eventsfromcalendar.filter(element => element.status !== 3 )
        
        ]
      })
    }

    if(this.props.message!=prevProps.message && (this.props.message=='eventaccepted' ||  this.props.message=='eventrejected'))
    {
      this.setState({
        statusItem: 4
      });
    }
  }
  
  componentDidMount() {
   

    const { fetchEvents,fetchToasts } = this.props;
  
  

    fetchEvents();
   
  
    
    fetchToasts();

   let draggableEl = document.getElementById("external-events");
   if(draggableEl)
   {

   
    new Draggable(draggableEl, {
      itemSelector: ".fc-event",
      eventData: function(eventEl) {
       
        let mark = eventEl.getAttribute("data-mark");
        let id = eventEl.getAttribute("data");
        let BorderColor=eventEl.getAttribute("data-bordercolor");
        
        return {
          
          title: mark,
          
          id: id+'_' +Math.random().toString(36).substr(2, 9),
          borderColor:BorderColor,
          status: 0,
          userid: localStorage.getItem('userID'),
          avatar: localStorage.getItem('userAvatar'),
          surname: localStorage.getItem('userSurname'),
          
        };
      
      },

    
     
      
    });
  }



  }

  

  eventReceive = eventReceive => {



    this.setState({ 
         
      calendarEvents:[
        ...this.state.calendarEvents,
        {
        title:eventReceive.event.title,
        id:eventReceive.event.id,
        start:eventReceive.event.start,
        end:eventReceive.event._instance.range.end,
        allDay:eventReceive.event.allDay,
        status:0,
        userid: localStorage.getItem('userID'),
        avatar: localStorage.getItem('userAvatar'),
        surname: localStorage.getItem('userSurname'),
        borderColor:eventReceive.event.borderColor
        }
      ]
     
    });
   eventReceive.event.remove();
  }

  eventRender = ({eventRender,event,el}) => {

    const status = event.extendedProps.status;
    const start=moment(event.start).format("HH:mm");
    const end=moment(event.end).format("HH:mm");
    const mark=event.title;
    const surname=event.extendedProps.surname;
    const avatar=event.extendedProps.avatar;
    const fccontent="<div class='fc-content'><img class='fc-avatar' src='"+avatar+"'><div class='fc-content2'>";

    const fctime=(event.allDay==false) ? "<span class='fc-time'>"+start+" - "+end+"</span>" : "";

    const fctitle="<span class='fc-title'>"+mark+" <span class='fc-status "+ (status == 2 ? 'checked' : '') + (status == 1 ? 'question' : '') +"'></span></span><span class='fc-surname'>"+surname+"</span></div></div>";
    
    const fcresizable=(status==0) ? "<div class='fc-resizer fc-end-resizer'></div>" : "";
    
   
    el.innerHTML=fccontent+fctime+fctitle+fcresizable;

    

    if(status>0)
    {
      
      el.classList.remove('fc-resizable');
      el.classList.remove('fc-resizable');
      el.classList.remove('fc-draggable');
    } 
        
  
  }
  



  eventDrop = eventDrop => {
 
    const elementsIndex = this.state.calendarEvents.findIndex(element => element.id === eventDrop.event.id )
    let newArray = [...this.state.calendarEvents]

    newArray[elementsIndex] = {...newArray[elementsIndex], start: eventDrop.event.start, end: eventDrop.event.end, allDay:eventDrop.event.allDay}
  
    this.setState({
      calendarEvents: newArray,
      });

  }

  eventResize = eventResize => {
  
     const elementsIndex = this.state.calendarEvents.findIndex(element => element.id === eventResize.event.id )
     let newArray = [...this.state.calendarEvents]
 
     newArray[elementsIndex] = {...newArray[elementsIndex], start: eventResize.event.start, end: eventResize.event.end, allDay:eventResize.event.allDay}
   
     this.setState({
       calendarEvents: newArray,
       });
 
   }

  eventClick = eventClick => {
 
    let surname;
  if(!eventClick.event.extendedProps.surname) 
  {
    surname=eventClick.event.extendedProps.userSurname ;
  } 
  else{
    surname= eventClick.event.extendedProps.surname;
  }
  
  let endDate='';

  if(eventClick.event.allDay==1)
  {
    endDate=moment(eventClick.event._instance.range.end).subtract(1,'days').format('YYYY-MM-DD');
  }
  else{
    endDate=moment(eventClick.event._instance.range.end).subtract(2,'hours').format('YYYY-MM-DD HH:mm');
  }
  
    this.setState({ 
      idItem:eventClick.event.id,
      titleItem: eventClick.event.title ? eventClick.event.title : eventClick.event.extendedProps.event.mark,
      startItem: eventClick.event.start,
     // endItem: eventClick.event.end,
      endItem: endDate,
      contentItem:eventClick.event.extendedProps.description,
      surnameItem:surname,
      statusItem:eventClick.event.extendedProps.status,
      alldayItem:eventClick.event.allDay,
      useridItem:eventClick.event.extendedProps.userid,
      isNewItemBarVisible: true,
    
    });
   
  }

  dateClick = dateClick => {


    let endDate;
    let startDate;
    
    if(dateClick.allDay)
    {
      endDate=moment(dateClick.dateStr).format('MM/DD/YYYY');
      startDate=moment(dateClick.dateStr).format('MM/DD/YYYY');
    }
    else{
      endDate=moment(dateClick.dateStr).add(1,'hours').format('MM/DD/YYYY HH:mm');
      startDate=moment(dateClick.dateStr).format('MM/DD/YYYY HH:mm');
    }


    this.setState({
      //idItem:eventClick.event.id,
      titleItem: "UW", 
      alldayItem: dateClick.allDay,
      startItem: startDate,
      useridItem: localStorage.getItem('userID'),
      endItem: endDate,
      surnameItem: localStorage.getItem('userSurname'),
      statusItem: 0,
      isNewItemBarVisible: true,
    });

  }

  closeItemBar = () =>{

    this.setState({ 

      isNewItemBarVisible:false
      
    });
    
  }

  changeTitle = (data) =>{

    const elementsIndex = this.state.calendarEvents.findIndex(element => element.id === this.state.idItem )
    let newArray = [...this.state.calendarEvents]

    newArray[elementsIndex] = {...newArray[elementsIndex], title: data[0], borderColor:data[1]}
  
    this.setState({
      calendarEvents: newArray,
      titleItem:data[0]
      });
  
  
  }

  changeContent = (data) =>{

    this.setState({
      
      contentItem:data
      });
  
  }

  setStartDate = (date) =>{
  
    this.setState({
      ...this.state, 
      startItem:date
    })
  }

  setEndDate = (date) =>{
    this.setState({ 
      endItem:date
    })
  }

  Toasts = (data) =>{

    this.setState({ 
         
      toasts:[
        ...this.state.toasts,
        {
          id:Math.random().toString(36).substr(2, 9),
          content: data.content,
          title: data.title.split(',')[0],
          start: data.start,
          end: data.end,
          allDay: data.allDay,
          status: 'sent',
          avatar:localStorage.getItem('userAvatar')
        }
      ],
      toastListVisible: true,
      
     
    });
     setTimeout(() => this.setState({ toastListVisible: false}), 3000);
    
     setTimeout(() => this.setState({ toasts: [] }), 3500);
   
  }

  AddtoToastFromEvents = (data) => {
   const list = data.filter(element => element.status >= 2 && element.userid==localStorage.getItem('userID') )
   
       this.setState({ 
         
        toasts:[
          ...this.state.toasts,
          ...list

        ],
        toastListVisible: true, 
      });
      setTimeout(() => this.setState({ toastListVisible: false}), 3000);
     

      setTimeout(() => {
        if(this.state.toasts.length > 0)
        {
          this.props.updateToastStatus(this.state.toasts);
        }

        
        this.setState({ toasts: [] });
        
      }, 3500);

  }

  RemoveItem = () => {
 
    const newArray = this.state.calendarEvents.filter(element => element.id !== this.state.idItem )
  
    this.setState({
      calendarEvents: newArray,
    });

    this.closeItemBar();
  
  }

  


  languageSwitch(param) {
    switch(param) {
      case 'pl':
        return plLocale;

      case 'en':
        return enLocale;

      default:
        return plLocale;
    }
  }

 


    render() {
  

    const {isNewItemBarVisible,idItem,titleItem,contentItem,surnameItem,statusItem,startItem,endItem,alldayItem,useridItem,calendarEvents,toasts,toastListVisible} = this.state;
    const {isLoading,pageContext,events, message } = this.props;



    return (
    <CalendarTemplate>
 
       
          <StyledCalendar pagecolor={pageContext.pageColor} className="col-md-10">
          { !isLoading ? ( <FullCalendar
              defaultView="dayGridMonth"
              header={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
              }}
              
              rerenderDelay={10}
              height="auto"
              locale={this.languageSwitch(pageContext.t('lang'))}
              editable={true}
              droppable={true}
              selectable={window.screen.width >= 1024 ? false : true}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              ref={this.calendarComponentRef}
              weekends={this.state.calendarWeekends}
              events={calendarEvents }
              eventRender={this.eventRender}
              eventResize={this.eventResize}
              eventDrop={this.eventDrop}
              displayEventTime ="true"
              displayEventEnd="true"
              eventReceive={this.eventReceive}
              eventClick={this.eventClick}
              dateClick={window.screen.width >= 1024 ? '' : this.dateClick}
            />
            ):  <Spinner activecolor={pageContext.sidebarColor} className="loader" /> }
            </StyledCalendar>
       
          <div  className="col-md-2">
            
            <StyledGrip>
              
            <StyledMenu pagecolor={pageContext.pageColor} >
              <HeaderWrapper  activeColor={pageContext.sidebarColor}>
                <Heading>{pageContext.t('events')}</Heading>
              </HeaderWrapper>
              <ListMenu pagecolor={pageContext.pageColor}>
                <StyledWraperList id="external-events">
    
                      {events.map(event => (
                       
                        <StyledEventList pagecolor={pageContext.pageColor} bordercolor={event.borderColor} className="fc-event"  data-bordercolor={event.borderColor} data={event.id} data-mark={event.mark} key={event.id}>{event.name}</StyledEventList>
                      ))}
                </StyledWraperList>
                </ListMenu>
                </StyledMenu>

          
            </StyledGrip>
          </div>
          <StyledToasts isVisible={toastListVisible}>
          {toasts.map(toast => (
            <Toast title={toast.title} content={toast.content} start={toast.start} end={toast.end} allday={toast.allDay} status={toast.status} key={toast.id} avatar={toast.avatar}  />
          ))}
          </StyledToasts>
     
      <NewItemBar  ref={this.setWrapperRef} setEndDate={this.setEndDate} id={idItem} setStartDate={this.setStartDate} toasts={this.Toasts} changeTitle ={this.changeTitle} changeContent={this.changeContent} handleRemove={this.RemoveItem} handleClose={this.closeItemBar} title={titleItem} content={contentItem} status={statusItem} surname={surnameItem} start={startItem} end={endItem} userid={useridItem} allday={alldayItem} events={events} isVisible={isNewItemBarVisible} />
    </CalendarTemplate>
    )
  }

}

Calendar.propTypes = {
 
 
  pageColor: PropTypes.oneOf(['sun', 'moon']),
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      mark: PropTypes.string.isRequired,
      borderColor: PropTypes.string.isRequired,
    
    }),
  ),
  toast: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        status: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        start: PropTypes.string.isRequired,
        end: PropTypes.string.isRequired,
        allDay: PropTypes.number.isRequired,
      }),
  ),
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
),

    updateToastStatus: PropTypes.func.isRequired,
};

Calendar.defaultProps = {
  pageColor: 'sun',
  events:[],
  eventsfromcalendar:[],
  toasts:[]
};

const mapStateToProps = state => {

  const { message, events,eventsfromcalendar, toasts,isLoading} = state;
 
  return { message, events, eventsfromcalendar, toasts,isLoading };
};

const mapDispatchToProps = dispatch => ({
  fetchEvents: () => dispatch(fetchEvents()),
  fetchToasts: () => dispatch(fetchToasts()),
  updateToastStatus: (id) => dispatch(updateToastStatusAction(id))
});

export default withContext(connect(mapStateToProps,mapDispatchToProps)(Calendar));
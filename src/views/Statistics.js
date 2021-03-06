import React, { Component }  from 'react'
import styled from 'styled-components';

import UserPageTemplate from 'templates/UserPageTemplate';
import Heading from 'components/atoms/Heading/Heading';
import SmallSpinner from 'components/atoms/Spinner/SmallSpinner';

import StatisticsTable from 'components/molecules/Table/StatisticsTable';
import EventsTable from 'components/molecules/EventsTable/EventsTable';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import Card from 'components/molecules/Card/Card';
import HeaderWrapper from 'components/atoms/HeaderWrapper/HeaderWrapper';
import InnerWrapper from 'components/atoms/InnerWrapper/InnerWrapper';
import DropdownButton from 'components/atoms/DropdownButton/DropdownButton';
import PropTypes from 'prop-types';
import ListMenu from 'components/atoms/ListMenu/ListMenu';

import { StatusText, DateFormat} from 'helpers/events';
import withContext from 'hoc/withContext';
import {  fetchEvents } from 'actions';
import { connect } from 'react-redux';
import moment from 'moment';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import gsap from "gsap";

import "react-datepicker/dist/react-datepicker.css";
import pl from 'react-datepicker/node_modules/date-fns/locale/pl';
import en from 'react-datepicker/node_modules/date-fns/locale/en-GB';

registerLocale('pl', pl);
registerLocale('en', en);



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



const StyledSelectDates=styled.div`
  display:flex;
  padding:10px;
  flex-wrap:wrap;
`;

const StyledButtons=styled.div`
  display:flex;
  padding-top:5px;
`;
const StyledDropdownButton=styled.div`
  
     margin:6px 16px 6px 6px;
   
`;

const StyledDates=styled.div`
  display:flex;
  min-width: 100px;
 
`;

const StyledParagraph=styled(Paragraph)`
  margin-top:12px;

`;

class Statistics extends Component {

 
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
      filter:[],
      startItem:moment(new Date()).startOf('month'),
      endItem:moment(new Date()).endOf('month'),
    };

    filtercalendarEvents=()=>{
      const newEventsfromcalendar=[];
          
    
      this.props.eventsfromcalendar.filter(
    
        event=>
     
        (moment(DateFormat(event.start,'start',event.allDay))>=this.state.startItem && moment(DateFormat(event.start,'start',event.allDay))<=this.state.endItem) ||
        (moment(DateFormat(event.end,'end',event.allDay))>=this.state.startItem && moment(DateFormat(event.end,'end',event.allDay))<=this.state.endItem)
      
        ).map(event=>{
        let datestart=DateFormat(event.start,'start',event.allDay);
        let dateend=DateFormat(event.end,'end',event.allDay);
        const status=StatusText(event.status)
        newEventsfromcalendar.push({
          
        'date':datestart+' - '+dateend,
        'status':status ,
          
        'category':event.event_name
        })
      });
    
      this.setState({
        calendarEvents:[
          this.state.calendarEvents,
            ...newEventsfromcalendar
          ]
      });
    }

    componentDidUpdate(prevProps, prevState) {
    
      
      if (this.props.eventsfromcalendar !== prevProps.eventsfromcalendar) {
        this.filtercalendarEvents()
      
      }

      if (this.state.startItem !== prevState.startItem || this.state.endItem !== prevState.endItem ) {
      
        this.filtercalendarEvents()
      
      }

      if (this.props.events !== prevProps.events) 
      {
        const newEventsFilter=[];
        this.props.events.map(event=>{
        
          newEventsFilter.push(
          event.name
          )
        });

        this.setState({
          filter:[
            ...this.state.filter,
              ...newEventsFilter
            ]
        });
      }

    }
  
    componentDidMount() {
  
      const { fetchEvents } = this.props;
     
      fetchEvents();

      this.tlUserInfo = gsap.timeline({defaults:{ease:'power3.inOut'}})
    .set([this.ShowUserInfoWrap,this.FormUserInfoWrap, this.FormChangePasswordWrap], {autoAlpha: 0})
    .fromTo(this.ShowUserInfoWrap, { y: "-100"}, {duration: 1, y:"+=100", autoAlpha:1})


      
    }

    toggleUserInfo(){

      this.tlUserInfo.to(this.ShowUserInfoWrap, {duration: 0.4,  autoAlpha:0});
      this.tlUserInfoForm = gsap.timeline({defaults:{ease:'power3.inOut'}})
     
      .fromTo(this.FormUserInfoWrap, { y: "-100"}, {duration: 1, y:"+=100", autoAlpha:1})
    }

    setStartDate = (date) =>{
      this.setState({ 
        startItem:date
      })
    }
  
    setEndDate = (date) =>{
      this.setState({ 
        endItem:date
      })
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
  

    const {calendarEvents,filter,startItem,endItem} = this.state;
    const {isLoadingContent,pageContext,events } = this.props;

    const headers=[];
    headers.push(pageContext.t('statistics.date'),'Status',pageContext.t('statistics.category'))


    return (
    <UserPageTemplate >
      <StyledWrapper ref={div => this.ShowUserInfoWrap = div}>
      <Card pagecolor={pageContext.pageColor}>
          <HeaderWrapper  activeColor={pageContext.sidebarColor}>
            <Heading>{pageContext.t('card.statistics')}</Heading>
                    
                
          </HeaderWrapper>
          <StyledInnerWrapper  >
          {!isLoadingContent ? 
          <>
          <StyledSelectDates>
            <StyledDates >
        
          
            <DatePicker
            selected={Date.parse(moment(startItem))}
            onChange={date =>this.setStartDate(date)}
            
            locale={pageContext.t('lang')}
            dateFormat="dd-MM-yyyy"
            /> 
            <StyledParagraph>-</StyledParagraph>
            <DatePicker
            selected={Date.parse(moment(endItem))}
            onChange={date =>this.setEndDate(date)}
            
            locale={pageContext.t('lang')}
            dateFormat="dd-MM-yyyy"
            />
            
          </StyledDates>

            <StyledButtons>
              <StyledDropdownButton>
                <DropdownButton setStartDate={this.setStartDate} setEndDate={this.setEndDate} pagecolor={pageContext.pageColor}/>
              </StyledDropdownButton>

            </StyledButtons>

          </StyledSelectDates>

        <StatisticsTable filter={filter} headers={headers} body={calendarEvents} />
        </>
      : <SmallSpinner activecolor={pageContext.sidebarColor} className="loader" />}

      </StyledInnerWrapper>

      </Card>

      <StyledMenu pagecolor={pageContext.pageColor} >
              <HeaderWrapper  activeColor={pageContext.sidebarColor}>
                <Heading>Menu</Heading>
              </HeaderWrapper>

              <ListMenu pagecolor={pageContext.pageColor}>
                <EventsTable filter={filter} addToFilter={this.addToFilter} events={events}/>
              </ListMenu>
      </StyledMenu>
      
      </StyledWrapper>
    </UserPageTemplate>
    )
  }

}

Statistics.propTypes = {
 
 
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
  ),
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      mark: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    
    }),
  ),
 
};

Statistics.defaultProps = {
  pageColor: 'sun',
  events:[],
  eventsfromcalendar:[],

};

const mapStateToProps = state => {
  const { events,eventsfromcalendar, isLoadingContent} = state;
 
  return { events,eventsfromcalendar, isLoadingContent };
};

const mapDispatchToProps = dispatch => ({
  fetchEvents: () => dispatch(fetchEvents()),
 
});

export default withContext(connect(mapStateToProps,mapDispatchToProps)(Statistics));
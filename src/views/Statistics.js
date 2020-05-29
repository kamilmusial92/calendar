import React, { Component }  from 'react'
import styled from 'styled-components';

import UserPageTemplate from 'templates/UserPageTemplate';
import Table from 'components/molecules/Table/Table';
import EventsTable from 'components/molecules/EventsTable/EventsTable';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import Button from 'components/atoms/Button/Button';
import DropdownButton from 'components/atoms/DropdownButton/DropdownButton';
import PropTypes from 'prop-types';

import { StatusText, DateFormat} from 'helpers/events';
import withContext from 'hoc/withContext';
import { fetchEventsFromCalendar, fetchEvents, } from 'actions';
import { connect } from 'react-redux';
import moment from 'moment';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import pl from 'react-datepicker/node_modules/date-fns/locale/pl';
import en from 'react-datepicker/node_modules/date-fns/locale/en-GB';

registerLocale('pl', pl);
registerLocale('en', en);




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
          'id' :event.id,
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
  
      const { fetchEvents,fetchEventsFromCalendar } = this.props;
     
      fetchEvents();

      fetchEventsFromCalendar();


      
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
    const {pageContext,eventsfromcalendar,events } = this.props;
console.log(calendarEvents)
    return (
    <UserPageTemplate >
      <div className="col-md-10">
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

      <Table filter={filter} eventsfromcalendar={calendarEvents} />
      </div>
      <div className="col-md-2">
      <EventsTable filter={filter} addToFilter={this.addToFilter} events={events}/>
      </div>
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
  const { events,eventsfromcalendar} = state;
 
  return { events,eventsfromcalendar };
};

const mapDispatchToProps = dispatch => ({
  fetchEvents: () => dispatch(fetchEvents()),
  fetchEventsFromCalendar: () => dispatch(fetchEventsFromCalendar()),
});

export default withContext(connect(mapStateToProps,mapDispatchToProps)(Statistics));
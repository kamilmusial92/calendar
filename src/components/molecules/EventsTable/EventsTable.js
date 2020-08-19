import React, { Component }  from 'react'
import PropTypes from 'prop-types';
import Heading from 'components/atoms/Heading/Heading';
import styled, {css} from 'styled-components';

import withContext from 'hoc/withContext';

const StyledEventList=styled.div`
  margin:5px;
  padding:5px;
  background-color:${({ theme, pagecolor }) => theme[pagecolor].backgroundElement};
  color:${({ theme, pagecolor }) => theme[pagecolor].text};
 
  border-color: ${props =>props.bordercolor} !important;
  border: 1px solid #ddd;
  border-left: 4px solid #ddd;
  overflow: hidden;
  display:flex;
  font-size:1.2rem;

    label {
      padding:10px;
      width:100%;
      cursor:pointer;
    }
 
`;

const StyledEvents = styled.div`
  position:relative;
  padding: 25px 0;
  
  border-radius: 15px;
  margin-bottom:10px;
  margin-top:5px;
  border: 2px solid ${({ theme, activecolor }) => activecolor};
  background-color:${({ theme, pagecolor }) => theme[pagecolor].backgroundElement};
  box-shadow: 0 .25rem .75rem rgba(0,0,0,.1);
  
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const StyledWraperList=styled.div`
  width:100%;
  margin-top:20px;
  
`;

const StyledHeading = styled(Heading)`
 
width:100%;
white-space: nowrap;

overflow: hidden;
padding:10px;

  ::first-letter {
    text-transform: uppercase;
  }
`;

class EventsTable extends Component {


    render() {
        const {pageContext,events,addToFilter,filter } = this.props;


        return (
         
            <StyledWraperList id="external-events">

                  {events.map(event => (
                  
                    <StyledEventList  pagecolor={pageContext.pageColor} bordercolor={event.borderColor}   > <input id={event.id}  name="filter" checked={filter.filter(element=>element===event.name).length > 0 } type="checkbox" />
                    <label for={event.id} onClick={()=>addToFilter(event.name)}>{event.name}</label></StyledEventList>
                  ))}
            </StyledWraperList>
         
        )
    }
}

  EventsTable.propTypes = {
 
 
    pageColor: PropTypes.oneOf(['sun', 'moon']),
   
  };
  
  EventsTable.defaultProps = {
    pageColor: 'sun',
  
  };
  
  const mapStateToProps = state => {
  
  };
  
  const mapDispatchToProps = dispatch => ({
   
  });
  
  export default withContext(EventsTable);
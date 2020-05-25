import React, { Component }  from 'react'
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import withContext from 'hoc/withContext';
import moment from 'moment';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';


const StyledWraper=styled.div`
  padding:10px;
  font-size:1.5rem;
  col:nth-child(1), tr td:nth-child(1) 
        {
          width:50%;
        }
    @media (max-width: 768px) {
      col:nth-child(2), tr td:nth-child(2) 
        {
          display:none;
        }

      col:nth-child(1), tr td:nth-child(1) 
        {
          width:70%;
        }
        
    font-size:1rem;
    }

.react-bs-table-container{
  
  background-color:${({ theme, pagecolor }) => theme[pagecolor].backgroundElement};
  box-shadow: 0 .25rem .75rem rgba(0,0,0,.1);
  
}
.table{
    color:${({ theme, pagecolor }) => theme[pagecolor].text} !important;
}
.page-item.active .page-link {
    border-color: ${({ theme, activecolor }) => theme[activecolor]};
    background-color: ${({ theme, activecolor }) => theme[activecolor]};
}
.page-link{
    color:${({ theme, activecolor }) => theme[activecolor]};
}
#pageDropDown{
    background-color: ${({ theme, activecolor }) => theme[activecolor]};
    border-color: ${({ theme, activecolor }) => theme[activecolor]};
    font-size:1.5rem;
}
.dropdown-item a {
    color:${({ theme, activecolor }) => theme[activecolor]};
    display:block;
    text-decoration:none;
    font-size:1.5rem;
}

.search-input-table
{
border-radius: 0.5rem;

padding: 0.5rem 1.5rem;
font-size:1.5rem;
right:5px;
}
`;

const StyledTableHeaderColumn=styled(TableHeaderColumn)`
   @media (max-width: 768px) {
    display:none;
  
   }
   
`;

const DateTableHeaderColumn=styled(TableHeaderColumn)`
  
  @media (max-width: 768px) {
    
    width:70%;
   }
   
`;

class Table extends Component {

  

  

    render() {

        const {pageContext,eventsfromcalendar,filter } = this.props;
        

        const eventsfromcalendarfilter=eventsfromcalendar.filter(function(item) {
          return filter.includes(item.category); 
        })



        const options = {
            page: 2,  // which page you want to show as default
            defaultSortName: 'date', 
            defaultSortOrder: 'asc' ,
            sizePerPageList: [ {
              text: '10', value: 10
            },
            {
                text: '25', value: 25
            },
            {
                text: '50', value: 50
            } ], // you can change the dropdown list for size per page
            sizePerPage: 10,  // which size per page you want to locate as default
            pageStartIndex: 1, // where to start counting the pages
            paginationSize: 3,  // the pagination bar size.
          
            paginationShowsTotal: this.renderShowsTotal,  // Accept bool or function
            paginationPosition: 'top'  // default is bottom, top and both is all available
            // hideSizePerPage: true > You can hide the dropdown for sizePerPage
            // alwaysShowAllBtns: true // Always show next and previous button
            // withFirstAndLast: false > Hide the going to First and Last page button
          };

      

          function statusFormatter(cell, row) {
            return pageContext.t(`event.status.${cell}`)
          }

     

        return (
        <StyledWraper pagecolor={pageContext.pageColor} activecolor={pageContext.sidebarColor}>
        <BootstrapTable
         data={eventsfromcalendarfilter}
         search={ true }
          pagination
          options={ options }
          >
          <DateTableHeaderColumn dataField='date' isKey>{pageContext.t('statistics.date')}</DateTableHeaderColumn>
          <StyledTableHeaderColumn dataField='status'   dataFormat={ statusFormatter }
          >Status</StyledTableHeaderColumn>
          <TableHeaderColumn dataField='category'>{pageContext.t('statistics.category')}</TableHeaderColumn>
        </BootstrapTable>
        </StyledWraper>

        )
    }

}

Table.propTypes = {
 
 
    pageColor: PropTypes.oneOf(['sun', 'moon']),
   
  };
  
  Table.defaultProps = {
    pageColor: 'sun',
  
  };
  
  const mapStateToProps = state => {
  
  };
  
  const mapDispatchToProps = dispatch => ({
   
  });
  
  export default withContext(Table);
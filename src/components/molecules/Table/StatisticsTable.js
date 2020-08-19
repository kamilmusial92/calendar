import React, { Component }  from 'react'
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';

import {Table, Pagination, DropdownButton, Dropdown} from 'react-bootstrap';

import withContext from 'hoc/withContext';



const StyledWraper=styled.div`
  padding:10px;
  

    .btn-primary{
      background-color: ${({  activecolor }) => activecolor};
      border-color: ${({  activecolor }) => activecolor};
    }

    .page-item.active .page-link {
      border-color: ${({  activecolor }) => activecolor};
      background-color: ${({  activecolor }) => activecolor};
    }   
    .page-link{
      color:${({ activecolor }) => activecolor};
      background-color: ${({ theme, pagecolor }) => theme[pagecolor].backgroundElement};
      border-color:${({ activecolor }) => activecolor};
    }

    
    .dropdown-item{
    
      color:${({ theme, pagecolor }) => theme[pagecolor].text};
    }
    .dropdown-item:hover{
      background-color: ${({ theme, pagecolor }) => theme[pagecolor].background};
      color:${({ theme, pagecolor }) => theme[pagecolor].text};
    }
    .dropdown-menu.show{
      background-color: ${({ theme, pagecolor }) => theme[pagecolor].backgroundElement};
    }

`;



class TestTable extends Component {

  state = {
    filtersize: 10,
    activepage: 1

  }



  ChangeFilterSize = (event) => {
    
    this.setState({ 
  
      filtersize:event.target.textContent
      
    });
  }

 

 

  ChangeToPage = (countpage) => {
    console.log(countpage)
    this.setState({ 
  
      activepage:countpage
      
    });
  }

    render() {

      const {filtersize,activepage,} = this.state;
      const {pageContext,body,headers,filter} = this.props;
   
     const eventsfromcalendarfilter=body.filter(function(item) {
        return filter.includes(item.category); 
      })

      const length=body.length;

      const countpage=Math.ceil(length/filtersize);

      let frompage=0;

      const topage=filtersize*activepage;

      if(activepage>1)
      {
        frompage=topage-filtersize;
      }

      const pages = []

      for (let i=1;i<=countpage;i++) {
        pages.push( activepage==i ?<Pagination.Item active onClick={() => this.ChangeToPage(i)}>{i}</Pagination.Item> :<Pagination.Item  onClick={() => this.ChangeToPage(i)}>{i}</Pagination.Item>)
      }

     

      
        return (
        <StyledWraper pagecolor={pageContext.pageColor} activecolor={pageContext.sidebarColor} >
        <DropdownButton id="dropdown-basic-button" title={filtersize}>
          <Dropdown.Item as="button" onClick={this.ChangeFilterSize}>10</Dropdown.Item>
          <Dropdown.Item as="button" onClick={this.ChangeFilterSize}>25</Dropdown.Item>
          <Dropdown.Item as="button" onClick={this.ChangeFilterSize}>50</Dropdown.Item>
         
        </DropdownButton>

        <Table striped bordered hover variant={pageContext.pageColor=='moon' ? 'dark': ''}>
          <thead>
          {headers.map(header=>(
            <th>{header}</th>
          ))}
        
          </thead>
          <tbody>

          
            {eventsfromcalendarfilter.slice(frompage, topage).map(data=>(
                
            <tr>
            {Object.keys(data).map((item,index)=>(
              <>
              
                <td>{Object.keys(data)[index]=='status' ? pageContext.t(`event.status.${data[Object.keys(data)[index]]}`) : data[Object.keys(data)[index]]}</td>
              </>
            ))}
 
          
            </tr>
         
            ))}
            

          </tbody>
        
          </Table>
          <Pagination>
          <Pagination.First onClick={() => this.ChangeToPage(1)} />
          {activepage>1 ? <Pagination.Prev onClick={()=>this.ChangeToPage(activepage-1)}/> : ''}

         
          
             {pages}

          {activepage<countpage ? <Pagination.Next onClick={()=>this.ChangeToPage(activepage+1)}/> : ''}
          <Pagination.Last onClick={()=>this.ChangeToPage(countpage)}/>
        </Pagination>

        </StyledWraper>

        )
    }

}

TestTable.propTypes = {
 
 
    pageColor: PropTypes.oneOf(['sun', 'moon']),
   
  };
  
  TestTable.defaultProps = {
    pageColor: 'sun',
  
  };
  
  const mapStateToProps = state => {
  
  };
  
  const mapDispatchToProps = dispatch => ({
   
  });
  
  export default withContext(TestTable);
import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Sidebar from 'components/organisms/Sidebar/Sidebar';
import Spinner from 'components/atoms/Spinner/Spinner';

import { fetchEventsFromCalendar } from 'actions';


import { routes } from 'routes';
import { Redirect } from 'react-router-dom';
import withContext from 'hoc/withContext';
import { connect } from 'react-redux';
import {

  setLanguage,
 
} from 'react-switch-lang';

const StyledWrapper = styled.div`
  padding-left: 100px;
  min-height: 100vh;
  background-color:${({ theme, pagecolor }) => theme[pagecolor].background};
  color:${({ theme, pagecolor }) => theme[pagecolor].text};

  ${({ theme }) => theme.mq.tablet} {
    padding-left:0px;
   padding-top:60px;
    }
`;







class UserPageTemplate extends Component 
{

  
  
  handleSetLanguage = (key) => () => {
    setLanguage(key);
   
    localStorage.setItem('langType',key);
    
  };

  componentDidMount() {
  
    const { fetchEventsFromCalendar } = this.props;
   
    fetchEventsFromCalendar();

  }
  
  

  render() {

    if (!localStorage.getItem('userID')) {
     return <Redirect to={routes.login} />
    }

    
    const { isLoading, children,pageContext } = this.props;
  
    return (
    <StyledWrapper pagecolor={pageContext.pageColor}>

      <Sidebar handleSetPageColor={pageContext.handleSetPageColor} handleSetLanguage={this.handleSetLanguage} />
     
      <div className="container-fluid">
     
        <div className="row">
        {children}
        </div>
       
      </div> 
    
     
    
    </StyledWrapper>
    )

  }

}

UserPageTemplate.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]).isRequired,
 
  pageContext: PropTypes.shape({
    pageColor: PropTypes.oneOf(['moon', 'sun'])
  })
 
};



UserPageTemplate.defaultProps = {
  pageContext: PropTypes.shape({
    pageColor: 'sun'
  })
};

const mapStateToProps = state => {
  const {  isLoading} = state;
 
  return { isLoading };
};

const mapDispatchToProps = dispatch => ({
  
  fetchEventsFromCalendar: () => dispatch(fetchEventsFromCalendar()),
});
export default withContext(connect(mapStateToProps,mapDispatchToProps)(UserPageTemplate));

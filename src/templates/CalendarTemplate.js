import React, {Component} from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Sidebar from 'components/organisms/Sidebar/Sidebar';

import { routes } from 'routes';
import { Redirect } from 'react-router-dom';
import withContext from 'hoc/withContext';
import { connect } from 'react-redux';
import {

  setLanguage,
 
} from 'react-switch-lang';

import {  getAuthUserInfo as getAuthUserInfoAction } from 'actions/user';
import { fetchEventsFromCalendar } from 'actions';


const StyledWrapper = styled.div`
  padding-left: 100px;
  min-height: 100vh;
  background-color:${({ theme, pagecolor }) => theme[pagecolor].background};
  color:${({ theme, pagecolor }) => theme[pagecolor].text};

  @media (max-width: 768px) {
    padding-left:0px;
   padding-top:60px;
    }
`;





class UserPageTemplate extends Component 
{
  
  componentDidMount(){

    const {   getAuthUserInfo,  fetchEventsFromCalendar} = this.props;
  
    getAuthUserInfo();
    fetchEventsFromCalendar();

   
    
  }  
  
  
  handleSetLanguage = (key) => () => {
    setLanguage(key);
   
    localStorage.setItem('langType',key);
    
  };


  
  

  render() {

    if (!localStorage.getItem('userID')) {
     return <Redirect to={routes.login} />
    }

    
    const {  children,pageContext } = this.props;

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

  const {  authuserinfo} = state;
  
  return {  authuserinfo};
};

const mapDispatchToProps = dispatch => ({
  
  getAuthUserInfo: () => dispatch(getAuthUserInfoAction()),
  fetchEventsFromCalendar: () => dispatch(fetchEventsFromCalendar()),

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withContext(UserPageTemplate));

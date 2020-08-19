import React, { Component }  from 'react'
import styled from 'styled-components';
import Settingsbar from 'components/organisms/Settingsbar/Settingsbar';

import UserPageTemplate from 'templates/UserPageTemplate';
import PropTypes from 'prop-types';
import withContext from 'hoc/withContext';
import { Redirect, NavLink } from 'react-router-dom';

import {routes} from 'routes';
import { connect } from 'react-redux';

const StyledWrapper = styled.div`
  padding-left: 100px;
  padding-top:20px;
  max-height: 100vh;

    ${({ theme }) => theme.mq.tablet} {
        padding-left:10%;
        margin-top:40px;
      
    }
    ${({ theme }) => theme.mq.mobile} {
       
           padding-left:10%;
           padding-right:5%;
    }
`;

class Settings extends Component {

  

render() {
        
    const { pageContext,children, message } = this.props;
   
    
    if(message=='accessdenied')
    {
      return <Redirect to={routes.error404} />;
    }

    return (
  
    <UserPageTemplate >

    <Settingsbar  />
    <StyledWrapper>
    {children}
    </StyledWrapper>

        
                          
    </UserPageTemplate> 
    )
}

}

Settings.propTypes = {
 
 
    pageColor: PropTypes.oneOf(['sun', 'moon'])

}

Settings.defaultProps = {
    pageColor: 'sun',
   
  
  
};
const mapStateToProps = state => {

    const { message, } = state;
  
    return { message};
  };

 
export default connect(
    mapStateToProps,
    null,
  )(withContext(Settings));
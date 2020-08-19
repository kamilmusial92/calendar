import React, { Component }  from 'react'
import styled from 'styled-components';
import Settingsbar from 'components/organisms/Settingsbar/Settingsbar';

import UserPageTemplate from 'templates/UserPageTemplate';
import PropTypes from 'prop-types';
import withContext from 'hoc/withContext';


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
        
    const { pageContext,children } = this.props;
   
    return (
  
    <div>Page not found</div>
    )
}

}

Settings.propTypes = {
 
 
    pageColor: PropTypes.oneOf(['sun', 'moon'])

}

Settings.defaultProps = {
    pageColor: 'sun',
   
  
  
};


 
export default withContext(Settings);
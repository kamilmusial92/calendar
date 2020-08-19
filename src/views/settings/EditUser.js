import React, { Component }  from 'react'
import styled from 'styled-components';
import Settings from 'views/Settings';
import PropTypes from 'prop-types';
import withContext from 'hoc/withContext';
import EditUserData from 'components/organisms/EditUsers/EditUser';



class EditUser extends Component {



render() {
        
    const { pageContext,children } = this.props;
        
    return (
    <Settings>
       <EditUserData/>
    </Settings>
    )
}

}

EditUser.propTypes = {
 
 
    pageColor: PropTypes.oneOf(['sun', 'moon'])

}

EditUser.defaultProps = {
    pageColor: 'sun',
   
  
  
};

export default withContext(EditUser);
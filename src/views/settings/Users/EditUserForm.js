import React from 'react'
import Settings from 'views/Settings';

import EditUserForm from 'components/organisms/EditUsers/EditUserForm';



const EditUser = ({match}) => {



    return (
    <Settings>
       
      <EditUserForm id={match.params.id}/>
     

   
    </Settings>
    )


}



export default EditUser;
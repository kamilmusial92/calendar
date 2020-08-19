import React  from 'react'
import Settings from 'views/Settings';

import EditUserData from 'components/organisms/EditUsers/EditUser';



const EditUser = ({match}) =>  {





   
    return (
    <Settings>
       
      <EditUserData id={match.params.id}/>
     

   
    </Settings>
    )


}




export default EditUser;
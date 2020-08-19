import React  from 'react'

import Settings from 'views/Settings';
import AddUserForm from 'components/organisms/EditUsers/AddUserForm';



const AddUser = ({match}) => {

  
    return (
    <Settings>
       
      <AddUserForm id={match.params.id}/>
     

   
    </Settings>
    )


}



export default AddUser;
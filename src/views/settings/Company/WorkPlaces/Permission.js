import React  from 'react'
import Settings from 'views/Settings';

import EditPermissions from 'components/organisms/Company/WorkPlaces/EditPermissions';



const Permission =({match}) =>{
        
  
    
    return (
    <Settings>
       <EditPermissions workplaceid={match.params.workplaceid} id={match.params.id} />
    </Settings>
    )
 

}



export default Permission;
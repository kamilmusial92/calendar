import React  from 'react'
import Settings from 'views/Settings';

import WorkPlaceEdit from 'components/organisms/Company/WorkPlaces/EditForm';



const Edit =({match}) =>{
        
  
    
    return (
    <Settings>
       <WorkPlaceEdit  id={match.params.id} workplaceid={match.params.workplaceid}/>
    </Settings>
    )
 

}



export default Edit;
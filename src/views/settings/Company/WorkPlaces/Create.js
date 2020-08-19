import React  from 'react'
import Settings from 'views/Settings';

import WorkPlaceCreate from 'components/organisms/Company/WorkPlaces/CreateForm';



const Create =({match}) =>{
        
  
    
    return (
    <Settings>
       <WorkPlaceCreate  id={match.params.id} />
    </Settings>
    )
 

}



export default Create;
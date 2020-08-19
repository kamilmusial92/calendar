import React  from 'react'
import Settings from 'views/Settings';

import WorkPlacesList from 'components/organisms/Company/WorkPlacesList';



const WorkPlaces =({match}) =>{
        

    
    return (
    <Settings>
       <WorkPlacesList  id={match.params.id}/>
    </Settings>
    )


}



export default WorkPlaces;
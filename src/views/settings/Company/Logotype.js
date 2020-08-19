import React  from 'react'
import Settings from 'views/Settings';

import ChangeLogotype from 'components/organisms/Company/ChangeLogotype';



const Logotype =({match}) =>{
        
  
    
    return (
    <Settings>
       <ChangeLogotype  id={match.params.id}/>
    </Settings>
    )


}



export default Logotype;
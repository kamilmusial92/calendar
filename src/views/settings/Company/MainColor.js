import React  from 'react'
import Settings from 'views/Settings';

import ChangeMainColor from 'components/organisms/Company/ChangeMainColor';



const MainColor =({match}) =>{
        
  
    
    return (
    <Settings>
       <ChangeMainColor  id={match.params.id}/>
    </Settings>
    )


}



export default MainColor;
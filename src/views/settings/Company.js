import React  from 'react'

import Settings from 'views/Settings';
import CompanyInfo from 'components/organisms/Company/Info';



const Company = ({match}) => {

 


        


    return (
    
    <Settings>
  
      
        <CompanyInfo id={match.params.id}/>
      
    </Settings>
        
    )


}


export default Company;
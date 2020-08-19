import React from 'react';
import styled, {css} from 'styled-components';


const Wrapper = styled.div`
 
   padding:10px;
 
`;
const Checkbox = ({field,name, label, id, form, value, currentperm,addToFilter,filter})=>{

    return (
    <Wrapper>
    <input   type="checkbox"  name={field.name} value={id} 
       checked={filter.filter(element=>element===id).length > 0 }
     className="checkbox" id={id}/>
    <label onClick={()=>addToFilter(id)} for={id}>{label}</label>
    </Wrapper>
    )
}

   


export default Checkbox;



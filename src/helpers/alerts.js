import React from 'react';
import Alert from 'components/atoms/Alert/Alert';

export function alerts(pageContext,text,alerts,type){
    if(alerts instanceof Object) 
    {
    return Object.values(alerts).map(alert=>(
        <Alert>{pageContext.t(`${text}.${alert}`)}</Alert>
      ))
    }
    else if(alerts)
    {
       return  type=='success' ? <Alert success>{pageContext.t(`${text}.${alerts}`)}</Alert> : <Alert>{pageContext.t(`${text}.${alerts}`)}</Alert>
    
    }

  }
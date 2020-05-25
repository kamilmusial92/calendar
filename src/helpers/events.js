import moment from 'moment';

export function StatusText(status) {
    let statustext='';
    if(status==2)
    {
      statustext='accepted';
    }
    else if(status==3)
    {
      statustext='rejected';
    }
    else{
      statustext='sent';
    }
  return statustext;
}

export function DateFormat(date,type,allday) {
    let string='';

    if(allday==1 && type=='end')
    {
      date=moment(date).subtract(1,"days");
    }
    else{
      date=date;
    }

   
        if(allday==1)
        {
            string=moment(date).format("YYYY-MM-DD");
        }
      
        else{
            string=moment(date).format("YYYY-MM-DD HH:mm");
        }
    
   
  return string;
}


import React from 'react';

import styled, { css } from 'styled-components';


const Item = styled.div`
   margin:10px 0;

    a {
     height:40px;
    }

    ${({ theme }) => theme.mq.standard} {
      margin:10px;
     
    }
    ${({ theme }) => theme.mq.mobile} {
      margin:10px 5px;
    }

    
    
`;


export default Item;

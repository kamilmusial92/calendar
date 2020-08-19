import React from 'react';

import styled, { css } from 'styled-components';


const Card = styled.div`
   max-height: 100%;
  box-shadow: 0 10px 30px -10px hsla(0, 0%, 0%, 0.1);
  border-radius: 10px;

  max-width: 800px;
  overflow: hidden;
  background-color:${({ theme, pagecolor }) => theme[pagecolor].backgroundElement};

      ${({ theme }) => theme.mq.standard} {
      
      
      max-width:700px;
    }

    ${({ theme }) => theme.mq.tablet} {
      max-width:700px;
    }
    ${({ theme }) => theme.mq.mobile} {
      max-width:300px;
    }
 
`;


export default Card;

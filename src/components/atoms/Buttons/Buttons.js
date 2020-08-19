import React from 'react';

import styled, { css } from 'styled-components';


const Buttons = styled.div`
     display:flex;
   
   border-top:2px solid ${({ activeColor }) => activeColor};
   padding:10px;
   background-color:${({ theme, pagecolor }) => theme[pagecolor].backgroundElement};
   justify-content: space-between;
`;


export default Buttons;

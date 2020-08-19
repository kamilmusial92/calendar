import React from 'react';

import styled, { css } from 'styled-components';


const HeaderWrapper = styled.div`
    position: relative;
    display: flex;
  padding: 5px 15px;
  background-color: ${({ activeColor}) => activeColor};
  max-height:50px;
 justify-content:space-between;
`;


export default HeaderWrapper;

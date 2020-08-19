import React from 'react';

import styled, { css } from 'styled-components';


const ListMenu = styled.div`
    display: flex;
    flex-direction:column;
    list-style-type:none;
    padding:20px 20px 20px 20px;
    margin:0;
    width:100%;
    background-color:${({ theme, pagecolor }) => theme[pagecolor].backgroundElement};

    ${({ theme }) => theme.mq.standard} {
      flex-direction:row;
      padding: 0px;
     
    }
    ${({ theme }) => theme.mq.mobile} {
      flex-direction:column;
      align-items:center;
    }
`;


export default ListMenu;

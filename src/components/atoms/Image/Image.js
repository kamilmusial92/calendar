import styled, { css } from 'styled-components';

const Image = styled.div`
    background-image:url(${({img}) => img});
    background-repeat:no-repeat;
   
    background-size:100%;
    border:none;
    width:200px;
    max-width:250px;
    max-height:300px;
    height:200px;

    
`;

export default Image;

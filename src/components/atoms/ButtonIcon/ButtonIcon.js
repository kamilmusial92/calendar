import styled from 'styled-components';

const ButtonIcon=styled.button`
    display:block;
    width:${({small}) => small? '37px' : '67px'};
    height:${({small}) => small? '37px' : '67px'};
    border-radius:20px;
    background-image:url(${({icon}) => icon});
    background-repeat:no-repeat;
    background-position:50% 50%;
    background-size:60%;
    border:none;
    outline: none !important;
    outline-offset: none !important;
    background-color: ${({active}) => active ? 'white' : 'transparent'};

    &.active {
    background-color: white;
    }

    @media (max-width: 768px) {
      width:37px;
      height:37px;

    }
`;

export default ButtonIcon;
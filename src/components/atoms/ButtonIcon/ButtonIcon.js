import styled, {css} from 'styled-components';

const ButtonIcon=styled.button`
    display:block;
    width:67px;
    height:67px;
    border-radius:20px;
    background-image:url(${({icon}) => icon});
    background-repeat:no-repeat;
    background-position:50% 50%;
    background-size:60%;
    border:none;
    outline: none !important;
    outline-offset: none !important;
    background-color: ${({active}) => active ? 'white' : 'transparent'};
    transition: all .1s linear; 
    &.active {
    background-color: white;
    }
    :hover:not(.active){
      transform: scale(1.2);
    }

    ${({ small }) =>
     small &&
      css`
      width:37px;
      height:37px;
    `}

    ${({ medium }) =>
     medium &&
      css`
      width:57px;
      height:57px;
    &.active {
    background-color: ${({ activeColor }) => activeColor };
    }
    `}


    ${({ theme }) => theme.mq.tablet} {
      width:37px;
      height:37px;

    }
`;

export default ButtonIcon;
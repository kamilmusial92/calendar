import styled, { css } from 'styled-components';

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  text-decoration: none;
  padding: 0;
  background-color: ${({ activecolor}) => activecolor};
  width: 200px;
  height: 47px;
  border: none;
  border-radius: 50px;
  text-align: center;
  font-weight: 600;
  font-size: 16px;
  text-transform: uppercase;
  margin: 0 5px;
  ${({ secondary }) =>
    secondary &&
    css`
      background-color: hsl(0, 0%, 90%);
      width: 105px;
      height: 30px;
      font-size: 10px;
    `}

    ${({ remove }) =>
    remove &&
    css`
      background-color: hsl(0, 100%, 60%);
      width: 105px;
      height: 30px;
      font-size: 10px;
    `}

    ${({ accept }) =>
    accept &&
    css`
      background-color: hsl(131, 100%, 40%);
      width: 105px;
      height: 30px;
      font-size: 10px;
    `}

  

    ${({ small }) =>
    small &&
    css`
     width: 105px;
     height: 30px;
     font-size: 10px;
    `}

    ${({ medium }) =>
    medium &&
    css`
     min-width: 155px;
    
     height: 40px;
     font-size: 14px;
     padding:10px;

    
    `}

    ${({ back }) =>
    back &&
    css`
    background-color: hsl(0, 0%, 94%);

    
    `}
    
    ${({ mediumaccept }) =>
    mediumaccept &&
    css`
    background-color: hsl(131, 100%, 40%);

    
    `}
  
  

    ${({ theme }) => theme.mq.tablet} {
      max-width: 125px;
      font-size: ${({theme}) => theme.fontSize.xxs};
    }

    ${({ theme }) => theme.mq.mobile} {
            font-size: ${({theme}) => theme.fontSize.xxs};
            max-width: 105px;
            max-height: 40px;
            min-width:105px;
        }
`;

export default Button;

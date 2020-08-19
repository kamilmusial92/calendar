import styled, { css } from 'styled-components';

const Alert = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  overflow: hidden;
    word-wrap: break-word;
  padding: 10px;
  background-color: hsl(0, 100%, 60%);
  width: 100%;
  min-height: 30px;
  border: 1px solid red;
 
  font-weight: 600;
  font-size: 1.4rem;
  text-transform: uppercase;

  ${({ success }) =>
    success &&
    css`
      background-color: hsl(131, 100%, 40%);
      border: 1px solid hsl(131, 100%, 40%);
    `}

`;

export default Alert;

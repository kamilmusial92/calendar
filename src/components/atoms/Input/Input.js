import styled, {css} from 'styled-components';
import magnifierIcon from 'assets/icons/magnifier.svg';

const Input = styled.input`
  padding: 15px 30px;
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.regular};
  
  border: none;
  border-radius: 50px;
  outline: none;

  ::placeholder {
   
   
    color: ${({ theme }) => theme.grey300};
  }

  

  ${({card}) =>
    card && css`
    padding: 5px 10px;
    border:1px solid #ced4da;
    border-radius:.25rem;
    margin:5px 0 10px 0;
    `
  }
`;

export default Input;

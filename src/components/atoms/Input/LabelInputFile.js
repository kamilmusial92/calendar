import styled, {css} from 'styled-components';

const LabelInputFile = styled.label`
     border:1px solid #ced4da;
     padding: 5px 10px;
     display:flex;
     align-items:center;
     font-size: ${({ theme }) => theme.fontSize.xl};
  font-weight: ${({ theme }) => theme.regular};
     justify-content: center;
    border:2px dashed #ced4da;
    border-radius:.25rem;
    margin:5px 0 10px 0;
    height:200px;
    
    width:100%;

    ${({ theme }) => theme.mq.mobile} {
     height:150px;
     
    }
`;


export default LabelInputFile;
import styled, {css} from 'styled-components';

const Paragraph = styled.p`
    font-size: ${({theme}) => theme.fontSize.s};
    font-weight: ${({theme}) =>theme.regular}; 

    ${({ medium}) =>
    medium &&
    css`
    font-size: ${({theme}) => theme.fontSize.m};
    font-weight: ${({theme}) =>theme.bold}; 
    
        ${({ theme }) => theme.mq.mobile} {
            font-size: ${({theme}) => theme.fontSize.s};
        }
    `}
`;

export default Paragraph;
import styled, {css} from 'styled-components';

const Heading = styled.h1`
    font-size: ${({theme,big}) => big? theme.fontSize.xl : theme.fontSize.l};
    font-weight: ${({theme}) =>theme.bold}; 
    margin: 5px 0 0;
    ${({ theme }) => theme.mq.tablet} {
        font-size: ${({theme}) => theme.fontSize.s};
    }
    

    ${({ medium}) =>
    medium &&
    css`
    font-size: ${({theme}) => theme.fontSize.s};
    font-weight: ${({theme}) =>theme.light}; 

        ${({ theme }) => theme.mq.mobile} {
            font-size: ${({theme}) => theme.fontSize.xs};
        }
    `}

  
`;



export default Heading;
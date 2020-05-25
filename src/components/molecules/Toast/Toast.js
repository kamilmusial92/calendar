import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import Heading from 'components/atoms/Heading/Heading';
import CloseIcon from 'assets/icons/close.svg';
import { StatusText} from 'helpers/events';
import Moment from 'react-moment';
import withContext from 'hoc/withContext';


const HeaderWrapper = styled.div`

    display: flex;
    align-items: center;
    padding: .25rem .75rem;
   
    border-bottom: 1px solid rgba(0,0,0,.05);
    justify-content:flex-start;
`;

const ContentWrapper = styled.div `
   padding:10px;

`;

const StyledInfo = styled.div`
     display: flex;
     justify-content:space-between;

`;

const StyledContent = styled(Paragraph)`
   white-space: nowrap;

overflow: hidden;
`;


const DateInfo = styled(Paragraph)`
  
  width:180px;
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.xs};
  margin-right:20px;
`;

const Status = styled(Paragraph)`
   margin: 10px 0px 0 0px;
  width:80px;
   font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

const LastSeconds = styled(Paragraph)`
  
  width:120px;
 
  font-size: 1.0rem;
`;

const StyledHeading = styled(Heading)`
  margin: 5px 10px 0 0px;
  width: 120px;
  font-size:2.0rem;
`;

const StyledAvatar = styled.img`
  width: 28px;
  height: 26px;
  border-radius: 5px;

  margin-right:5px;
  
`;

const StyledButton=styled.span`
  
  margin: 15px 10px 5px 5px;
  background-image: url(${CloseIcon});
  
  background-repeat: no-repeat;
  width:12px;
  height:12px;
 
  ${({ pagecolor }) => (pagecolor=='moon' ?   
  css`
       filter:invert(100%) sepia(0%) saturate(1%) hue-rotate(179deg) brightness(106%) contrast(101%);
    `
     : '')}

  cursor:pointer;
`;

const StyledCard = styled.div `

  display: flex;
  flex-direction: column;
  width:100%;
  box-shadow: 0 .25rem .75rem rgba(0,0,0,.1);
  border: 2px solid rgba(0,0,0,.1);
  border-radius: 10px;
  margin-bottom:5px;
  color:${({ theme, pagecolor }) => theme[pagecolor].text};
  background-color:${({ theme, pagecolor }) => theme[pagecolor].backgroundElement};

 
`;






const Toast = ({  pageContext, title, content, start, end, allday,status }) => {

 

    return (
       

        <StyledCard pagecolor={pageContext.pageColor}>
            <HeaderWrapper>
                <StyledAvatar src={`http://localhost:8000/storage/avatars/avatar.png`} />
               
                <StyledHeading>{title}</StyledHeading>
               
                <Status>{pageContext.t(`event.status.${StatusText(status)}`)}</Status>
                
                
            </HeaderWrapper>

            <ContentWrapper>

              <StyledInfo>
                <DateInfo> 
                  <Moment format={`${(allday) ? 'DD-MM-YYYY' : 'HH:mm DD-MM-YYYY'}`}>
                  {start}
                  </Moment>
                  <b> - </b> 
                  <Moment subtract={{ days: allday==0 ? 0 : 1}} format={`${(allday) ? 'DD-MM-YYYY' : 'HH:mm DD-MM-YYYY'}`}>  
                    {end}
                  </Moment>
              </DateInfo>
                <LastSeconds>{pageContext.t('secondago')}</LastSeconds>
              </StyledInfo>

              <StyledContent>{content}</StyledContent>

            </ContentWrapper>
        </StyledCard>

       
    );
};

Toast.propTypes = {
  pageContext: PropTypes.shape({
    pageColor:PropTypes.string
  })

};

Toast.defaultProps = {
  pageContext: PropTypes.shape({
    pageColor:'sun'
  })
};

export default withContext(Toast);
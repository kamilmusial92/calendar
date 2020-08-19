import React from 'react';
import styled from 'styled-components';
import Heading from 'components/atoms/Heading/Heading';
import logoIcon from 'assets/icons/interactivelogo.svg';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import polandIcon from 'assets/icons/poland.svg';
import englandIcon from 'assets/icons/uk.svg';


import {

  setLanguage,
 
} from 'react-switch-lang';

const StyledWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${({ theme }) => theme.iv};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledLogo = styled.img`
  width: 200px;
  height: auto;
  margin-bottom:20px;
`;

const StyledLangList = styled.ul`
 
 
  padding: 0;
  list-style: none;
  display: flex;
  ${({ theme }) => theme.mq.tablet} {
      display: flex;
      
    }
`;

const StyledLangButton=styled(ButtonIcon)`

  width:37px;
  height:37px;

`;

const StyledAuthCard = styled.div`
  width: 400px;
  padding:10px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 10px 20px -10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;



const handleSetLanguage = (key) => () => {
  setLanguage(key);
 
  localStorage.setItem('langType',key);
  
};



const AuthTemplate = ({ children }) => (

  
  <StyledWrapper>
    <StyledLogo src={logoIcon} alt="" />

    <StyledLangList>
        <li>
        <StyledLangButton icon={englandIcon} active={(localStorage.getItem('langType')) == 'en' ? 'active' : ''} onClick={handleSetLanguage('en')} />
        </li>
        <li>
        <StyledLangButton icon={polandIcon} active={(localStorage.getItem('langType')) == 'pl' ? 'active' : ''} onClick={handleSetLanguage('pl')} />
        </li>
      </StyledLangList>
    
    <StyledAuthCard>{children}</StyledAuthCard>
  </StyledWrapper>
);

export default AuthTemplate;

import React from 'react';



import Card from 'components/molecules/Card/Card';
import HeaderWrapper from 'components/atoms/HeaderWrapper/HeaderWrapper';
import InnerWrapper from 'components/atoms/InnerWrapper/InnerWrapper';
import Heading from 'components/atoms/Heading/Heading';
import Buttons from 'components/atoms/Buttons/Buttons';
import Button from 'components/atoms/Button/Button';

import styled, { css } from 'styled-components';
import withContext from 'hoc/withContext';
import {alerts} from 'helpers/alerts';


const Background = styled.div`

    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000;
    width: 100vw;
    height: 100vh;
    background-color: #000;
    opacity:.5;
    display: ${({isVisible}) => isVisible ? 'block': 'none'};
`;

const StyledCard = styled(Card)`
   opacity:1;
   z-index: 10001;
   position: absolute;
   
    top:40%;
   left: 50%;
   transform: translate(-50%, -50%);
   display: ${({isVisible}) => isVisible ? 'block': 'none'};
`;

const Modal = ({text, message, error, isVisible,pageContext,hideModal, acceptedAction }) =>{

    return (
        <>
        <Background isVisible={isVisible}/>

        <StyledCard pagecolor={pageContext.pageColor} isVisible={isVisible}>
            <HeaderWrapper  activeColor={pageContext.sidebarColor}>
                <Heading>Alert</Heading>
            </HeaderWrapper>

            <InnerWrapper  pagecolor={pageContext.pageColor}>
            {error ? alerts(pageContext,'alerts.',message,'') : ''}
            {text}
            </InnerWrapper>
            <Buttons pagecolor={pageContext.pageColor} activeColor={pageContext.sidebarColor}>
              
                <Button onClick={hideModal} type="button"
                 medium back >
                {pageContext.t('button.cancel')}
                </Button>

                <Button onClick={acceptedAction} type="button"
                 medium mediumaccept >
                {pageContext.t('button.accept')}
                </Button>

            </Buttons>

        </StyledCard>
        </>
    );
}


export default  withContext(Modal);

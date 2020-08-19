import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import Heading from 'components/atoms/Heading/Heading';
import Button from 'components/atoms/Button/Button';
import LinkIcon from 'assets/icons/link.svg';
import { connect } from 'react-redux';
import { removeItem as removeItemAction } from 'actions';
import { editItem as editItemAction } from 'actions';
import withContext from 'hoc/withContext';

const StyledWrapper = styled.div`
  min-height: 50vh;
  box-shadow: 0 10px 30px -10px hsla(0, 0%, 0%, 0.1);
  border-radius: 10px;
 
  position: relative;
 
  min-width: 50vw;
`;

const HeaderWrapper = styled.div`
  position: relative;
  padding: 5px 10px;
  background-color: ${({ activeColor, theme }) => (activeColor ? theme[activeColor] : 'white')};
  height:5vh;
  
 
`;

const InnerWrapper= styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 45vh;
    padding: 5px 10px;
    background-color:${({ theme, pagecolor }) => theme[pagecolor].backgroundElement};
`;

const DateInfo = styled(Paragraph)`
  margin: 0 0 5px;
  font-weight: ${({ theme }) => theme.bold};
  font-size: ${({ theme }) => theme.fontSize.xs};
`;

const StyledHeading = styled(Heading)`
  margin: 5px 0 0;
`;

const StyledButtons = styled.div`
    display:flex;
    margin-top:10px;
    border-top:1px solid ${({ activeColor, theme }) => (activeColor ? theme[activeColor] : 'white')};
`;






class MyCard extends Component {
  state = {
    redirect: false,
  
  };
 
  handleCardClick = () => this.setState({ redirect: true });



  render() {
    const { id, pageContext } = this.props;
    const { redirect} = this.state;
    

    if (redirect) {
      return <Redirect to={`${pageContext}/details/${id}`} />;
    }

    return (
      <StyledWrapper >
        <HeaderWrapper onClick={this.handleCardClick} activeColor={pageContext.sidebarColor}>
          <StyledHeading>aaa</StyledHeading>
          
         
        </HeaderWrapper>
        <InnerWrapper  pagecolor={pageContext.pageColor}>
          <Paragraph>content</Paragraph>
          <Paragraph>content</Paragraph><Paragraph>content</Paragraph><Paragraph>content</Paragraph> <Paragraph>content</Paragraph> <Paragraph>content</Paragraph>  <Paragraph>content</Paragraph> <Paragraph>content</Paragraph> <Paragraph>content</Paragraph> <Paragraph>content</Paragraph> <Paragraph>content</Paragraph> <Paragraph>content</Paragraph> <Paragraph>conqwtent</Paragraph> <Paragraph>content232</Paragraph>

        <StyledButtons activeColor={pageContext.sidebarColor}>
            <Button     activeColor={pageContext.sidebarColor} >
            Edit
            </Button>
        </StyledButtons>
        </InnerWrapper>
      </StyledWrapper>
    );
  }
}

MyCard.propTypes = {
 
 
    pageColor: PropTypes.oneOf(['sun', 'moon'])

}

MyCard.defaultProps = {
    pageColor: 'sun',
   
  
  
};


export default withContext(MyCard);

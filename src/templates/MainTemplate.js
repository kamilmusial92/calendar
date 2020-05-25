import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'theme/GlobalStyle';
import PageContext from 'context';
import { theme } from 'theme/mainTheme';
import {
  setTranslations,
  setDefaultLanguage,
  translate,
} from 'react-switch-lang';
import en from 'lang/en.json';
import pl from 'lang/pl.json';



setTranslations({ en, pl });
setDefaultLanguage(localStorage.getItem('langType') ? localStorage.getItem('langType') : 'pl');

class MainTemplate extends Component {
  state = {
    pageColor: localStorage.getItem('pageColor') ? localStorage.getItem('pageColor') : 'sun',
    sidebarColor: 'iv'
  };


  componentDidMount() {
    this.setCurrentPage();
  }

  componentDidUpdate(prevProps, prevState) {
    this.setCurrentPage(prevState);

  }

  setCurrentPage = (prevState = '') => {
    const pageTypes = ['twitters', 'articles', 'notes'];
    const {
      location: { pathname },
    } = this.props;

    const [currentPage] = pageTypes.filter(page => pathname.includes(page));

    if (prevState.pageType !== currentPage) {
      this.setState({ pageType: currentPage });
    }
  };

  
  handleSetPageColor = (type)  => () => {
    
    const currentpageColor=this.state.pageColor;
   
    if(type=='change')
    {
      if(currentpageColor=='sun')
      {
        localStorage.setItem('pageColor','moon');
 
        this.setState({ pageColor: 'moon' });
      }
      else{
        localStorage.setItem('pageColor','sun');
 
        this.setState({ pageColor: 'sun' });
      }
    }
    else{

      localStorage.setItem('pageColor',type);
  
      this.setState({ pageColor: type });
    }
  
  }

 

  render() {
    const { children,t } = this.props;
    const { pageColor,sidebarColor } = this.state;
    const handleSetPageColor=this.handleSetPageColor;
  
    
    return (
      <div>
        <PageContext.Provider value={{t,pageColor,sidebarColor,handleSetPageColor}} >
          <GlobalStyle />
          <ThemeProvider  theme={theme}>{children}</ThemeProvider>
        </PageContext.Provider>
      </div>
    );
  }
}

MainTemplate.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  t: PropTypes.func.isRequired,
};

export default translate(withRouter(MainTemplate));

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
import { connect } from 'react-redux';
import {  getAuthUserInfo as getAuthUserInfoAction } from 'actions/user';


setTranslations({ en, pl });
setDefaultLanguage(localStorage.getItem('langType') ? localStorage.getItem('langType') : 'pl');

class MainTemplate extends Component {
  state = {
    pageColor: localStorage.getItem('pageColor') ? localStorage.getItem('pageColor') : 'sun',
    //sidebarColor: '#730FFF'
    
  };

 
  componentDidMount(){

    const {   getAuthUserInfo} = this.props;
  
    getAuthUserInfo();


   
    
  }  


  /*handleChangeSidebarColor = (color) => {
    this.setState({ sidebarColor: color.hex });
  };*/

  
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
    const { children,t, authuserinfo } = this.props;
    const { pageColor, } = this.state;
    const handleSetPageColor=this.handleSetPageColor;
   
    const sidebarColor=authuserinfo && authuserinfo.company && authuserinfo.company.sidebarcolor;

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


const mapStateToProps = state => {

  const {  authuserinfo} = state;
  
  return {  authuserinfo};
};

const mapDispatchToProps = dispatch => ({
  
  getAuthUserInfo: () => dispatch(getAuthUserInfoAction()),
 
});

export default translate(connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(MainTemplate)));

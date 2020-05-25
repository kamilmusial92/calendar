import React, { Component } from 'react';
import styled, {css} from 'styled-components';
import { Form } from 'react-bootstrap';



class Switch extends Component {

    state = {
        isChecked: true,
      };

      componentDidMount() {
        this.defaultSettings();
      }

      componentDidUpdate(prevProps) {
     
        if(prevProps.currentPageColor!=this.props.currentPageColor)
        {
            this.defaultSettings();
        }


      }
    

    defaultSettings= () => {
        if(this.props.currentPageColor==='sun')
        {
            this.setState({
                isChecked: false,
              });

            
        }
        else{
            this.setState({
                isChecked: true,
              });
        }
    }


      

    render() {
        
     const {handleSetPageColor} = this.props;

        return (
           
            <Form>
            <Form.Check 
              type="switch"
              id="custom-switch"
              label=""
              checked={this.state.isChecked}
              onChange={handleSetPageColor('change')}
            />
           
          </Form>
           

           
        );
    }
}

export default Switch;

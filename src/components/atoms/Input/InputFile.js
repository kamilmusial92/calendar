import React, {Component} from 'react';
import styled, {css} from 'styled-components';
import LabelInputFile from 'components/atoms/Input/LabelInputFile';

const StyledInputFile = styled.input`
  
display: none;
`;

class InputFile extends Component {

    render() {
        const { field,form, title } = this.props;
        
    return (
        <LabelInputFile>
        <StyledInputFile
        name={field.name}
        type="file"
        encType="multipart/form-data"
        onChange={e => form.setFieldValue(field.name, e.target.files[0])}
      />
      {title}

      </LabelInputFile>
    )
    }
}


export default InputFile;
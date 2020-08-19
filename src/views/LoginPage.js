import React from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import ErrorMessage from 'components/atoms/ErrorMessage/ErrorMessage';
import AuthTemplate from 'templates/AuthTemplate';
import Heading from 'components/atoms/Heading/Heading';
import Input from 'components/atoms/Input/Input';
import {alerts} from 'helpers/alerts';



import Paragraph from 'components/atoms/Paragraph/Paragraph';

import Button from 'components/atoms/Button/Button';
import Alert from 'components/atoms/Alert/Alert';
import { routes } from 'routes';
import { connect } from 'react-redux';
import { authenticate as authenticateAction } from 'actions';
import { Redirect, NavLink } from 'react-router-dom';
import * as Yup from 'yup'; 
import withContext from 'hoc/withContext';


const StyledForm = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StyledInput = styled(Input)`
  margin: 30px 0 0px 0;
  height: 40px;
  width: 300px;
`;

const StyledParagraph= styled(Paragraph)`
  margin-top:10px;
`;

const Styledbutton = styled(Button)`
  margin-top:30px;
  background-color: ${({ theme }) => theme.iv};
`;


const SignupSchema = Yup.object().shape({
  username: Yup.string()
    
    .email('Invalid email')
    .required('Required'),

  password: Yup.string()
    .required('Required')
    .min(6,'Too short'),
});


  const LoginPage = ({alert, message,userID, authenticate, pageContext}) => (




  <AuthTemplate>
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={SignupSchema}
      onSubmit={({ username, password }) => {
        authenticate(username, password);
        
      }}
     

    >
      {({ handleChange, handleBlur, values,errors, touched }) => {
       
        if (localStorage.getItem('userID')) {
          return <Redirect to={routes.home} />;
        }
        return (
          <>
        
          {alert ? alerts(pageContext,'card.registersuccess',message,'success') : ''}
            
          { message && !alert ? ( 
            <Alert>{message}</Alert>)
          : ''}
            
            <Heading>{pageContext.t(`card.signin`)}</Heading>
            <StyledForm>
           
              <StyledInput
              
                type="text"
                name="username"
                placeholder="E-mail"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
                className={`form-control ${
                  errors.username && touched.username ? "is-invalid" : ""
                }`}
              />
              {errors.username && touched.username ? (
                           <ErrorMessage>{errors.username}</ErrorMessage>
                         ) : null}
             

              <StyledInput
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
                className={`form-control ${
                  errors.password && touched.password ? "is-invalid" : ""
                }`}
              />
              {errors.password && touched.password ? (
                <ErrorMessage>{errors.password}</ErrorMessage>
              ) : null}
              
             <Styledbutton activecolor="iv" type="submit">
             {pageContext.t(`button.signin`)}
              </Styledbutton>
              <StyledParagraph>{pageContext.t(`input.or`)}</StyledParagraph>
              <Button as={NavLink} back to={routes.register} type="button" >
              {pageContext.t(`button.register`)}
              </Button>
            </StyledForm>
          
          </>
        );
      }}
    </Formik>
  </AuthTemplate>
);



const mapStateToProps = ({ userID = null,message ,alert}) => ({
  userID,message,alert
});

const mapDispatchToProps = dispatch => ({
  authenticate: (username, password) => dispatch(authenticateAction(username, password)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withContext(LoginPage));

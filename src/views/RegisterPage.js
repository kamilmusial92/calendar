import React from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import ErrorMessage from 'components/atoms/ErrorMessage/ErrorMessage';
import AuthTemplate from 'templates/AuthTemplate';
import Heading from 'components/atoms/Heading/Heading';
import Input from 'components/atoms/Input/Input';
import Button from 'components/atoms/Button/Button';
import Paragraph from 'components/atoms/Paragraph/Paragraph';

import Alert from 'components/atoms/Alert/Alert';
import { routes } from 'routes';
import { connect } from 'react-redux';
import {  register as registerAction} from 'actions';
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

const Styledbutton = styled(Button)`
  margin-top:30px;
  background-color: ${({ theme }) => theme.iv};

`;



function equalTo(ref, msg) {
  return Yup.mixed().test({
    name: 'equalTo',
    exclusive: false,
    message: msg || '${path} must be the same as ${reference}',
    params: {
      reference: ref.path,
    },
    test: function(value) {
      return value === this.resolve(ref);
    },
  });
}
Yup.addMethod(Yup.string, 'equalTo', equalTo);


const SignupSchema = Yup.object().shape({
  email: Yup.string()
    
    .email('invalidemail')
    .required('Required'),

  surname: Yup.string()
    
    .required('required'),

  company: Yup.string()
    
    .required('required'),

  password: Yup.string()
    .min(6, 'tooshort')
    .required('required'),

 
    
  confirmpassword: Yup.string().equalTo(Yup.ref('password'), 'passwordsdonotmatchregister').required('Required'),
});


  const RegisterPage = ({register,message, pageContext}) => (




  <AuthTemplate>
    <Formik
      initialValues={{ surname:'',email:'',company:'',password:'',confirmpassword:'' }}
      validationSchema={SignupSchema}
      onSubmit={values => {
        register(values);
        

      }}
     

    >
      {({ handleChange, handleBlur, values,errors, touched }) => {
       
       if(message=='registersuccess')
       {
        return <Redirect to={routes.login} />;
       }

        
        return (
          <>
            
          { message ? ( 
            <Alert>{message}</Alert>)
          : ''}
            <Paragraph>{pageContext.t(`card.arleadyregistered`)} <NavLink to={routes.login}>{pageContext.t(`card.clickhere`)}</NavLink> </Paragraph>
            <Heading>{pageContext.t(`card.signup`)}</Heading>
            <StyledForm>

            <StyledInput
              
              type="text"
              name="surname"
              placeholder={pageContext.t(`input.fullname`)}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
              className={`form-control ${
                errors.surname && touched.surname ? "is-invalid" : ""
              }`}
            />
            {errors.surname && touched.surname ? (
                         <ErrorMessage>{pageContext.t(`card.validate.${errors.surname}`)}</ErrorMessage>
             ) : null}

             <StyledInput
               
              type="text"
              name="company"
              placeholder={pageContext.t(`input.company`)}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.title}
              className={`form-control ${
                errors.company && touched.company ? "is-invalid" : ""
              }`}
            />
            {errors.company && touched.company ? (
                         <ErrorMessage>{pageContext.t(`card.validate.${errors.company}`)}</ErrorMessage>
             ) : null}
           
              <StyledInput
              
                type="text"
                name="email"
                placeholder="E-mail"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
                className={`form-control ${
                  errors.email && touched.email ? "is-invalid" : ""
                }`}
              />
              {errors.email && touched.email ? (
                           <ErrorMessage>{pageContext.t(`card.validate.${errors.email}`)}</ErrorMessage>
                         ) : null}
             

              <StyledInput
                type="password"
                name="password"
                placeholder={pageContext.t(`input.password`)}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
                className={`form-control ${
                  errors.password && touched.password ? "is-invalid" : ""
                }`}
              />
              {errors.password && touched.password ? (
                <ErrorMessage>{pageContext.t(`card.validate.${errors.password}`)}</ErrorMessage>
              ) : null}

              <StyledInput
                type="password"
                name="confirmpassword"
                placeholder={pageContext.t(`input.confirmpassword`)}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
                className={`form-control ${
                  errors.confirmpassword && touched.confirmpassword ? "is-invalid" : ""
                }`}
              />
              {errors.confirmpassword && touched.confirmpassword ? (
                <ErrorMessage>{pageContext.t(`card.validate.${errors.confirmpassword}`)}</ErrorMessage>
              ) : null}
              
             <Styledbutton activecolor="iv" type="submit">
             {pageContext.t(`button.register`)}
              </Styledbutton>
            </StyledForm>
          
          </>
        );
      }}
    </Formik>
  </AuthTemplate>
);



const mapStateToProps = ({ userID = null,message }) => ({
  userID,message
});

const mapDispatchToProps = dispatch => ({
  
  register: (values)=> dispatch(registerAction(values)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withContext(RegisterPage));

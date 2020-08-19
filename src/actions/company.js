import axios from 'axios';
import React from 'react';
import {url, OptionsAuth} from 'actions'



export const GET_COMPANY_INFO_REQUEST = 'GET_COMPANY_INFO_REQUEST';
export const GET_COMPANY_INFO_FAILURE = 'GET_COMPANY_INFO_FAILURE';
export const GET_COMPANY_INFO_SUCCESS = 'GET_COMPANY_INFO_SUCCESS';

export const FETCH_CUSTOMERS_INFO_REQUEST = 'FETCH_CUSTOMERS_INFO_REQUEST';
export const FETCH_CUSTOMERS_INFO_FAILURE = 'FETCH_CUSTOMERS_INFO_FAILURE';
export const FETCH_CUSTOMERS_INFO_SUCCESS = 'FETCH_CUSTOMERS_INFO_SUCCESS';

export const ADD_CUSTOMER_REQUEST = 'ADD_CUSTOMER_REQUEST';
export const ADD_CUSTOMER_FAILURE = 'ADD_CUSTOMER_FAILURE';
export const ADD_CUSTOMER_SUCCESS = 'ADD_CUSTOMER_SUCCESS';

export const UPLOAD_LOGOTYPE_REQUEST = 'UPLOAD_LOGOTYPE_REQUEST';
export const UPLOAD_LOGOTYPE_FAILURE = 'UPLOAD_LOGOTYPE_FAILURE';
export const UPLOAD_LOGOTYPE_SUCCESS = 'UPLOAD_LOGOTYPE_SUCCESS';


export const CHANGE_SIDEBARCOLOR_REQUEST = 'CHANGE_SIDEBARCOLOR_REQUEST';
export const CHANGE_SIDEBARCOLOR_FAILURE = 'CHANGE_SIDEBARCOLOR_FAILURE';
export const CHANGE_SIDEBARCOLOR_SUCCESS = 'CHANGE_SIDEBARCOLOR_SUCCESS';

  export const getCompanyInfo = (id) => (dispatch, getState) => {
    dispatch({ type: GET_COMPANY_INFO_REQUEST });
  
    OptionsAuth(getState().token);
  
    return axios
      .get(`${url}/api/v1/company/info/${id}`, {
     
        
      })
      .then(({data}) => {

       dispatch({
          type: GET_COMPANY_INFO_SUCCESS,
          payload: {
           
            data,
          },
        });
      })
      .catch(err => {
       console.log(err.response)
     

        dispatch({ type: GET_COMPANY_INFO_FAILURE });
      });
  };

  export const changeSidebarColor = (values, id) => (dispatch, getState) => {
    dispatch({ type: CHANGE_SIDEBARCOLOR_REQUEST });
  
    OptionsAuth(getState().token);
  
    return axios
      .post(`${url}/api/v1/company/changesidebar/${id}`, {
     
        values
      })
      .then(({data}) => {
       
       dispatch({
          type: CHANGE_SIDEBARCOLOR_SUCCESS,
          payload: {
           
            data,
          },
        });
      })
      .catch(err => {
       // console.log(err.response);
        dispatch({ type: CHANGE_SIDEBARCOLOR_FAILURE });
      });
  };

  export const fetchCustomersInfo = () => (dispatch, getState) => {
    dispatch({ type: FETCH_CUSTOMERS_INFO_REQUEST });
  
    OptionsAuth(getState().token);
  
    return axios
      .get(`${url}/api/v1/company/list`, {
     
        
      })
      .then(({data}) => {

       dispatch({
          type: FETCH_CUSTOMERS_INFO_SUCCESS,
          payload: {
           
            data,
          },
        });
      })
      .catch(err => {
       // console.log(err.response);
        dispatch({ type: FETCH_CUSTOMERS_INFO_FAILURE });
      });
  };


  export const addCustomer = (values) => (dispatch, getState) => {
    dispatch({ type: ADD_CUSTOMER_REQUEST });
  
    OptionsAuth(getState().token);
 
    return axios
      .post(`${url}/api/v1/company/add`, {
      
        values
        
      })
      .then(({data}) => {

       dispatch({
          type: ADD_CUSTOMER_SUCCESS,
          payload: {
           
            data,
          },
        });
      })
      .catch(err => {
      //  console.log(err.response);
        dispatch({ type: ADD_CUSTOMER_FAILURE });
      });
  };

  

  export const uploadLogotype = (values,id) => (dispatch, getState) => {
    dispatch({ type: UPLOAD_LOGOTYPE_REQUEST });

    OptionsAuth(getState().token);
    let reader=new FileReader();
    reader.readAsDataURL(values.file);
    reader.onload=(e)=>{
    
      const formData={file:e.target.result}
      return axios
      .post(`${url}/api/v1/company/uploadlogotype/${id}`, 
     
        formData
      
      )
      .then(({data}) => {
     
     
        dispatch({
           type: UPLOAD_LOGOTYPE_SUCCESS,
           payload: {
            
             data,
           },
         });
       })
      .catch(err => {
       // console.log(err.response);
        dispatch({ type: UPLOAD_LOGOTYPE_FAILURE, error: err });
      });
    }
   
    
  };

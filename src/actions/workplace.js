import axios from 'axios';
import {url, OptionsAuth} from 'actions'


export const GET_WORKPLACES_REQUEST = 'GET_WORKPLACES_REQUEST';
export const GET_WORKPLACES_FAILURE = 'GET_WORKPLACES_FAILURE';
export const GET_WORKPLACES_SUCCESS = 'GET_WORKPLACES_SUCCESS';

export const GET_PERMISSIONS_REQUEST = 'GET_PERMISSIONS_REQUEST';
export const GET_PERMISSIONS_FAILURE = 'GET_PERMISSIONS_FAILURE';
export const GET_PERMISSIONS_SUCCESS = 'GET_PERMISSIONS_SUCCESS';

export const ADD_WORKPLACE_REQUEST = 'ADD_WORKPLACE_REQUEST';
export const ADD_WORKPLACE_FAILURE = 'ADD_WORKPLACE_FAILURE';
export const ADD_WORKPLACE_SUCCESS = 'ADD_WORKPLACE_SUCCESS';

export const EDIT_WORKPLACE_PERMISSION_REQUEST = 'EDIT_WORKPLACE_PERMISSION_REQUEST';
export const EDIT_WORKPLACE_PERMISSION_FAILURE = 'EDIT_WORKPLACE_PERMISSION_FAILURE';
export const EDIT_WORKPLACE_PERMISSION_SUCCESS = 'EDIT_WORKPLACE_PERMISSION_SUCCESS';

export const EDIT_WORKPLACE_REQUEST = 'EDIT_WORKPLACE_REQUEST';
export const EDIT_WORKPLACE_FAILURE = 'EDIT_WORKPLACE_FAILURE';
export const EDIT_WORKPLACE_SUCCESS = 'EDIT_WORKPLACE_SUCCESS';

export const REMOVE_WORKPLACE_REQUEST = 'REMOVE_WORKPLACE_REQUEST';
export const REMOVE_WORKPLACE_FAILURE = 'REMOVE_WORKPLACE_FAILURE';
export const REMOVE_WORKPLACE_SUCCESS = 'REMOVE_WORKPLACE_SUCCESS';

export const CREATE_WORKPLACE_REQUEST = 'CREATE_WORKPLACE_REQUEST';
export const CREATE_WORKPLACE_FAILURE = 'CREATE_WORKPLACE_FAILURE';
export const CREATE_WORKPLACE_SUCCESS = 'CREATE_WORKPLACE_SUCCESS';

export const getAuthWorkPlaces = () => (dispatch, getState) => {
  dispatch({ type: GET_WORKPLACES_REQUEST });

  OptionsAuth(getState().token);

  return axios
    .get(`${url}/api/v1/workplace/authinfo`, {
   
      
    })
    .then(({data}) => {

     dispatch({
        type: GET_WORKPLACES_SUCCESS,
        payload: {
         
          data,
        },
      });
    })
    .catch(err => {
      console.log(err.response);
      dispatch({ type: GET_WORKPLACES_FAILURE });
    });
};


export const getWorkPlaces = (id) => (dispatch, getState) => {
    dispatch({ type: GET_WORKPLACES_REQUEST });
  
    OptionsAuth(getState().token);
 
    return axios
      .get(`${url}/api/v1/workplace/info/${id}`, {
     
        
      })
      .then(({data}) => {

       dispatch({
          type: GET_WORKPLACES_SUCCESS,
          payload: {
           
            data,
          },
        });
      })
      .catch(err => {
        console.log(err.response);
        dispatch({ type: GET_WORKPLACES_FAILURE });
      });
  };

  export const editWorkPlace = (values, id) => (dispatch, getState) => {
    dispatch({ type: EDIT_WORKPLACE_REQUEST });
  
    OptionsAuth(getState().token);

    return axios
      .post(`${url}/api/v1/workplace/edit/${id}`, {
      
        values
    
        
      })
      .then(({data}) => {

       dispatch({
          type: EDIT_WORKPLACE_SUCCESS,
          payload: {
           
            data,
          },
        });
      })
      .catch(err => {
        console.log(err.response);
        dispatch({ type: EDIT_WORKPLACE_FAILURE });
      });
  };

  export const removeWorkPlace = ( id) => (dispatch, getState) => {
    dispatch({ type: REMOVE_WORKPLACE_REQUEST });
  
    OptionsAuth(getState().token);

    return axios
      .get(`${url}/api/v1/workplace/remove/${id}`, {
      
      
    
        
      })
      .then(({data}) => {

       dispatch({
          type: REMOVE_WORKPLACE_SUCCESS,
          payload: {
           
            data,
          },
        });
      })
      .catch(err => {
        console.log(err.response);
        dispatch({ type: REMOVE_WORKPLACE_FAILURE });
      });
  };

  

  export const createWorkPlace = (values, id) => (dispatch, getState) => {
    dispatch({ type: CREATE_WORKPLACE_REQUEST });
  
    OptionsAuth(getState().token);

    return axios
      .post(`${url}/api/v1/workplace/create/${id}`, {
      
        values
    
        
      })
      .then(({data}) => {

       dispatch({
          type: CREATE_WORKPLACE_SUCCESS,
          payload: {
           
            data,
          },
        });
      })
      .catch(err => {
        console.log(err.response);
        dispatch({ type: CREATE_WORKPLACE_FAILURE });
      });
  };


  
export const getPermissions = () => (dispatch, getState) => {
  dispatch({ type: GET_PERMISSIONS_REQUEST });

  OptionsAuth(getState().token);

  return axios
    .get(`${url}/api/v1/permissions/list`, {
   
      
    })
    .then(({data}) => {

     dispatch({
        type: GET_PERMISSIONS_SUCCESS,
        payload: {
         
          data,
        },
      });
    })
    .catch(err => {
      console.log(err.response);
      dispatch({ type: GET_PERMISSIONS_FAILURE });
    });
};

export const editWorkplacePermission = (values,companyid,id) => (dispatch, getState) => {
  dispatch({ type: EDIT_WORKPLACE_PERMISSION_REQUEST });

  OptionsAuth(getState().token);

  return axios
    .post(`${url}/api/v1/permissions/edit/${companyid}/${id}`, {
    values
      
    })
    .then(({data}) => {
      
     dispatch({
        type: EDIT_WORKPLACE_PERMISSION_SUCCESS,
        payload: {
         
          data,
        },
      });
    })
    .catch(err => {
      console.log(err.response);
      dispatch({ type: EDIT_WORKPLACE_PERMISSION_FAILURE });
    });
};

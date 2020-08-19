import axios from 'axios';
import {url, OptionsAuth} from 'actions'



export const CHANGE_USER_INFO_REQUEST = 'CHANGE_USER_INFO_REQUEST';
export const CHANGE_USER_INFO_FAILURE = 'CHANGE_USER_INFO_FAILURE';
export const CHANGE_USER_INFO_SUCCESS = 'CHANGE_USER_INFO_SUCCESS';

export const CHANGE_AUTH_USER_INFO_REQUEST = 'CHANGE_AUTH_USER_INFO_REQUEST';
export const CHANGE_AUTH_USER_INFO_FAILURE = 'CHANGE_AUTH_USER_INFO_FAILURE';
export const CHANGE_AUTH_USER_INFO_SUCCESS = 'CHANGE_AUTH_USER_INFO_SUCCESS';


export const CHANGE_USER_PASSWORD_REQUEST = 'CHANGE_USER_PASSWORD_REQUEST';
export const CHANGE_USER_PASSWORD_FAILURE = 'CHANGE_USER_PASSWORD_FAILURE';
export const CHANGE_USER_PASSWORD_SUCCESS = 'CHANGE_USER_PASSWORD_SUCCESS';

export const  GET_AUTH_USER_INFO_REQUEST = 'GET_AUTH_USER_INFO_REQUEST';
export const  GET_AUTH_USER_INFO_FAILURE = 'GET_AUTH_USER_INFO_FAILURE';
export const  GET_AUTH_USER_INFO_SUCCESS = 'GET_AUTH_USER_INFO_SUCCESS';

export const GET_USER_INFO_REQUEST = 'GET_USER_INFO_REQUEST';
export const GET_USER_INFO_FAILURE = 'GET_USER_INFO_FAILURE';
export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS';

export const ADD_USER_REQUEST = 'ADD_USER_REQUEST';
export const ADD_USER_FAILURE = 'ADD_USER_FAILURE';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';

export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';

export const CHANGESTATUS_USER_REQUEST = 'CHANGESTATUS_USER_REQUEST';
export const CHANGESTATUS_USER_FAILURE = 'CHANGESTATUS_USER_FAILURE';
export const CHANGESTATUS_USER_SUCCESS = 'CHANGESTATUS_USER_SUCCESS';


export const FETCH_USERS_INFO_REQUEST = 'FETCH_USERS_INFO_REQUEST';
export const FETCH_USERS_INFO_FAILURE = 'FETCH_USERS_INFO_FAILURE';
export const FETCH_USERS_INFO_SUCCESS = 'FETCH_USERS_INFO_SUCCESS';

export const UPLOAD_AVATAR_REQUEST = 'UPLOAD_AVATAR_REQUEST';
export const UPLOAD_AVATAR_FAILURE = 'UPLOAD_AVATAR_FAILURE';
export const UPLOAD_AVATAR_SUCCESS = 'UPLOAD_AVATAR_SUCCESS';



  export const getUserInfo = (id) => (dispatch, getState) => {
    dispatch({ type: GET_USER_INFO_REQUEST });
  
    OptionsAuth(getState().token);
  
    return axios
      .get(`${url}/api/v1/user/userInfo/${id}`, {
     
        
      })
      .then(({data}) => {
     
       dispatch({
          type: GET_USER_INFO_SUCCESS,
          payload: {
           
            data,
          },
        });
      })
      .catch(err => {
        console.log(err.response);
        dispatch({ type: GET_USER_INFO_FAILURE });
      });
  };

  export const changeUserStatus = (id) => (dispatch, getState) => {
    dispatch({ type: CHANGESTATUS_USER_REQUEST });
  
    OptionsAuth(getState().token);
  
    return axios
      .get(`${url}/api/v1/user/changestatus/${id}`, {
     
        
      })
      .then(({data}) => {
     
       dispatch({
          type: CHANGESTATUS_USER_SUCCESS,
          payload: {
           
            data,
          },
        });
      })
      .catch(err => {
        console.log(err.response);
        dispatch({ type: CHANGESTATUS_USER_FAILURE });
      });
  };

  export const deleteUser = (id) => (dispatch, getState) => {
    dispatch({ type: DELETE_USER_REQUEST });
  
    OptionsAuth(getState().token);
  
    return axios
      .get(`${url}/api/v1/user/delete/${id}`, {
     
        
      })
      .then(({data}) => {
     console.log(data)
       dispatch({
          type: DELETE_USER_SUCCESS,
          payload: {
           
            data,
          },
        });
      })
      .catch(err => {
        console.log(err.response);
        dispatch({ type: DELETE_USER_FAILURE });
      });
  };


  export const addUser = (values) => (dispatch, getState) => {
    dispatch({ type: ADD_USER_REQUEST });
  
    OptionsAuth(getState().token);
  
    return axios
      .post(`${url}/api/v1/user/add`, {
      
        values
        
      })
      .then(({data}) => {

       dispatch({
          type: ADD_USER_SUCCESS,
          payload: {
           
            data,
          },
        });
      })
      .catch(err => {
        console.log(err.response);
        dispatch({ type: ADD_USER_FAILURE });
      });
  };

  export const getAuthUserInfo = () => (dispatch, getState) => {
    dispatch({ type: GET_AUTH_USER_INFO_REQUEST });
  
    OptionsAuth(getState().token);
  
    return axios
      .get(`${url}/api/v1/user/info`, {
     
        
      })
      .then(({data}) => {
     
       dispatch({
          type:  GET_AUTH_USER_INFO_SUCCESS,
          payload: {
           
            data,
          },
        });
      })
      .catch(err => {
        console.log(err.response);
        dispatch({ type:  GET_AUTH_USER_INFO_FAILURE });
      });
  };

  export const fetchUsersInfo = () => (dispatch, getState) => {
    dispatch({ type: FETCH_USERS_INFO_REQUEST });
  
    OptionsAuth(getState().token);
  
    return axios
      .get(`${url}/api/v1/user/users`, {
     
        
      })
      .then(({data}) => {

       dispatch({
          type: FETCH_USERS_INFO_SUCCESS,
          payload: {
           
            data,
          },
        });
      })
      .catch(err => {
        console.log(err.response);
        dispatch({ type: FETCH_USERS_INFO_FAILURE });
      });
  };

 

  export const uploadAvatar = (values) => (dispatch, getState) => {
    dispatch({ type: UPLOAD_AVATAR_REQUEST });

    OptionsAuth(getState().token);
    let reader=new FileReader();
    reader.readAsDataURL(values.file);
    reader.onload=(e)=>{
    
      const formData={file:e.target.result}
      return axios
      .post(`${url}/api/v1/user/uploadavatar`, 
     
        formData
      
      )
      .then(({data}) => {
     
      localStorage.setItem('userAvatar', data.data.avatar);
        dispatch({
           type: UPLOAD_AVATAR_SUCCESS,
           payload: {
            
             data,
           },
         });
       })
      .catch(err => {
        console.log(err.response);
        dispatch({ type: UPLOAD_AVATAR_FAILURE, error: err });
      });
    }
   
    
  };

  export const editUserInfo = (values,id) => (dispatch, getState) => {
    dispatch({ type: CHANGE_USER_INFO_REQUEST });
  
    OptionsAuth(getState().token);

    return axios
      .post(`${url}/api/v1/user/editinfo/${id}`, {
     
        values,
        id
      })
      .then(({data}) => {
    
       dispatch({
          type: CHANGE_USER_INFO_SUCCESS,
          payload: {
           
            data,
          },
        });
      })
      .catch(err => {
        console.log(err.response);
        dispatch({ type: CHANGE_USER_INFO_FAILURE, error: err });
      });
  };

  export const editAuthUserInfo = (values) => (dispatch, getState) => {
    dispatch({ type: CHANGE_AUTH_USER_INFO_REQUEST });
  
    OptionsAuth(getState().token);

    return axios
      .post(`${url}/api/v1/user/editauthinfo`, {
     
        values
        
      })
      .then(({data}) => {
    
       dispatch({
          type: CHANGE_AUTH_USER_INFO_SUCCESS,
          payload: {
           
            data,
          },
        });
      })
      .catch(err => {
        console.log(err.response);
        dispatch({ type: CHANGE_AUTH_USER_INFO_FAILURE, error: err });
      });
  };

  export const changeUserPassword = (values) => (dispatch, getState) => {
    dispatch({ type: CHANGE_USER_PASSWORD_REQUEST });
  
    OptionsAuth(getState().token);

    return axios
      .post(`${url}/api/v1/user/changepassword`, {
     
        values
      })
      .then(({data}) => {
        //console.log( data)
       dispatch({
          type: CHANGE_USER_PASSWORD_SUCCESS,
          payload: {
           
            data,
          },
        });
      })
      .catch(err => {
        console.log(err.response);
        dispatch({ type: CHANGE_USER_PASSWORD_FAILURE, error: err });
      });
  };
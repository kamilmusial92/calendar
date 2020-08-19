import axios from 'axios';


export const AUTH_REQUEST = 'AUTH_REQUEST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const AUTHORIZE_REQUEST='AUTHORIZE_REQUEST';
export const AUTHORIZE_SUCCESS='AUTHORIZE_SUCCESS';
export const AUTHORIZE_FAILURE='AUTHORIZE_FAILURE';

export const FETCHEVENTS_REQUEST = 'FETCHEVENTS_REQUEST';
export const FETCHEVENTS_SUCCESS = 'FETCHEVENTS_SUCCESS';
export const FETCHEVENTS_FAILURE = 'FETCHEVENTS_FAILURE';

export const FETCHEVENTSFROMCALENDAR_REQUEST = 'FETCHEVENTSFROMCALENDAR_REQUEST';
export const FETCHEVENTSFROMCALENDAR_SUCCESS = 'FETCHEVENTSFROMCALENDAR_SUCCESS';
export const FETCHEVENTSFROMCALENDAR_FAILURE = 'FETCHEVENTSFROMCALENDAR_FAILURE';

export const FETCHTOASTS_REQUEST = 'FETCHTOASTS_REQUEST';
export const FETCHTOASTS_SUCCESS = 'FETCHTOASTS_SUCCESS';
export const FETCHTOASTS_FAILURE = 'FETCHTOASTS_FAILURE';

export const UPDATETOASTS_REQUEST = 'UPDATETOASTS_REQUEST';
export const UPDATETOASTS_SUCCESS = 'UPDATETOASTS_SUCCESS';
export const UPDATETOASTS_FAILURE = 'UPDATETOASTS_FAILURE';

export const ADD_ITEM_TO_CALENDAR_REQUEST = 'ADD_ITEM_TO_CALENDAR_REQUEST';
export const ADD_ITEM_TO_CALENDAR_SUCCESS = 'ADD_ITEM_TO_CALENDAR_SUCCESS';
export const ADD_ITEM_TO_CALENDAR_FAILURE = 'ADD_ITEM_TO_CALENDAR_FAILURE';

export const CHANGE_ITEM_STATUS_REQUEST = 'CHANGE_ITEM_STATUS_REQUEST';
export const CHANGE_ITEM_STATUS_FAILURE = 'CHANGE_ITEM_STATUS_FAILURE';
export const CHANGE_ITEM_STATUS_SUCCESS = 'CHANGE_ITEM_STATUS_SUCCESS';

export const CLEAR_MESSAGE_SUCCESS= 'CLEAR_MESSAGE_SUCCESS';


export const url='https://kmusial.pl/calendarapi';



export const OptionsAuth = (apitoken) =>{
  axios.interceptors.request.use(function (config) {
    // assume your access token is stored in local storage 
    // (it should really be somewhere more secure but I digress for simplicity)
    let token = apitoken
    if (token) {
       config.headers['Authorization'] = `Bearer ${token}`
    }
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
}

export const authenticate = (username, password) => dispatch => {
  dispatch({ type: AUTH_REQUEST });

  return axios
    .post(`${url}/api/v1/login`, {
      username,
      password,
    })
    .then(payload => {
     
      localStorage.setItem('userID', payload.data.user.id);
      localStorage.setItem('userAvatar', payload.data.user.avatar_path);
      localStorage.setItem('userSurname', payload.data.user.name);
      localStorage.setItem('token', payload.data.token.token);
     
      dispatch({ type: AUTH_SUCCESS, payload });
    })
    .catch(err=> {
      console.log(err.response.data);
      dispatch({ type: AUTH_FAILURE, error: err});
    });
};

export const register = (values) => (dispatch, getState) => {
  dispatch({ type: REGISTER_REQUEST });

  return axios
    .post(`${url}/api/v1/register`, {
     values
    })
    .then(({data})=> {
 
 
      
      dispatch({ 
        type: REGISTER_SUCCESS,
          payload: {
            data
          }
       });
    })
    .catch(err=> {
      console.log(err.response.data);
      dispatch({ type: REGISTER_FAILURE, error: err});
    });
};



export const logout = () => (dispatch, getState) => {
  dispatch({ type: AUTH_REQUEST });

  return axios
    .get(`${url}/api/v1/logout`, {
     
    })
    .then(payload => {
      
    
      dispatch({ type: LOGOUT_SUCCESS, payload });
    })
    .catch(err=> {
      console.log(err.response.data);
    
    });
};

export const clearMessage = () => (dispatch) => {
  dispatch({ type: CLEAR_MESSAGE_SUCCESS });

 

};

export const fetchToasts = () => (dispatch, getState) => {
  dispatch({ type: FETCHTOASTS_REQUEST });

  OptionsAuth(getState().token);

  return axios
    .get(`${url}/api/v1/events/gettoasts`, {
     
    })
    .then(({data}) => {
      //console.log(data.data)
      dispatch({
        type: FETCHTOASTS_SUCCESS,
        payload: {
         data
        }
      });
    })
    .catch(err => {
      console.log(err.response);
      dispatch({ type: FETCHTOASTS_FAILURE });
    });
};


export const fetchEventsFromCalendar = () => (dispatch, getState) => {
  dispatch({ type: FETCHEVENTSFROMCALENDAR_REQUEST });

  OptionsAuth(getState().token);

  return axios
    .get(`${url}/api/v1/events/geteventsfromcalendar`, {
     
    })
    .then(({data}) => {
    //  console.log(data.data)
      dispatch({
        type: FETCHEVENTSFROMCALENDAR_SUCCESS,
        payload: {
         data
        }
      });
    })
    .catch(err => {
      console.log(err.response);
      dispatch({ type: FETCHEVENTSFROMCALENDAR_FAILURE });
    });
};



export const fetchEvents = () => (dispatch, getState)  => {
  dispatch({ type: FETCHEVENTS_REQUEST });
  OptionsAuth(getState().token);
  return axios
    .get(`${url}/api/v1/events/getevents`)
    .then(({data}) => {
      
      dispatch({
        type: FETCHEVENTS_SUCCESS,
        payload: {
         data
        }
      });
    })
    .catch(err => {
      console.log(err.response);
      dispatch({ type: FETCHEVENTS_FAILURE });
    });
};



export const addItemToCalendar = (values) => (dispatch, getState) => {
  dispatch({ type: ADD_ITEM_TO_CALENDAR_REQUEST });

  OptionsAuth(getState().token);

  return axios
    .post(`${url}/api/v1/events/additem`, {
   
      values
    })
    .then(({data}) => {
  
     dispatch({
        type: ADD_ITEM_TO_CALENDAR_SUCCESS,
        payload: {
         
          data,
        },
      });
    })
    .catch(err => {
      console.log(err.response);
      dispatch({ type: ADD_ITEM_TO_CALENDAR_FAILURE });
    });
};

export const changeItemStatus = (id,status) => (dispatch, getState) => {
  dispatch({ type: CHANGE_ITEM_STATUS_REQUEST });

  OptionsAuth(getState().token);

  return axios
    .post(`${url}/api/v1/events/changeitemstatus`, {
   
      id,status
    })
    .then(({data}) => {
     
     dispatch({
        type: CHANGE_ITEM_STATUS_SUCCESS,
        payload: {
         
          data
        },
      });
    })
    .catch(err => {
      console.log(err.response);
      dispatch({ type: CHANGE_ITEM_STATUS_FAILURE});
      
    });
};

export const updateToastStatus = (data) => (dispatch, getState) => {
  dispatch({ type: UPDATETOASTS_REQUEST });

  OptionsAuth(getState().token);

  return axios
    .post(`${url}/api/v1/events/updatetoaststatus`, {
   
      data
    })
    .then(({data}) => {
    
     dispatch({
        type: UPDATETOASTS_SUCCESS,
        payload: {
         data
        }
      });
    })
    .catch(err => {
      console.log(err.response);
      dispatch({ type: UPDATETOASTS_FAILURE });
    });
};










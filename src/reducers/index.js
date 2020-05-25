import {
  ADD_ITEM_TO_CALENDAR_SUCCESS,
  AUTH_SUCCESS,
  FETCHEVENTS_SUCCESS,
  FETCHEVENTSFROMCALENDAR_SUCCESS,
  FETCHTOASTS_SUCCESS,
  UPDATETOASTS_SUCCESS
} from 'actions';

const initialState = {

  userID: localStorage.getItem('userID'),
  userAvatar: localStorage.getItem('userAvatar'),
  token: localStorage.getItem('token'),
  isLoading: false,
  events:[],
  eventsfromcalendar:[],
  toasts:[]
};




const rootReducer = (state = initialState, action) => {
  switch (action.type) {
   
    case FETCHEVENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        events: [...action.payload.data.data],
      };
    case FETCHEVENTSFROMCALENDAR_SUCCESS:
        return {
          ...state,
          isLoading: false,
          eventsfromcalendar: [...action.payload.data.data],
      };
    case FETCHTOASTS_SUCCESS:
        return {
          ...state,
          isLoading: false,
          toasts: [...action.payload.data.data],
      };
    case UPDATETOASTS_SUCCESS:
        return {
          ...state,
          isLoading: false,
          toasts: [...action.payload.data.data],
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        userID: action.payload.data.user.id,
        userAvatar: action.payload.data.user.avatar_path,
        userSurname: action.payload.data.user.name,
        token:action.payload.data.token.token
      };
    case ADD_ITEM_TO_CALENDAR_SUCCESS:
      return {
        ...state,
        isLoading: false,
        eventsfromcalendar: [...state.eventsfromcalendar,{...action.payload.data.data}],
      };
   
    default:
      return state;
  }
};

export default rootReducer;

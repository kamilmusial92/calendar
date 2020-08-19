import {
  ADD_ITEM_TO_CALENDAR_SUCCESS,
  AUTH_SUCCESS,
  LOGOUT_SUCCESS,
  AUTH_FAILURE,
  FETCHEVENTS_SUCCESS,
  FETCHEVENTSFROMCALENDAR_SUCCESS,
  FETCHTOASTS_SUCCESS,
  UPDATETOASTS_SUCCESS,
  CHANGE_ITEM_STATUS_SUCCESS,
  CHANGE_ITEM_STATUS_REQUEST,
  FETCHEVENTSFROMCALENDAR_REQUEST,
  FETCHEVENTS_REQUEST,
  CLEAR_MESSAGE_SUCCESS,
  REGISTER_SUCCESS

} from 'actions';

import {
 
  GET_AUTH_USER_INFO_SUCCESS,
  ADD_USER_SUCCESS,
  FETCH_USERS_INFO_SUCCESS,
  FETCH_USERS_INFO_REQUEST,
  CHANGE_USER_INFO_SUCCESS,
  CHANGE_USER_INFO_FAILURE,
  CHANGE_USER_PASSWORD_FAILURE,
  CHANGE_USER_PASSWORD_SUCCESS,
  UPLOAD_AVATAR_SUCCESS,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_REQUEST,
  CHANGE_AUTH_USER_INFO_SUCCESS,
  CHANGE_AUTH_USER_INFO_FAILURE,
  CHANGESTATUS_USER_REQUEST,
  CHANGESTATUS_USER_SUCCESS,
  DELETE_USER_SUCCESS
 
} from 'actions/user';

import {

  GET_COMPANY_INFO_SUCCESS,
  GET_COMPANY_INFO_REQUEST,
  UPLOAD_LOGOTYPE_SUCCESS,
  FETCH_CUSTOMERS_INFO_SUCCESS,
  FETCH_CUSTOMERS_INFO_REQUEST,
  ADD_CUSTOMER_SUCCESS,
  ADD_CUSTOMER_REQUEST,
  CHANGE_SIDEBARCOLOR_SUCCESS
  

} from 'actions/company';

import {
  GET_WORKPLACES_REQUEST,
  GET_WORKPLACES_SUCCESS,
  EDIT_WORKPLACE_SUCCESS,
  REMOVE_WORKPLACE_SUCCESS,
  CREATE_WORKPLACE_SUCCESS,
  GET_PERMISSIONS_SUCCESS,
  EDIT_WORKPLACE_PERMISSION_SUCCESS
} from 'actions/workplace'

const initialState = {

  userID: localStorage.getItem('userID'),
  userAvatar: localStorage.getItem('userAvatar'),
  token: localStorage.getItem('token'),
  isLoading: false,
  events:[],
  eventsfromcalendar:[],
  toasts:[],
  message:'',
  authuserinfo:[],
  usersinfo:[],
  getuserinfo:[],
  workplaces:[],
  companyinfo:[],
  isLoadingContent:false,
  alert:false,
  permissions:[]
};




const rootReducer = (state = initialState, action) => {
  switch (action.type) {


      case CLEAR_MESSAGE_SUCCESS:
        return {
          ...state,
          message: '',
          alert: false
      };

      case REGISTER_SUCCESS:
        return {
          ...state,
          alert: action.payload.data.alert,
          message: action.payload.data.message
        };

      case CHANGE_USER_PASSWORD_SUCCESS:
        return {
          ...state,
          message: action.payload.data.message
      };

      case CHANGE_USER_PASSWORD_FAILURE:
        return {
          ...state,
          message: action.error.response.data.message
      };

      case GET_PERMISSIONS_SUCCESS:
        return {
          ...state,
          permissions: action.payload.data.data
        };

      case ADD_USER_SUCCESS:
        return {
          ...state,
          usersinfo:[...state.usersinfo,{...action.payload.data.data}],
          message: action.payload.data.message,
          alert:true
      };

      case CHANGESTATUS_USER_REQUEST:
        return {
          ...state,
        
          isLoadingContent: true, 
          
        };

        case DELETE_USER_SUCCESS:
          return {
            ...state,
            alert: action.payload.data.alert,
            message: action.payload.data.message
          };

      case CHANGESTATUS_USER_SUCCESS:
        return {
          ...state,
          getuserinfo: {...state.getuserinfo,
            active: action.payload.data.data.active

          },
          alert: action.payload.data.alert,
          isLoadingContent: false, 
          message: action.payload.data.message
        };

        case EDIT_WORKPLACE_PERMISSION_SUCCESS:
          return {
            ...state,
            alert: action.payload.data.alert,
            message: action.payload.data.message
          }

      case ADD_CUSTOMER_REQUEST:
        return {
          ...state,
         
          isLoadingContent: true, 
         
      };

      case ADD_CUSTOMER_SUCCESS:
        return {
          ...state,
          alert:true,
          isLoadingContent: false, 
          customersinfo:[...state.customersinfo,{...action.payload.data.data}],
          message: action.payload.data.message
      };

      case GET_WORKPLACES_SUCCESS:
        return {
            ...state,
            isLoading: false,
            isLoadingContent: false, 
            workplaces: action.payload.data.data
        };

        case CREATE_WORKPLACE_SUCCESS:
          return {
              ...state,
            
              message:action.payload.data.message,
              alert: action.payload.data.alert,
              workplaces: [{...action.payload.data.data},...state.workplaces.filter(item=>item.id!=action.payload.data.data.id)]
          };

        case EDIT_WORKPLACE_SUCCESS:
          return {
              ...state,
            
              message:action.payload.data.message,
              alert: action.payload.data.alert,
              workplaces: [{...action.payload.data.data},...state.workplaces.filter(item=>item.id!=action.payload.data.data.id)]
          };

          case REMOVE_WORKPLACE_SUCCESS:
            return {
                ...state,
                alert:action.payload.data.alert,
                
                message:action.payload.data.message,
              
               
            };

        case GET_WORKPLACES_REQUEST:
          return {
              ...state,
              isLoadingContent: true
            
             
        };
  
        case GET_COMPANY_INFO_REQUEST:
          return {
              ...state,
              isLoadingContent: true
            
             
        };
      
        case CHANGE_SIDEBARCOLOR_SUCCESS:
          return {
              ...state,
              
              authuserinfo: { ...state.authuserinfo,
                 company: { ...state.authuserinfo.company, 
                    sidebarcolor:   action.payload.data.data.sidebarcolor
                 }
              },
              companyinfo: {...state.companyinfo,
                sidebarcolor: action.payload.data.companyinfo.sidebarcolor

              },
              message:action.payload.data.message
        };
      
      case GET_COMPANY_INFO_SUCCESS:
        return {
            ...state,
            isLoadingContent: false,
            message:action.payload.data.message,
            companyinfo: action.payload.data.data
      };

      case FETCH_CUSTOMERS_INFO_REQUEST:
        return {
            ...state,
            isLoadingContent: true, 
        };
      
      case FETCH_CUSTOMERS_INFO_SUCCESS:
      return {
          ...state,
          isLoadingContent: false,
          customersinfo: action.payload.data.data
      };
     
      case  GET_AUTH_USER_INFO_SUCCESS:
      return {
          ...state,
          isLoading: false,
        //  message:action.payload.data.message,
          authuserinfo: action.payload.data.data
      };

     

      case GET_USER_INFO_SUCCESS:
        return {
            ...state,
            isLoading: false,
            isLoadingContent: false,
            message:action.payload.data.message,
            getuserinfo: action.payload.data.data
        };

        case GET_USER_INFO_REQUEST:
          return {
              ...state,
              isLoadingContent: true
             
        };

        case FETCH_USERS_INFO_REQUEST:
          return {
              ...state,
             
              isLoadingContent: true
             
          };

      case FETCH_USERS_INFO_SUCCESS:
      return {
          ...state,
          isLoading: false,
          isLoadingContent: false,
          //message: action.payload.data.message,
          usersinfo: [...action.payload.data.data]
      };

      case UPLOAD_AVATAR_SUCCESS:
        return {
            ...state,
            isLoading: false,
            message: action.payload.data.message,
            authuserinfo: action.payload.data.data
        };

      case UPLOAD_LOGOTYPE_SUCCESS:
          return {
              ...state,
              isLoading: false,
              message: action.payload.data.message,
              
      };

      case CHANGE_USER_INFO_SUCCESS:
      return {
          ...state,
          isLoading: false,
          message: action.payload.data.message,
          getuserinfo: action.payload.data.data
      };

      

      case CHANGE_USER_INFO_FAILURE:
        return {
          ...state,
          message: action.error.response.data.message
      };

      case CHANGE_AUTH_USER_INFO_SUCCESS:
        return {
            ...state,
            isLoading: false,
            message: action.payload.data.message,
            authuserinfo: action.payload.data.data
        };

        case CHANGE_AUTH_USER_INFO_FAILURE:
          return {
            ...state,
            message: action.error.response.data.message
        };
   
    case FETCHEVENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        events: [...action.payload.data.data],
        message:''
      };

    case FETCHEVENTSFROMCALENDAR_REQUEST:
      return {
          ...state,
          isLoadingContent: true,
          message:''
      };

      case FETCHEVENTS_REQUEST:
        return {
            ...state,
            isLoading: true,
            message:''
        };

    case FETCHEVENTSFROMCALENDAR_SUCCESS:
        return {
          ...state,
          isLoadingContent: false,
          eventsfromcalendar: [...action.payload.data.data],
          message:''
      };
    case FETCHTOASTS_SUCCESS:
        return {
          ...state,
          isLoading: false,
          toasts: [...action.payload.data.data],
          message:''
      };
    case UPDATETOASTS_SUCCESS:
        return {
          ...state,
          isLoading: false,
          toasts: [...action.payload.data.data],
          message:''
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        userID: action.payload.data.user.id,
        userAvatar: action.payload.data.user.avatar_path,
        userSurname: action.payload.data.user.name,
        token:action.payload.data.token.token,
        message:'', 
        authuserinfo:action.payload.data.user 
      };

    case AUTH_FAILURE:
        return {
          ...state,
          alert:false,
          message: action.error.response.data.message
      };

    case LOGOUT_SUCCESS:
        return {
          ...state,
          message: '',
          authuserinfo:[]
      };

      

    case ADD_ITEM_TO_CALENDAR_SUCCESS:
      return {
        ...state,
        isLoadingContent: false,
        eventsfromcalendar: [...state.eventsfromcalendar,{...action.payload.data.data}],
        message:''
      };

    case CHANGE_ITEM_STATUS_REQUEST:

      return {
        ...state,
        isLoadingContent: true,
        message:''
      };

    case CHANGE_ITEM_STATUS_SUCCESS:
     
      return {
        ...state,
        isLoadingContent:false,
        eventsfromcalendar: [...state.eventsfromcalendar.filter(item=>item.id!==action.payload.data.data.id),{...action.payload.data.data}],
        message: action.payload.data.message,
        alert:action.payload.data.alert
      };
   
    default:
      return state;
  }
};

export default rootReducer;

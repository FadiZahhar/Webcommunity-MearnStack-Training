import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGOUT,
    CLEAR_ERRORS
  } from '../types';
  
  const authReducer = (state, action) => {
    switch (action.type) {
      case REGISTER_SUCCESS:
        localStorage.setItem('token',action.payload.token)
        return {
          ...state,
          ...action.payload,
          isAuthenticated: true,
          loading: false
        };
      case REGISTER_FAIL:
        case AUTH_ERROR:
            case LOGOUT:
                localStorage.removeItem('token');
                return {
                    ...state,
                    token:null,
                    loading:false,
                    user:null,
                    error:action.payload
        }
      case USER_LOADED:
        return {
            ...state,
            isAuthenticated:true,
            loading:false,
            user: action.payload
        }
      case CLEAR_ERRORS:
        return {
          ...state,
          error:null
        };
  
      default:
        throw new Error(`Unsupported type of: ${action.type}`);
    }
  };
  
  export default authReducer;
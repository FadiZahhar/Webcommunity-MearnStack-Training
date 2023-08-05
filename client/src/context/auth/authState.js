import { useReducer, useContext, useEffect } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../types';


// AuthState Provider Component

const AuthState = (props) => {
  // I changed the token name in storage to avoid possible confusions 
  const initialState = {
    token: localStorage.getItem('contact_keeper_token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);
  
  // Load User

  // Register User

  // Login User

  // Logout

  // Clear Errors
  

  return (
    <AuthContext.Provider value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
    }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
import React, { useReducer, useContext, useEffect } from 'react';
import axios from 'axios';
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';

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
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);
  
  // Load User
  const loadUser = async () => {
    console.log("token in localstorage",localStorage.token);
    if(localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get(process.env.REACT_APP_API_URL+'/api/auth');
        dispatch({
            type: USER_LOADED, 
            payload: res.data
        });

        
    } catch(err) {
        dispatch({type: AUTH_ERROR });
    }
  }

  // Register User
  const register = async formData => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post(process.env.REACT_APP_API_URL+'/api/users', formData, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });
        loadUser();
    }
    catch(err) {
        dispatch({
            type: REGISTER_FAIL,
            payload: err.response.data.msg
        });
    }
  }

  // Login User
  const loginUser = async formData => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
        const res = await axios.post(process.env.REACT_APP_API_URL+'/api/auth', formData, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
    }
    catch(err) {
        dispatch({
            type: LOGIN_FAIL,
            payload: err.response.data.msg
        });
    }
  }

  // Logout
  const logoutUser = () => dispatch({type: LOGOUT})

  // Clear Errors
  const clearErrors = () => dispatch({ type: CLEAR_ERRORS})

  return (
    <AuthContext.Provider value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        loadUser,
        loginUser,
        logoutUser,
        clearErrors
    }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;

import React, {Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/NavBar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alerts from './components/layout/Alerts';
import PrivateRoute from './components/routing/PrivateRoute';

import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import setAuthToken from './utils/setAuthToken';

import './App.css';

if(localStorage.token) {
  setAuthToken(localStorage);
}

const App = () => {
  return (
    <AuthState>
    <ContactState>
      <AlertState>
    <BrowserRouter>
      <Fragment>
       <Navbar />
       <div className="container">
        <Alerts />
       <Routes>
       <Route exact path='/' element={<PrivateRoute/>}>
            <Route exact path='/'  element={Home}/>
          </Route>
         
          <Route  path='/about' Component={About} />
          <Route  path='/register' Component={Register} />
          <Route exact path='/login' Component={Login} />
        </Routes>
       </div>
      </Fragment>
    </BrowserRouter>
    </AlertState>
    </ContactState>
    </AuthState>
  );
};

export default App;

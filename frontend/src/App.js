import React, {Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/NavBar';
import Home from './components/pages/Home';
import About from './components/pages/About';

import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import './App.css';

const App = () => {
  return (
    <AuthState>
    <ContactState>
    <BrowserRouter>
      <Fragment>
       <Navbar />
       <div className="container">
       <Routes>
          <Route exact path='/' Component={Home} />
          <Route path='/about' Component={About} />
        </Routes>
       </div>
      </Fragment>
    </BrowserRouter>
    </ContactState>
    </AuthState>
  );
};

export default App;

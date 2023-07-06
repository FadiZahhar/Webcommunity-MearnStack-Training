import React, {Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/NavBar';
import Home from './components/pages/Home';
import About from './components/pages/About';

import './App.css';

const App = () => {
  return (
    <Router>
      <Fragment>
       <Navbar />
       <div className="container">
        <Switch>
          <Route exact path='/' Component={Home} />
          <Route path='/about' Component={About} />
        </Switch>
       </div>
      </Fragment>
    </Router>
  );
};

export default App;

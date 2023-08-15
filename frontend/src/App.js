import React, { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import About from "./components/pages/About";

import "./App.css";
import CNavbar from "./components/layout/CNavBar";
import ContactState from "./context/contact/contactState";

const App = () => {
  return (
    <ContactState>
      <BrowserRouter>
        <Fragment>
          <CNavbar />
          <Routes>
            <Route exact path="/" Component={Home} />
            <Route path="/about" Component={About} />
          </Routes>
        </Fragment>
      </BrowserRouter>
    </ContactState>
  );
};

export default App;

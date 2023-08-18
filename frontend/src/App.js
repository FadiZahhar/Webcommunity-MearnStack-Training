import React, { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import CNavbar from "./components/layout/CNavBar";
import ContactState from "./context/contact/contactState";
import AuthState from "./context/auth/authState";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <BrowserRouter>
          <Fragment>
            <CNavbar />
            <Routes>
              <Route exact path="/" Component={Home} />
              <Route path="/about" Component={About} />
              <Route path="/login" Component={Login} />
              <Route path="/register" Component={Register} />
            </Routes>
          </Fragment>
        </BrowserRouter>
      </ContactState>
    </AuthState>
  );
};

export default App;

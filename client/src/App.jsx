// import { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ContactState from './context/contact/contactState';
import AuthState from './context/auth/authState';
import './App.css';

import NavBar from "./components/layout/NavBar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Register from './components/auth/Register';
import Login from './components/auth/Login';

function App() {
  return (
    <AuthState>
      <ContactState>
        <BrowserRouter>
          <>
            <NavBar />

            <main className='container'>
              <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route exact path='/register' element={<Register />} />
                <Route exact path='/login' element={<Login />} />
              </Routes>
            </main>
          </>
        </BrowserRouter>
      </ContactState>
    </AuthState>
  );
}

export default App;

// import { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import NavBar from "./components/layout/NavBar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import ContactState from './context/contact/contactState';

function App() {
  return (
    <ContactState>
      <BrowserRouter>
        <>
          <NavBar />

          <main className='container'>
            <Routes>
              <Route exact path='/' Component={Home} />
              <Route path='/about' Component={About} />
            </Routes>
          </main>
        </>
      </BrowserRouter>
    </ContactState>
  );
}

export default App;

import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
//
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './App.css';
//
import CoursesList from './components/CoursesList';
import StudentsList from './components/StudentsList';
import EditStudent from './components/EditStudent';
import EditCourse from './components/EditCourse';

import CreateStudent from './components/CreateStudent';
import ShowStudent from './components/ShowStudent';
import ShowCourse from './components/ShowCourse';

import Home from './components/Home';
import Login from './components/Login';
//
function App() {

  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/StudentsList">Students List</Nav.Link>
            <Nav.Link href="/CoursesList">Courses List</Nav.Link>
            <Nav.Link href="/ShowStudent">Profile</Nav.Link>
            <Nav.Link href="/create">Sign Up</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    
      <div>          
          <Route render ={()=> < Home />} path="/home" />
          <Route render ={()=> < Login />} path="/login" />
          <Route render ={()=> < StudentsList />} path="/StudentsList" />
          <Route render ={()=> < ShowStudent />} path="/ShowStudent/:studentNumber" />
          <Route render ={()=> < CoursesList />} path="/CoursesList" />
          <Route render ={()=> < EditStudent />} path="/edit/:studentNumber" />
          <Route render ={()=> < CreateStudent />} path="/create" />
          <Route render ={()=> < ShowStudent />} path="/show/:id" />
          <Route render ={()=> < ShowCourse />} path="/ShowCourse/:id" />
          <Route render ={()=> < EditCourse />} path="/EditCourse/:id" />

      </div>

    </Router>


  );
}
//<Route render ={()=> < App />} path="/" />
export default App;

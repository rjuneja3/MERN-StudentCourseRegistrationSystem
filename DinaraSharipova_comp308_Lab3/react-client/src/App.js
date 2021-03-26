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

import CreateUser from './components/CreateStudent';
import Login from './components/Login';
import ShowStudent from './components/ShowStudent';
import ShowCourse from './components/ShowCourse';
import ListOfStudents from './components/ListOfStudents';
import ListOfCourses from './components/ListOfCourses';
import StudentsEnrolledInCourse from './components/StudentsEnrolledInCourse';
import AddCourse from './components/AddCourse';
import CoursesOfStudent from './components/CoursesOfStudent';
import UpdateStudent from './components/UpdateStudent'; 

import UpdateCourse from './components/UpdateCourse';


function App(props) {
  return (
    <Router>
      <Navbar bg="light" expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/login">Home</Nav.Link>
          <Nav.Link href="/listOfStudents">List of All Students</Nav.Link>
          <Nav.Link href="/listOfCourses">List of All Courses</Nav.Link>
        </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <div>
        <Route render={()=> <CreateUser />}path="/create"/>
        <Route render ={()=> < Login />} path="/login" />
        <Route render ={()=> < ListOfStudents />} path="/listOfStudents" />
        <Route render ={()=> < ListOfCourses />} path="/listOfCourses" />
        <Route render ={()=> <AddCourse/>}path="/addCourse"/>
        <Route render ={()=> < StudentsEnrolledInCourse />} path="/StudentsEnrolledInCourse/:courseCode" />
        <Route render ={()=> < CoursesOfStudent />} path="/CoursesOfStudent/:studentId" />
        <Route render ={()=> < UpdateStudent />} path="/updateStudent/:studentNumber" />
        <Route render ={()=> < ShowStudent />} path="/showStudent" />
        <Route render ={()=> < ShowCourse />} path="/showCourse/:courseId" />
        <Route render ={()=> < UpdateCourse />} path="/updateCourse/:courseId" />
      </div>
    </Router>
  );
}

export default App;

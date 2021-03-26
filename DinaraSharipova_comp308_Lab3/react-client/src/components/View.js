import React, { useState, useEffect } from "react";
//
import axios from "axios";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import ShowStudent from "./ShowStudent";
import Jumbotron  from "react-bootstrap/Jumbotron";
import Spinner from "react-bootstrap/Spinner";
import AddCourse from "./AddCourse";
import CoursesOfStudent from "./CoursesOfStudent";
import { Button, ButtonGroup } from "react-bootstrap";
import { withRouter } from 'react-router-dom';

//
function View(props) {
  const { screen, setScreen } = props;
  const {student,setStudent} = props;
  const [data, setData] = useState();  
  const [course, setCourse] = useState("");
    
  const deleteCookie = async () => {
    try {
      await axios.get("/signout");
      setScreen("auth");
    } catch (e) {
      console.log(e);
    }
  };
  const verifyCookie = async () => {
    try {
      const res = await axios.get("/welcome");
      console.log(res.data);
      setData(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const listCourses = (id) => {
    setCourse("n");
  };

  const addCourse = () => {
    setCourse("y");
  };
  
  const showDetail = () => {
    setCourse('myProfile');
  };

  return (
    
    <div className="App">

      {course === "y" ? (
        <AddCourse screen={screen} setScreen={setScreen} />
      ) : course === "n" ? (
        <CoursesOfStudent screen={screen} setScreen={setScreen} />
      ) :course==="myProfile" ?(
        <ShowStudent screen={screen} setScreen={setScreen}/>
      ):(
        
        <div>
        <div class="header">
        <div class="mask">
        <div class="d-flex justify-content-center align-items-center h-200">
          <div class="text-white margin-class">
          
          <h2 class="mb-3">Welcome to Student Panel</h2>
          <p class="mb-3">Your Student Number is: {screen}</p>
          </div>
        </div>
      </div></div>
      
     <div class="margin-class">
          <ButtonGroup >
           
            <Button variant="secondary" onClick={addCourse}>Enroll into course</Button>
            <Button variant="secondary"
              action
              onClick={() => {
                listCourses(screen);
              }}
            >
              My Courses
            </Button>
            <Button variant="secondary" onClick={showDetail}>Profile</Button>
            <Button variant="secondary" onClick={deleteCookie}>Log out</Button>
          </ButtonGroup>
          </div>
      
        </div>
       
      )}
    </div>
  );
}

export default View;

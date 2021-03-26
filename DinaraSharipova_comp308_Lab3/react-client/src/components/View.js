import React, { useState, useEffect } from "react";
//
import axios from "axios";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import ShowStudent from "./ShowStudent";
import Jumbotron  from "react-bootstrap/Jumbotron";
import Spinner from "react-bootstrap/Spinner";
import AddCourse from "./AddCourse";
import MyCourses from "./MyCourses";
import { Button, ButtonGroup } from "react-bootstrap";
import { withRouter } from 'react-router-dom';

//
function View(props) {
  // read the info from props, coming from the ancestor component
  const { screen, setScreen } = props;
  const {student,setStudent} = props;

  // return a stateful value and funcion to update it
  const [data, setData] = useState();  //
  const [course, setCourse] = useState("");
    
  // called when user clicks on Logout button
  // to clear the cookie and set the screen state variable
  // back to its initial state.
  const deleteCookie = async () => {
    try {
      await axios.get("/signout");
      setScreen("auth");
    } catch (e) {
      console.log(e);
    }
  };
  // called when user clicks on Get Data button
  // end-point demonstrates another example for the use
  // of cookie specific response from the server.
  const verifyCookie = async () => {
    try {
      const res = await axios.get("/welcome");
      console.log(res.data);
      setData(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  //
  const listCourses = (id) => {
    console.log("in listCourses: ");
    setCourse("n");
    console.log(props);
  };
  //
  const addCourse = () => {
    console.log("in AddCourse");
    setCourse("y");
    console.log(course);
  };
  
  const showDetail = () => {
    console.log(props);
    setCourse('myProfile');
    // props.push({
    //   pathname: "/showStudent/" + studentNumber,
    // });
  };

  return (
    <div className="App">

      {course === "y" ? (
        <AddCourse screen={screen} setScreen={setScreen} />
      ) : course === "n" ? (
        <MyCourses screen={screen} setScreen={setScreen} />
      ) :course==="myProfile" ?(
        <ShowStudent screen={screen} setScreen={setScreen}/>
      ):(
        <div>
          <Jumbotron>
            <h2>Welcome, {student.firstName} {student.lastName}</h2>
            <p>{screen}</p>
          </Jumbotron>
          

          {/* <p>{data}</p> */}
          <ButtonGroup>
            {/* <Button variant="secondary" onClick={verifyCookie}>Verify Cookie</Button> */}
            <Button variant="secondary" onClick={addCourse}>Add course</Button>
            <Button variant="secondary"
              action
              onClick={() => {
                listCourses(screen);
              }}
            >
              List of your Courses
            </Button>
            <Button variant="secondary" onClick={showDetail}>My Profile</Button>
            <Button variant="secondary" onClick={deleteCookie}>Log out</Button>
          </ButtonGroup>
        </div>
      )}
    </div>
  );
}

//
export default View;

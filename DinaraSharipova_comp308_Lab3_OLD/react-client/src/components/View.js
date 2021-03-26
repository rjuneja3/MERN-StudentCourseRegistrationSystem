import CreateCourse from './CreateCourse';
import StudentCourses from "./StudentCourses";
import ShowStudent from "./ShowStudent";
import Jumbotron  from "react-bootstrap/Jumbotron";
import React, { useState } from 'react';
import { Button, ButtonGroup } from "react-bootstrap";
//
import axios from 'axios';
//
function View (props) {
  const { screen, setScreen } = props;
  const {student,setStudent} = props;

  // return a stateful value and funcion to update it
  const [data, setData] = useState();  //
  const [course, setCourse] = useState("");
  const deleteCookie = async () => {
    try {
      await axios.get('/signout');
      setScreen('auth');
    } catch (e) {
      console.log(e);
    }
  };
  // called when user clicks on Get Data button
  // end-point demonstrates another example for the use
  // of cookie specific response from the server.
  const verifyCookie = async () => {
    try {
      const res = await axios.get('/welcome');
      console.log(res.data)
      setData(res.data);
    } catch (e) {
      console.log(e);
    }
  }
  //
  const listCourses = (id) => {
    console.log("in listCourses: ");
    setCourse("n");
    console.log(props);
  };
  //
  const createCourse = () => {
    console.log('in createCourse')
    setCourse('y')

  }
  const showDetail = () => {
    console.log(props);
    setCourse('myProfile');
    // props.push({
    //   pathname: "/showStudent/" + studentNumber,
    // });
  };
  //
  return (
    <div className="App">

      {course === "y" ? (
        <CreateCourse screen={screen} setScreen={setScreen} />
      ) : course === "n" ? (
        <StudentCourses screen={screen} setScreen={setScreen} />
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
            <Button variant="secondary" onClick={createCourse}>Create course</Button>
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
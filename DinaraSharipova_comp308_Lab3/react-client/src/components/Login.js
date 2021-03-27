import React, { useState, useEffect } from 'react';
//import ReactDOM from 'react-dom';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
//
import View from './View'
//
function App(props) {
  //state variable for the screen, admin or user
  const [screen, setScreen] = useState('auth');
  const [student,setStudent] = useState([]);
  //store input field data, user name and password
  const [studentNumber, setUsername] = useState();
  const [password, setPassword] = useState();
  const apiUrl = "http://localhost:3000/signin";
  //send studentNumber and password to the server
  // for initial authentication
  const auth = async () => {
    console.log('calling auth')
    console.log(studentNumber)
    try {
      if(studentNumber==null||password==null||studentNumber==''||password==''){
        
      }
      //make a get request to /authenticate end-point on the server
      const loginData = { auth: { studentNumber, password } }
      //call api
      const res = await axios.post(apiUrl, loginData);
      console.log(res.data.auth)
      console.log(res.data.screen)
      //process the response
      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
        setStudent(res.data.student);
        console.log(res.data.screen);
      }
    } catch (e) { //print the error
      console.log(e);
    }
  
  };
  
  //check if the user already logged-in
  const readCookie = async () => {
    try {
      console.log('--- in readCookie function ---');

      //
      const res = await axios.get('/read_cookie');
      // 
      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
        console.log(res.data.screen)
      }
    } catch (e) {
      setScreen('auth');
      console.log(e);
    }
  };
  //runs the first time the view is rendered
  //to check if user is signed in
  useEffect(() => {
    readCookie();
  }, []); //only the first render
  //
  return (
    <div className="App container">
      {screen === 'auth' 
        ? <div className="col-md-8 offset-md-2 LoginWrapper">
          <Form.Group>
            <Form.Label>Student Number: </Form.Label>
            <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
          </Form.Group>
          <Form.Label>Password: </Form.Label>
          
          <Form.Control type="password" onChange={e => setPassword(e.target.value)}/>
          <br/>
          <Button variant="primary" onClick={auth}>Login</Button>
          <br/>
          <br/>
          <p className="note_para">If you don't have an account, you can <a href="/create">register</a></p>
        </div>
        : <View screen={screen} setScreen={setScreen} student={student} setStudent={setStudent} />
      }
    </div>
  );
}

export default App;


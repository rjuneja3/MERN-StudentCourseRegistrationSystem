import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function ShowStudent(props) {
  const studentNumber = props.match.params.studentNumber;
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/students/" + studentNumber;
console.log(studentNumber);
  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      console.log('results from students: ',result.data);
      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);
  console.log("DATA" + data.firstName);
  
  const editStudent= (id) => {
    props.history.push({
      pathname: '/EditStudent/' + id
    });
  };

  const deleteStudent = (id) => {
    setShowLoading(true);
    const student = { firstName: data.firstName, lastName: data.lastName, 
      email: data.email,studentNumber: data.studentNumber, password: data.password };
  
    axios.delete(apiUrl, student)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/studentslist')
      }).catch((error) => setShowLoading(false));
  };

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> }    
      <Jumbotron>
        <h1>Name: {data.firstName}, {data.lastName}</h1>
        <p>Email: {data.email}</p>
        <p>Student Number: {data.studentNumber}</p>
        <p>Email: {data.email}</p>
        <p>Phone Number: {data.phone}</p>
        <p>Address: {data.address}</p>
        <p>City: {data.city}</p>
        <p>Program: {data.program}</p>
        <p>
          <Button type="button" variant="primary" onClick={() => { editStudent(data._id) }}>Edit</Button>&nbsp;
          <Button type="button" variant="danger" onClick={() => { deleteStudent(data._id) }}>Delete</Button>
        </p>
      </Jumbotron>
    </div>
  );
}

export default withRouter(ShowStudent);

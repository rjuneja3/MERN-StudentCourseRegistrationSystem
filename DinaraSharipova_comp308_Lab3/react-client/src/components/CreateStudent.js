import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function CreateStudent(props) {
  const [student, setStudent] = useState({ _id: '', firstName: '', lastName: '', 
                email: '',studentNumber: '',password: '' , city: '', address: '', phoneNumber:'', program: '' });
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "http://localhost:3000/";

  const saveStudent = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { firstName: student.firstName, lastName: student.lastName, 
      email: student.email,studentNumber: student.studentNumber, password: student.password ,  program:student.program, phoneNumber:student.phoneNumber, address:student.address, city:student.city};
    axios.post(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/showstudent/' + result.data.studentNumber)
      }).catch((error) => setShowLoading(false));
  };

  const onChange = (e) => {
    e.persist();
    setStudent({...student, [e.target.name]: e.target.value});
  }

  return (
    <div>
      {showLoading && 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      } 
      <Jumbotron>
        <Form onSubmit={saveStudent}>
          <Form.Group>
            <Form.Label> First Name</Form.Label>
            <Form.Control type="text" name="firstName" id="firstName" placeholder="Enter first name" value={student.firstName} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label> Last Name</Form.Label>
            <Form.Control type="text" name="lastName" id="lastName" placeholder="Enter last name" value={student.lastName} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" name="email" id="email" rows="3" placeholder="Enter email" value={student.email} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Student Number::</Form.Label>
            <Form.Control type="text" name="studentNumber" id="studentNumber" placeholder="Enter Student Number" value={student.studentNumber} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control type="text" name="password" id="password" placeholder="Enter password" value={student.password} onChange={onChange} />
          </Form.Group>
          <Form.Group>
          <Form.Label>PRogram</Form.Label>
          <Form.Control type="text" name="program" id="program" placeholder="Enter program" value={student.program} onChange={onChange} />
        </Form.Group>
        <Form.Group>
        <Form.Label>Phone Number</Form.Label>
        <Form.Control type="text" name="phoneNumber" id="phoneNumber" placeholder="Enter phoneNumber:" value={student.phoneNumber} onChange={onChange} />
      </Form.Group>
      <Form.Group>
      <Form.Label>Address</Form.Label>
      <Form.Control type="text" name="address" id="address" placeholder="Enter address:" value={student.address} onChange={onChange} />
    </Form.Group>
    <Form.Group>
    <Form.Label>City</Form.Label>
    <Form.Control type="text" name="city" id="city" placeholder="Enter City" value={student.city} onChange={onChange} />
  </Form.Group>

          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Jumbotron>
    </div>
  );
}

export default withRouter(CreateStudent);

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function EditUser(props) {
    const [student, setStudent] = useState({ _id: '', firstName: '', lastName: '', 
    email: '',studentNumber: '',password: '' ,address:'',city:'',phone:'',program:''});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/students/" + props.match.params.studentNumber;
  //runs only once after the first render
  useEffect(() => {
    setShowLoading(false);
    //call api
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setStudent(result.data);
      console.log(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const updateUser = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { 

      firstName: student.firstName, 
      lastName: student.lastName, 
      email: student.email,
      studentNumber: student.studentNumber,
      phone: student.phone, 
      password: student.password, 
      address: student.address, 
      city: student.city, 
      phone: student.phone, 
      program: student.program
    };

    axios.put(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/login')
      }).catch((error) => setShowLoading(false));
  };
  //runs when student enters a field
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
        <Form onSubmit={updateUser}>
        <Form.Group>
            <Form.Label> First Name</Form.Label>
            <Form.Control type="text" name="firstName" id="firstName" placeholder="Enter first name" value={student.firstName} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label> Last Name</Form.Label>
            <Form.Control type="text" name="lastName" id="lastName" placeholder="Enter last name" value={student.lastName} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label> Address</Form.Label>
            <Form.Control type="text" name="address" id="address" placeholder="Enter Address" value={student.address} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label> City</Form.Label>
            <Form.Control type="text" name="city" id="city" placeholder="Enter City" value={student.city} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label> Phone Number</Form.Label>
            <Form.Control type="text" name="phone" id="phone" placeholder="Enter Phone Number" value={student.phone} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label> Program</Form.Label>
            <Form.Control type="text" name="program" id="program" placeholder="Enter program" value={student.program} onChange={onChange} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" name="email" id="email" rows="3" placeholder="Enter email" value={student.email} onChange={onChange} />
          </Form.Group>
        
          <Button variant="primary" type="submit">
            Update
          </Button>
        </Form>
      </Jumbotron>
    </div>
  );
}

export default withRouter(EditUser);

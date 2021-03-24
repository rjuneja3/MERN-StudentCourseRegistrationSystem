import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { withRouter } from "react-router-dom";

function ShowStudent(props) {
  const studentNumber = props.match.params.studentNumber;
  const [student, setStudent] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/students/" + studentNumber;

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setStudent(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const editUser = (studentNumber) => {
    props.history.push({
      pathname: "/editstudent/" + studentNumber,
    });
  };

  const deleteUser = (id) => {
    setShowLoading(true);
    const Student = {
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      studentNumber: student.studentNumber,
      password: student.password,
      phone: student.phone,
      address: student.address,
      city: student.city,
      program: student.program,
    };

    axios
      .delete(apiUrl, student)
      .then((result) => {
        setShowLoading(false);
        props.history.push("/listOfStudents");
      })
      .catch((error) => setShowLoading(false));
  };

  return (
    <div>
      {showLoading && (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      <Jumbotron>
        <h1>
          Profile : {student.firstName}, {student.lastName}
        </h1>
      </Jumbotron>
      <Card>
        <Card.Body>
        <Card.Title>Student Number: {student.studentNumber}</Card.Title>
        <Card.Text>Email: {student.email}</Card.Text>
        <Card.Text>Phone Number: {student.phone}</Card.Text>
        <Card.Text>Address: {student.address}</Card.Text>
        <Card.Text>City: {student.city}</Card.Text>
        <Card.Text>Program: {student.program}</Card.Text>

        <p>
          <Button
            type="button"
            variant="primary"
            onClick={() => {
              editUser(studentNumber);
            }}
          >
            Update Profile
          </Button>
              
          {/* <Button type="button" variant="danger" onClick={() => { deleteUser(data.studentNumber) }}>Delete</Button> */}
        </p>
        </Card.Body>
      </Card>
      <Button className="mt-2 btn-secondary" href="/login">
        Go Back
      </Button>
    </div>
  );
}

export default withRouter(ShowStudent);


import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { withRouter } from "react-router-dom";

function ShowUser(props) {
  const studentNumber = props.screen;
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/students/" + studentNumber;

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const editUser = (id) => {
    props.history.push({
      pathname: "/updateStudent/" + id,
    });
  };

  const deleteUser = (id) => {
    setShowLoading(true);
    const user = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      studentNumber: data.studentNumber,
      password: data.password,
      phone: data.phone,
      address: data.address,
      city: data.city,
      program: data.program,
    };

    axios
      .delete(apiUrl, user)
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
      <div class="header">
      <div class="mask">
      <div class="d-flex justify-content-center align-items-center h-200">
        <div class="text-white margin-class">
          Profile : {data.firstName}, {data.lastName}
          </div> </div> </div> </div>
      <Card>
        <Card.Body>
        <Card.Title>Student Number: {data.studentNumber}</Card.Title>
        <Card.Text>Email: {data.email}</Card.Text>
        <Card.Text>Phone Number: {data.phone}</Card.Text>
        <Card.Text>Address: {data.address}</Card.Text>
        <Card.Text>City: {data.city}</Card.Text>
        <Card.Text>Program: {data.program}</Card.Text>

        <p>
          <Button
            type="button"
            variant="primary"
            onClick={() => {
              editUser(data.studentNumber);
            }}
          >
            Update Profile
          </Button>
                      
        </p>
        </Card.Body>
      </Card>
      <Button className="mt-2 btn-secondary" href="/login">
        Go Back
      </Button>
    </div>
  );
}

export default withRouter(ShowUser);

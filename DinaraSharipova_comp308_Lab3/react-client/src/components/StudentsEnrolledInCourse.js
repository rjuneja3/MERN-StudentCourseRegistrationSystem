import React, { useState, useEffect } from "react";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Login from "./Login";

function List(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [listError, setListError] = useState(false);
  const apiUrl =
    "http://localhost:3000/StudentsEnrolledInCourse/" +
    props.match.params.courseCode;
  
  useEffect(() => {
    const fetchData = async () => {
      axios
        .get(apiUrl)
        .then((result) => {
          console.log('apiUrl :'+apiUrl);
          console.log("result.data:", result.data);
          //check if the user has logged in
          if (result.data.screen !== "auth") {
            console.log("data in if:", result.data);
            setData(result.data);
            setShowLoading(false);
          }
        })
        .catch((error) => {
          console.log("error in fetchData:", error);
          setListError(true);
        });
    };
    fetchData();
  }, []);


  return (
    <div>
      {data.length !== 0 ? (
        <div>
          {showLoading && (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          )}
          <div class="header">
      <div class="mask">
      <div class="d-flex justify-content-center align-items-center h-200">
        <div class="text-white margin-class">Students Enrolled in {props.match.params.courseCode}</div>
        </div></div></div>
          <Container>
          <ListGroup className="text-center wrapperList">
            {data.map((item, idx) => (
              <ListGroup.Item key={idx}>
                {item.studentEntity.firstName +
                  " " +
                  item.studentEntity.lastName +
                  " (" +
                  item.studentEntity.studentNumber +
                  ")  in  Section: " +
                  item.section}
              </ListGroup.Item>
            ))}
          </ListGroup>
          </Container>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}
//
export default withRouter(List);

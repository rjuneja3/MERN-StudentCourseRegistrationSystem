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
    "http://localhost:3000/api/studentsincourse/" +
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

  // const showDetail = (studentNumber) => {
  //   props.history.push({
  //     pathname: '/show/' + studentNumber
  //   });
  // }

  return (
    <div>
      {data.length !== 0 ? (
        <div>
          {showLoading && (
            <Spinner animation="border" role="status">
              <span className="sr-only">Loading...</span>
            </Spinner>
          )}
          <Jumbotron className="text-center">
            <h2>Students Enrolled in {props.match.params.courseCode}</h2>
          </Jumbotron>
          <Container>
          <ListGroup>
            {data.map((item, idx) => (
              <ListGroup.Item key={idx}>
                {item.studentEnrolled.firstName +
                  " " +
                  item.studentEnrolled.lastName +
                  " (" +
                  item.studentEnrolled.studentNumber +
                  ")  -  " +
                  item.section}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Button className="mt-2 btn-secondary" href="/login">Go Back</Button>
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
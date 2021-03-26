import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import Login from './Login';

function List(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [listError, setListError] = useState(false);
  const apiUrl = "http://localhost:3000/students";
  const courseCode_List = [
    {value: 'ENGL101', name: 'English Basics', label:'ENGL101: English Basics'},
      {value: 'BSN101', name: 'Business Basics', label:'BSN101: Business Basics'},
      {value: 'COMP229', name: 'Web Application Development', label:'COMP229: Web Application Development'},
      {value: 'COMP253', name: 'Assets for Game Developers', label:'COMP253: Assets for Game Developers'},
      {value: 'ADCS702', name: 'Introduction to Creative Strategy', label:'ADCS702: Introduction to Creative Strategy'},
      {value: 'ADCS723', name: 'The Digital Ecosystem', label:'ADCS723: The Digital Ecosystem'},
];

  useEffect(() => {
    const fetchData = async () => {
      axios.get(apiUrl)
        .then(result => {
          console.log('result.data:',result.data)
          //check if the user has logged in
          if(result.data.screen !== 'auth')
          {
            
            console.log('data in if:', result.data )
            setData(result.data);
            setShowLoading(false);
          }
        }).catch((error) => {
          console.log('error in fetchData:', error)
          setListError(true)
        });
      };  
    fetchData();
  }, []);

  const showDetail = (courseCode) => {
    props.history.push({
      pathname: '/listOfStudentsInCourse/' + courseCode
    });
  }

  return (
    <div>
        
      { data.length !== 0
        ? <div>
          {showLoading && <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner> }
          <Jumbotron className="text-center">
            <h2>List Of all courses</h2>
          </Jumbotron>
          <Container>
          <ListGroup>
          {courseCode_List.map((item, idx) => (
              <ListGroup.Item key={idx} action onClick={() => { showDetail(item.value) }}>{item.label}</ListGroup.Item>
            ))}
          </ListGroup>
          <Button className="mt-2 btn-secondary" href="/login">Go Back</Button>
          </Container>
        </div>
        : < Login />
      }
    </div>

  );
}
//
export default withRouter(List);

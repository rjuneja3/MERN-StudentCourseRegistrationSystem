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
  const courseCodes = [
    {value: 'CNET307', name: 'IT Project Management', label:'CNET307 - IT Project Management'},
    {value: 'COMP308', name: 'Emerging Technologies', label:'COMP308 - Emerging Technologies'},
    {value: 'COMP313', name: 'Software Project 2', label:'COMP313 - Software Project 2'},
    {value: 'COMP321', name: 'Systems Integration', label:'COMP321 - Systems Integration'},
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
          {courseCodes.map((item, idx) => (
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

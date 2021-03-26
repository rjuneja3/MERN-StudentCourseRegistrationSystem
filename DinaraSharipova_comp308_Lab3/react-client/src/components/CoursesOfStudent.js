import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from 'react-router-dom';
import Login from './Login';

function List(props) {
  const studentNumber = props.screen;
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const [listError, setListError] = useState(false);
  const apiUrl = "http://localhost:3000/coursesofstudent/"+studentNumber;

  useEffect(() => {
    const fetchData = async () => {
      axios.get(apiUrl)
        .then(result => {
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

  const showDetail = (courseId) => {
    props.history.push({
      pathname: '/showCourse/' + courseId
    });
    
  }
  return (
    <div>
        
      { data.length !== 0
        ? <div>
          {showLoading && <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner> }
        <Jumbotron>
          <h2>List of Courses Taken by {props.screen}</h2>
        </Jumbotron>
      
          <ListGroup>
            {data.map((item, idx) => (
              <ListGroup.Item key={idx} action onClick={() => { showDetail(item._id) }}>
                {item.courseName+"("+item.courseCode+")"+"  -  "+item.section}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Button className="mt-2 btn-secondary" href="/login">Go Back</Button>
        </div>
        : < Login />
      }
    </div>

  );
}

export default withRouter(List);

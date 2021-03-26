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
  const apiUrl = "http://localhost:3000/api/coursesofstudent/"+studentNumber;

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

  // const editCourse = (id) => {
  //   props.history.push({
  //     pathname: '/editCourse/' + id
  //   });
  // };

  // const deleteCourse = (id) => {
  //     const course = 
  //     console.log('Course Id: '+ id);
  //     const deleteUrl="http://localhost:3000/api/courses/"+id;
  //   setShowLoading(true);
  //   axios.delete(deleteUrl,)
  //     .then((result) => {
  //       setShowLoading(false);
  //       props.history.push({
  //           pathname: '/login'
  //       });
  //     }).catch((error) => setShowLoading(false));
  // };

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
          {/* {data.map((item,idx)=>(
              <Jumbotron key={idx}>
                <h1>Course Name : {item.courseName}</h1>
                <p>Course Code : {item.courseCode}</p>
                <p>Section : {item.section}</p>

        <p>
          <Button type="button" variant="primary" onClick={() => { editCourse(item._id) }}>Edit</Button>&nbsp;
          <Button type="button" variant="danger" onClick={() => { deleteCourse(item._id) }}>Drop</Button>
        </p>
              </Jumbotron>
            ))} */}

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
//
export default withRouter(List);

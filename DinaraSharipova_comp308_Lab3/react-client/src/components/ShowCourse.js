import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function ShowCourse(props) {
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/courses/" + props.match.params.courseId;
  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const updateCourse = (id) => {
    props.history.push({
      pathname: '/updateCourse/' + id
    });
  };

  const deleteCourse = (id) => {
    setShowLoading(true);
    console.log("deleting course by id: ")
    const course = { 
        courseCode: data.courseCode, 
        courseName: data.courseName, 
        section: data.section, 
        semester: data.semester };
  
    axios.delete(apiUrl, course)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/login')
      }).catch((error) => setShowLoading(false));
  };

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> }    
      <div class="header">
          <div class="mask">
          <div class="d-flex justify-content-center align-items-center h-200">
            <div class="text-white margin-class">Course Details: {data.courseName}</div></div></div></div>
      <Jumbotron>
        <div class="text-center wrapperCourseInfo">
      <h3>Course Name: <span>{data.courseName}</span></h3>
                <h3>Course Code: <span>{data.courseCode}</span></h3>
                <h3>Section: <span>{data.section}</span></h3>
                <h3>Semester: <span>{data.semester}</span></h3>

        <p>
          <Button type="button" variant="primary" onClick={() => { updateCourse(data._id) }}>Edit</Button>&nbsp;
          <Button type="button" variant="danger" onClick={() => { deleteCourse(data._id) }}>Drop</Button>
        </p>
        </div>
        <Button className="mt-2 btn-secondary" href="/login">Go Back</Button>
      </Jumbotron>
    </div>
  );
}

export default withRouter(ShowCourse);

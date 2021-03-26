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
      <Jumbotron>
      <h1>Course Name : {data.courseName}</h1>
                <p>Course Code : {data.courseCode}</p>
                <p>Section : {data.section}</p>

        <p>
          <Button type="button" variant="primary" onClick={() => { updateCourse(data._id) }}>Edit</Button>&nbsp;
          <Button type="button" variant="danger" onClick={() => { deleteCourse(data._id) }}>Drop</Button>
        </p>
        <Button className="mt-2 btn-secondary" href="/login">Go Back</Button>
      </Jumbotron>
    </div>
  );
}

export default withRouter(ShowCourse);

import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import React, { useState } from 'react';

//
function CreateCourse(props) {
    //
    const studentNumber = props.screen;
    console.log('props.screen',props.screen)
    const [course, setCourse] = useState({ _id: '', courseName: '', courseCode: '', studentNumber: '' ,  semester: '', section: ''});
    const [showLoading, setShowLoading] = useState(false);
    //
    const apiUrl = "http://localhost:3000/courses"
    //
    const saveCourse = (e) => {
        setShowLoading(true);
        e.preventDefault();
        const data = {courseName: course.courseName, courseCode: course.courseCode, studentNumber: studentNumber , semester: course.semester, section:course.section };
        //
        axios.post(apiUrl, data)
        .then((result) => {
            setShowLoading(false);
            console.log('results from save courses:',result.data)
            props.history.push('/showcourse/' + result.data._id)

        }).catch((error) => setShowLoading(false));
    };
    //
    const onChange = (e) => {
        e.persist();
        setCourse({...course, [e.target.name]: e.target.value});
      }
    
    return (
        <div>
        <h2> Create a course {studentNumber} </h2>
        {showLoading && 
            <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
            </Spinner> 
        } 
        <Jumbotron>
            <Form onSubmit={saveCourse}>
            <Form.Group>
                <Form.Label> Course Code:</Form.Label>
                <Form.Control type="text" rows="3" name="courseCode" id="courseCode" placeholder="Enter code" value={course.courseCode} onChange={onChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label> Course Name:</Form.Label>
                <Form.Control type="text" name="courseName" id="courseName" placeholder="Enter name" value={course.courseName} onChange={onChange} />
              </Form.Group>
        
              <Form.Group>
                <Form.Label> Section</Form.Label>
                <Form.Control type="text" rows="3" name="section" id="section" placeholder="Enter section" value={course.section} onChange={onChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label> Semester:</Form.Label>
                <Form.Control type="number" rows="3" name="semester" id="semester" placeholder="Enter semester" value={course.semester} onChange={onChange} />
              </Form.Group>
                            
              <Button variant="primary" type="submit">
                Save Course
              </Button>
            </Form>
          </Jumbotron>
        </div>
    );


}

export default withRouter(CreateCourse);

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
    const username = props.screen;
    console.log('props.screen',props.screen)
    const [course, setCourse] = useState({ _id: '', title: '', content: '', username: '' });
    const [showLoading, setShowLoading] = useState(false);
    //
    const apiUrl = "http://localhost:3000/api/courses"
    //
    const saveCourse = (e) => {
        setShowLoading(true);
        e.preventDefault();
        const data = {title: course.title, content: course.content, username: username };
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
        <h2> Create a course {username} </h2>
        {showLoading && 
            <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
            </Spinner> 
        } 
        <Jumbotron>
            <Form onSubmit={saveCourse}>
              <Form.Group>
                <Form.Label> Title</Form.Label>
                <Form.Control type="text" name="title" id="title" placeholder="Enter title" value={course.title} onChange={onChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label> Content</Form.Label>
                <Form.Control as="textarea" rows="3" name="content" id="content" placeholder="Enter Content" value={course.content} onChange={onChange} />
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

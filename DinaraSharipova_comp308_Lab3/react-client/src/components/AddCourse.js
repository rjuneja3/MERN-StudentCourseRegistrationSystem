import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import React, { useState } from 'react';

//
function AddCourse(props) {
    //
    const studentNumber = props.screen;
    console.log('props.screen',props.screen)
    const [course, setCourse] = useState({ _id: '', courseCode: '', courseName: '', section:'',semester:'', studentEnrolled: '' });
    const [showLoading, setShowLoading] = useState(false);

    const courseCodes = [
      {value: 'CNET307', name: 'IT Project Management', label:'CNET307 - IT Project Management'},
      {value: 'COMP308', name: 'Emerging Technologies', label:'COMP308 - Emerging Technologies'},
      {value: 'COMP313', name: 'Software Project 2', label:'COMP313 - Software Project 2'},
      {value: 'COMP321', name: 'Systems Integration', label:'COMP321 - Systems Integration'},
  ];
    //
    const apiUrl = "http://localhost:3000/api/courses"
    //
    const addCourse = (e) => {
         validateform()
        setShowLoading(true);
        e.preventDefault();
        const data = {courseCode: course.courseCode, courseName: course.courseName, section: course.section, semester:course.semester, studentEnrolled: studentNumber };
        //
        axios.post(apiUrl, data)
        .then((result) => {
            setShowLoading(false);
            console.log('results from save course:',result.data)
            props.history.push('/showCourse/' + result.data._id)

        }).catch((error) => setShowLoading(false));
    };
    function validateform(){  
      var code=document.getElementById('courseCode').value;  
      var section=document.getElementById('section').value;
      var semester = document.getElementById('semester').value;  
        
      if (code==null || code==""){  
        alert("Please Select the Course");  
        return false;  
      }if(section==null||section==""){  
        alert("Please select a section");  
        return false;  
        }if(semester ==null||semester==""){
          alert('Please select the semseter')
          return false
        }
      }  
    //
    const onChange = (e) => {
        e.persist();
        setCourse({...course, [e.target.name]: e.target.value});
      }

      const onCourseChange=()=>{
        var cc = document.getElementById('courseCode');
        courseCodes.forEach(element=>{
          if(cc.value===element.value){
            setCourse(course.courseName = element.name)
          }
        });
      };

      const onCourseChangeHandler = (e) => {
        onCourseChange();
        onChange(e);
      }
    
    return (
        <div>
        <h2> Add a course {studentNumber} </h2>
        {showLoading && 
            <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
            </Spinner> 
        } 
        <Jumbotron>
            <Form name="courseForm" onSubmit={addCourse} onLoad={onCourseChangeHandler}>
              <Form.Group>
                <Form.Label> Course Name</Form.Label>
                <Form.Control as="select" name="courseCode" id="courseCode" value={course.courseCode}  onChange={onCourseChangeHandler} required>
                    <option >Choose....</option>
                    {
                      courseCodes.map((opt,idx)=>{
                        return (
                          <option key={idx} value={opt.value}>{opt.label}</option>
                        )
                      })
                    }
                </Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label> Section</Form.Label>
                <Form.Control as="select" name="section" id="section" value={course.section} onChange={onChange} required>
                    <option>Choose....</option>
                    <option value="001">001</option>
                    <option value="002">002</option>
                    <option value="003">003</option>
                </Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label> Semester</Form.Label>
                <Form.Control as="select" name="semester" id="semester" value={course.semester} onChange={onChange} required>
                    <option>Choose....</option>
                    <option value="Summer 2021">Summer 2021</option>
                    <option value="Fall 2021">Fall 2021</option>
                    <option value="Winter 2022">Winter 2022</option>
                </Form.Control>
              </Form.Group>

              <Button variant="primary" type="submit">
                Add Course
              </Button>
            </Form>
            <Button className="mt-2 btn-secondary" href="/login">Go Back</Button>
          </Jumbotron>
        </div>
    );


}

export default withRouter(AddCourse);

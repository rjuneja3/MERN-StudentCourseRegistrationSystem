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
    const [course, setCourse] = useState({ _id: '', courseCode: '', courseName: '', section:'',semester:'', studentEntity: '' });
    const [showLoading, setShowLoading] = useState(false);

    const courseCode_List = [
      {value: 'ENGL101', name: 'English Basics', label:'ENGL101: English Basics'},
      {value: 'BSN101', name: 'Business Basics', label:'BSN101: Business Basics'},
      {value: 'COMP229', name: 'Web Application Development', label:'COMP229: Web Application Development'},
      {value: 'COMP253', name: 'Assets for Game Developers', label:'COMP253: Assets for Game Developers'},
      {value: 'ADCS702', name: 'Introduction to Creative Strategy', label:'ADCS702: Introduction to Creative Strategy'},
      {value: 'ADCS723', name: 'The Digital Ecosystem', label:'ADCS723: The Digital Ecosystem'},


  ];
    
    const apiUrl = "http://localhost:3000/courses"
    
    const addCourse = (e) => {
         validateform()
        setShowLoading(true);
        e.preventDefault();
        const data = {courseCode: course.courseCode, courseName: course.courseName, 
          section: course.section, semester:course.semester, studentEntity: studentNumber };
        
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
        courseCode_List.forEach(element=>{
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
                      courseCode_List.map((opt,idx)=>{
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

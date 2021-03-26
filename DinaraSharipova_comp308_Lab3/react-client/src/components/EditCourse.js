import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import React, { useState,useEffect } from 'react';

//
function EditCourse(props) {
    //
    const [studentId,setStudentId] = useState('');
    const id = props.match.params.courseId;
    console.log('props.screen',props.match.params.courseId)
    const [course, setCourse] = useState({ _id: '', courseCode: '', courseName: '', section:'',semester:'', studentEntity: '' });
    const [showLoading, setShowLoading] = useState(false);

    const courseCodes = [
      {value: 'CNET307', name: 'IT Project Management', label:'CNET307 - IT Project Management'},
      {value: 'COMP308', name: 'Emerging Technologies', label:'COMP308 - Emerging Technologies'},
      {value: 'COMP313', name: 'Software Project 2', label:'COMP313 - Software Project 2'},
      {value: 'COMP321', name: 'Systems Integration', label:'COMP321 - Systems Integration'},
  ];
    //
    const apiUrl = "http://localhost:3000/api/courses/"+ id;
  
    //
    //runs only once after the first render
  useEffect(() => {
    setShowLoading(false);
    //call api
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setCourse(result.data);
      setStudentId(course.studentEntity);
      console.log(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

    const updateCourse = (e) => {
        setShowLoading(true);
        e.preventDefault();
        console.log("section: "+course.section);
        const data = {
            section: course.section, 
            courseName : course.courseName, 
            courseCode : course.courseCode,
        };
        //
        axios.put(apiUrl, data)
        .then((result) => {
            setShowLoading(false);
            console.log('results from save course:',result.data)
            props.history.push({
                pathname: '/showCourse/' + id            })

        }).catch((error) => setShowLoading(false));
    };
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
        <h2> Edit A Course </h2>
        {showLoading && 
            <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
            </Spinner> 
        } 
        <Jumbotron>
            <Form onSubmit={updateCourse}>
              <Form.Group>
                <Form.Label> courseCode</Form.Label>
                <Form.Control as="select" name="courseCode" id="courseCode" value={course.courseCode} onChange={onCourseChangeHandler} disabled>
                    <option disabled>Choose....</option>
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
                <Form.Control as="select" name="section" id="section"  value={course.section} onChange={onChange}>
                    <option>Choose....</option>
                    <option value="001">001</option>
                    <option value="002">002</option>
                    <option value="003">003</option>
                </Form.Control>
              </Form.Group>

              <Form.Group>
                <Form.Label> Semester</Form.Label>
                <Form.Control as="select" name="semester" id="semester"  value={course.semester} onChange={onChange} disabled>
                    <option>Choose....</option>
                    <option value="Summer 2021">Summer 2021</option>
                    <option value="Fall 2021">Fall 2021</option>
                    <option value="Winter 2022">Winter 2022</option>
                </Form.Control>
              </Form.Group>

              <Button variant="primary" type="submit">
                update
              </Button>
            </Form>
          </Jumbotron>
        </div>
    );


}

export default withRouter(EditCourse);

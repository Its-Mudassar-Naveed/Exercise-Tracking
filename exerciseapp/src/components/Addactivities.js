import React, { useState } from "react";
import { Container,Form,Button } from "react-bootstrap";
import { Toaster } from "react-hot-toast";
import toast from 'react-hot-toast';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
function Addactivities ()
{
    const [date,setDate] = useState('');
    const [type,setType] = useState('');
    const [duration,setDuration] = useState('');
    const[comment,setComment] = useState('');
    const navigate = useNavigate(); 

    //adding activity function
    const viewProfile = ()=>
    {
      navigate('/userprofile');
    }
    const viewActivities = ()=>
    {
      navigate('/viewActivity');
    }
    const addActivity = async ()=>
    {
        console.log("Added",date,type,duration,comment);
        try {
            const gettoken = localStorage.getItem('token')
            console.log("gettoken",gettoken)
            const response = await axios.post('http://localhost:8080/createActivity',
            {
            //   headers: { Authorization: `Bearer ${gettoken}` }
                date,type,duration,comment
            });
            // console.log(response.data);//showing JWT Token
            if (response.status === 200) {
              toast.success(response.data.statusText);
            } 
            if (response.data.status === 400) {
              toast.success(response.data.statusText);
            } 
          } catch (error) {
            console.log(error);
          }
    }
    return(
    <>
    <Container>
    <Navbar bg="" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Exercise Tracking Application</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link>
            <Button variant="secondary"  onClick={viewProfile}> View Profile</Button>
            </Nav.Link>
            <Nav.Link>
            <Button variant="secondary"  onClick={viewActivities}> View Activity</Button>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
   <h1 className="text-center">Add Your Activity</h1>
        <Form>
      <Form.Group className="mb-3" controlId="">
        <Form.Label>Activity Date</Form.Label>
        <Form.Control type="date" placeholder="Date" onChange={(e)=>setDate(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="">
        <Form.Label>Activity Type</Form.Label>
        <Form.Control type="text" placeholder="" onChange={(e)=>setType(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="">
        <Form.Label>Activity Duration</Form.Label>
        <Form.Control type="text" placeholder="Acitvity Duration "  onChange={(e)=>setDuration(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="">
        <Form.Label>Comments</Form.Label>
        <Form.Control as="textarea" rows={3} onChange={(e)=>setComment(e.target.value)}/>
      </Form.Group>
      <Button variant="secondary" onClick={addActivity}>
        Add Activity
      </Button>
      <Toaster/>
    </Form>




    </Container>
    </>
    )
}
export default Addactivities;
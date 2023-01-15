import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import toast from "react-hot-toast";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { Button, } from "react-bootstrap";
// import { Navigate, useNavigate } from "react-router-dom";
function Userprofile() {
  const profileInfo = {
    firstName:'',
    laststName:'',
    gender:'',
    email:'',
    country:'',
    city:'',
    dob:'',
    height:'',
    weight:'',
  }
  const [data, setData] = useState(profileInfo);
  useEffect(() => {
   getData();
  },[]);

  // Handling input field change
  // const onValueChange = (e) => {
  //   e.preventDefault();
  //   console.log(e.target.name, e.target.value);
  //   setUpdater({ ...updater, [e.target.name]: e.target.value });
  //   console.log(updater);
  // };
   const getData = async () => {
    try {
      const gettoken = localStorage.getItem('token')
      console.log("gettoken",gettoken)
      const response = await axios.get(`http://localhost:8080/profile`,
      {
        headers: { Authorization: `Bearer ${gettoken}` }
      });
      console.log("Response",response.data.user);
      console.log(response.data);//showing JWT Token
      setData(response.data.user);
      console.log("set Data",setData);
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
  return (
    <>
      <Container>
        <h1 className="text-center">User Profile</h1>
        <hr />
        <hr />
        <hr />
        <Form>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" value={data.firstName}/>
            <br/>
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" value={data.lastName} />
            <br/>
            <Form.Label>Gender</Form.Label>
            <Form.Control type="text" placeholder="Gender" />
            <br/>
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" value={data.email} />
            <br/>
            <Form.Label>Country</Form.Label>
            <Form.Control type="text" placeholder="country" />
            <br/>
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="city" />
            <br/>
            <Form.Label>DOB</Form.Label>
            <Form.Control type="text" placeholder="dob" />
            <br/>
            <Form.Label>Height</Form.Label>
            <Form.Control type="text" placeholder="Height" />
            <br/>
            <Form.Label>Weight</Form.Label>
            <Form.Control type="text" placeholder="Weight"  />
          </Form.Group>
          <div>
        </div>
        <Button variant="secondary" >
            Update Info 
          </Button>
          <Button variant="secondary" className="m-3">
           Logout 
          </Button>
        </Form>
        <Toaster />
      </Container>
    </>
  );
}
export default Userprofile;

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
const[firstName,setFirstName] = useState('');
const[lastName,setLasttName] = useState('');
const[gender,setGender] = useState('');
const[email,setemail] = useState('');
const[country,setCountry] = useState('');
const[city,setCity] = useState('');
const[dob,setDOB] = useState('');
const[height,setHeight] = useState('');
const[weight,setWeight] = useState('');
const [data, setData] = useState(profileInfo);
  useEffect(() => {
   getData();
  },[]);

    //Update Profile
    const updateProfile = ()=>
    {
      console.log("data",firstName,lastName,gender,email,country,city, dob,height,weight);
      axios.put('http://localhost:8080/put', {
        firstName,lastName,gender,email,country,city, dob,height,weight
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

  
      
    }
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
            <Form.Control type="text" value={data.firstName} onChange={(e)=>setFirstName(e.target.value)}/>
            <br/>
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" value={data.lastName}  onChange={(e)=>setLasttName(e.target.value)}/>
            <br/>
            <Form.Label>Gender</Form.Label>
            <Form.Control type="text" placeholder="Gender" value={gender} onChange={(e)=>setGender(e.target.value)}/>
            <br/>
            <Form.Label>Email</Form.Label>
            <Form.Control type="text" value={data.email}  onChange={(e)=>setemail(e.target.value)}/>
            <br/>
            <Form.Label>Country</Form.Label>
            <Form.Control type="text" placeholder="country" value={country} onChange={(e)=>setCountry(e.target.value)}/>
            <br/>
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="city" value={city} onChange={(e)=>setCity(e.target.value)} />
            <br/>
            <Form.Label>DOB</Form.Label>
            <Form.Control type="date" placeholder="dob" value={dob} onChange={(e)=>setDOB(e.target.value)} />
            <br/>
            <Form.Label>Height</Form.Label>
            <Form.Control type="text" placeholder="Height"  value={height} onChange={(e)=>setHeight(e.target.value)}/>
            <br/>
            <Form.Label>Weight</Form.Label>
            <Form.Control type="text" placeholder="Weight"  value={weight} onChange={(e)=>setWeight(e.target.value)}/>
          </Form.Group>
          <div>
        </div>
        <Button variant="secondary" onClick={updateProfile}>
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

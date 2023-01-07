import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import toast from 'react-hot-toast';
import axios from 'axios';
function Register()
{
    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const register =()=>{
        if(!firstName || !lastName || !email || !password )
        {
            toast.error("Please fill all fields");
            return 
        }
        axios.post('http://localhost:8080/post', {
            firstName,lastName,email,password
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    return (
      <>
        <h1>Registration Form</h1>
        <Form>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" 
            placeholder="John" 
            required
            value={firstName} 
            onChange={(e)=>setFirstName(e.target.value)}
             />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Doe" 
              value={lastName} 
              onChange={(e)=>setLastName(e.target.value)}
            required/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="john@gmail.com" 
            value={email} 
            onChange={(e)=>setEmail(e.target.value)}
            required/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="********"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="********" 
            required/>
          </Form.Group>
          <Form.Group>
          <Button variant="primary" type="submit"  onClick={register}>
              Submit
         </Button>
         </Form.Group>
        </Form>
      </>
    );

}
export default Register;
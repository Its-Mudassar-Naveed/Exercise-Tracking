import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Link } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Register()
{

    const [firstName,setFirstName] = useState('');
    const [lastName,setLastName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();
    const register =()=>{
        // const data = {firstName,lastName,email,password};
        if(!firstName || !lastName || !email || !password )
        {
            toast.error("Please fill all fields");
            return 
        }
        else
        {
          // axios({
          //     method:"post",
          //     url:"http://localhost:8080/post",
          //     data:data,
          //     headers:{
          //         'Content-Type':'application/json'
          //     }
          // })
          axios.post('http://localhost:8080/post', {
            firstName,lastName,email,password
          })
          .then(function (response) {
            console.log(response);
            if(response.data.status===true)
            {
              toast.success(response.data.message)
              navigate('/login');

            }else if(response.data.status===false)
            {
              toast.error(response.data.message)
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        } 
    }
    return (
      <>
      <Container>
        <h1 className="text-center">Registration Form</h1>
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
          <Button variant="primary" type="button"  onClick={register}>
              Submit
         </Button>
         <Button variant="" className="m-4">
          <Link to='/login'>Already Have Account </Link>
          </Button>
         </Form.Group>
         
       
          <Toaster/>
        </Form>
        </Container>
      </>
    );
}
export default Register;
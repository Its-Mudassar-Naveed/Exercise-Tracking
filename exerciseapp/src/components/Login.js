import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { Link } from "react-router-dom";
// import axios from 'axios';
function Login()
{
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const loginUser = ()=>
    {
        if(!email || !password )
        {
            toast.error("Please Enter The Fields")
            return;
        }else
        {
            toast.success("All Fields Enter")
            return;
        }
      
    }
    return(
        <>
        <h1>Login Form</h1>

        <Form>
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
          <Form.Group>
          <Button variant="primary" type="button"  onClick={loginUser}>
              Submit
         </Button>
         <Button className="m-4" variant="" type="button" >
              <Link to='/forget' className="">Forget Password</Link>
         </Button>
         </Form.Group>
         <Toaster/>
        </Form>



        </>
    )
}
export default Login
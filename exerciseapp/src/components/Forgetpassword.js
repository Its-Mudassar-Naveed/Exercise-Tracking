import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import axios from "axios";
function Forgetpassword()
{
    const [email,setEmail] = useState('');
    const forget = ()=>
    {
        if(!email)
        {
            toast.error("Please Enter Email")
        }
        else
        {
            axios.post('http://localhost:8080/forget', {
                email
              })
              .then(function (response) {
                console.log(response);
                if(response.data.status===true)
                {
                  toast.success(response.data.message);
                }else if(response.data.status===true)
                {
                  toast.error(response.data.message);
                }
              })
              .catch(function (error) {
                console.log(error);
              });
        }
    }
return(
    <>
    <h1>Forget Password</h1>
    <Form.Group className="mb-3" controlId="">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="john@gmail.com" 
            value={email} 
            onChange={(e)=>setEmail(e.target.value)}
            required/>
     </Form.Group>
     <Form.Group>
        <Button variant="primary" type="button"  onClick={forget}>
              Submit
         </Button>
         </Form.Group>
         <Toaster/>
    </>
);
}
export default Forgetpassword;
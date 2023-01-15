import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
function Recover()
{
    const[code,setCode] = useState('');

    const submit = ()=>
    {
        console.log("Submitted");
        console.log(code);
    }
    return(
    <>
    <Container>
    <h1 className="text-center">Recover Your Password</h1>
    <Form>
        <Form.Group className="mb-3" controlId="">
                <Form.Label>Recovery Code</Form.Label>
                <Form.Control type="text" placeholder="Enter Passcode You recive in mail" 
                value={code} 
                onChange={(e)=>setCode(e.target.value)}
                required/>
        </Form.Group>
        <Form.Group>
            <Button variant="primary" type="button"  onClick={submit}>
                  Submit
            </Button>
        </Form.Group>
         <Toaster/>
    </Form>
    </Container>

    </>)
}
export default Recover;
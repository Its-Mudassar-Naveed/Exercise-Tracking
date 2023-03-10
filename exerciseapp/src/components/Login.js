import axios from "axios";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// import axios from 'axios';
function Login() {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const loginUser = () => {
    if (!email || !password) {
      toast.error("Please Enter The Fields");
      return;
    } else {
      // const token = "RANDOM";
      axios.post("http://localhost:8080/login",
          {
            email,
            password,
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              
            },
          }
        )
        .then(function (response) {
          console.log(response.data);
          if(response.data.status===true)
          {
            toast.success(response.data.message);
            console.log("response.data.data.authToken",response.data.data.authToken);
            const token = response.data.data.authToken
            localStorage.clear()
            localStorage.setItem('token',token);
            // navigate('/userprofile');
            navigate('/addActivity');

          }
          else if(response.data.status===false)
          {
            toast.error(response.data.message);
          }
        });
    }
  };
  return (
    <>
      <Container>
        <h1 className="text-center">Login Form</h1>
        <Form>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="john@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group>
            <Button variant="primary" type="button" onClick={loginUser}>
              Submit
            </Button>
            <Button className="m-4" variant="" type="button">
              <Link to="/forget" className="">
                Forget Password
              </Link>
            </Button>
          </Form.Group>
          <Toaster />
        </Form>
      </Container>
    </>
  );
}
export default Login;

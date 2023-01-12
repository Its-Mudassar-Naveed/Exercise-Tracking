import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import toast from "react-hot-toast";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { Button, FormControl } from "react-bootstrap";
function Userprofile() {
  const [id, setId] = useState("");
  const [data, setData] = useState("");
  const getData = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/${id}`);
      console.log(response.data);
      setData(response.data);
      if (response.data.status === true) {
        toast.success(response.data.message);
      } else {
        toast.error("No user with this Id");
      }
    } catch (error) {}
  };
  return (
    <>
      <Container>
        <h1 className="text-center">User Profile</h1>
        <h2>Get User With Specifice Id</h2>
        <Form.Group className="mb-3" controlId="">
          <Form.Label>Specfic User Id</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Button variant="secondary" onClick={getData}>
            View Profile
          </Button>
        </Form.Group>
        <hr />
        <hr />
        <hr />
        <Form>
          <Form.Group className="mb-3" controlId="">
            <Form.Label>First Name</Form.Label>
            {/* <h1>{data.firstName}</h1> */}
            <Form.Control type="text" value={data.firstName} />
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
            <Form.Control type="text" placeholder="Weight" />
          </Form.Group>
        </Form>
        <Toaster />
      </Container>
    </>
  );
}
export default Userprofile;

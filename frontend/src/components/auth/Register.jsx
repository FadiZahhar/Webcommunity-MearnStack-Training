import React, { useState } from "react";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import CPassword from "../UI/CPassword";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Container className="form-container bg-dark text-white p-4">
      <h1 className="text-white">
        Account <span className="text-primary">Register</span>
      </h1>
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Label htmlFor="name" className="text-white">
            Name
          </Label>
          <Input
            id="name"
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
            className="bg-dark text-white"
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email" className="text-white">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
            className="bg-dark text-white"
          />
        </FormGroup>
        <CPassword password={password} onChange={onChange} />
        <CPassword
          label="Confirm Password"
          name="password2"
          password={password2}
          onChange={onChange}
        />
        <Button color="primary" block>
          Register
        </Button>
      </Form>
    </Container>
  );
};

export default Register;

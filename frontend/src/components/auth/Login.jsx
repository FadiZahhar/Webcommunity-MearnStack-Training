import React, { useState } from "react";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import CPassword from "../UI/CPassword";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Container className="form-container bg-dark text-white p-4">
      <h1 className="text-white mb-4">
        Account <span className="text-primary">Login</span>
      </h1>
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Label htmlFor="email">Email Address</Label>
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

        <CPassword onChange={onChange} password={password} />

        <Button color="primary" block>
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;

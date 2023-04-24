import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Register.css";
// import "bootstrap/dist/css/bootstrap.min.css";

function Register({ onRouteChange }) {
  return (
    <div id="register-form" className="register-form">
      <p>Register</p>
      <Form>
        <Form.Group className="mb-3" controlId="registerName">
          <Form.Label>Name</Form.Label>
          <br />
          <Form.Control
            className="input-field"
            type="text"
            placeholder="Name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="registerEmail">
          <Form.Label>Email address</Form.Label>
          <br />
          <Form.Control
            className="input-field"
            type="email"
            placeholder="Email"
          />
          <br />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="registerPassword">
          <Form.Label>Password</Form.Label>
          <br />
          <Form.Control
            className="input-field"
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button
          onClick={() => onRouteChange("home")}
          className="register-button"
          variant="primary"
          type="submit"
        >
          Register
        </Button>
      </Form>
    </div>
  );
}

export default Register;

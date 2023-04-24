import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Signin.css";
// import "bootstrap/dist/css/bootstrap.min.css";

function Signin({ onRouteChange }) {
  return (
    <div id="signin-form" className="signin-form">
      <h2>Sign In</h2>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
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

        <Form.Group className="mb-3" controlId="formBasicPassword">
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
          className="signin-button"
          variant="primary"
          type="submit"
        >
          Sign In
        </Button>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <p onClick={() => onRouteChange("register")} className="register">
            Register
          </p>
        </Form.Group>
      </Form>
    </div>
  );
}

export default Signin;

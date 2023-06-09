import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Register.css";
// import "bootstrap/dist/css/bootstrap.min.css";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
    };
  }

  onNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  onSubmission = () => {
    fetch(process.env.REACT_APP_URL_REGISTER, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange("home");
        }
      });
  };

  render() {
    return (
      <div id="register-form" className="register-form">
        <p>Register</p>
        <Form>
          <Form.Group className="mb-3" controlId="registerName">
            <Form.Label>Name</Form.Label>
            <br />

            <Form.Control
              required
              onChange={this.onNameChange}
              className="input-field"
              type="text"
              placeholder="Name"
            />
          </Form.Group>
          <br />
          <Form.Group className="mb-3" controlId="registerEmail">
            <Form.Label>Email address</Form.Label>
            <br />
            <Form.Control
              required
              onChange={this.onEmailChange}
              className="input-field"
              type="email"
              placeholder="Email"
            />
            <br />
            <br />
          </Form.Group>

          <Form.Group className="mb-3" controlId="registerPassword">
            <Form.Label>Password</Form.Label>
            <br />
            <Form.Control
              required
              onChange={this.onPasswordChange}
              className="input-field"
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Button
            onClick={this.onSubmission}
            className="register-button"
            variant="primary"
          >
            Register
          </Button>
        </Form>
      </div>
    );
  }
}

export default Register;

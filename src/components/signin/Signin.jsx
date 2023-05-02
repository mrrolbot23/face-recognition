import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Signin.css';
// import "bootstrap/dist/css/bootstrap.min.css";

class Signin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signInEmail: '',
      signInPassword: '',
    };
  }

  onEmailChange = (event) => {
    this.setState({ signInEmail: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ signInPassword: event.target.value });
  };

  onSubmission = () => {
    fetch(process.env.REACT_APP_URL_SIGNIN, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((user) => {
        if (user.id) {
          this.props.loadUser(user);
          this.props.onRouteChange('home');
        } else {
          var x = document.getElementById('wrong-credentials');
          x.style.display = 'block';
        }
      });
  };

  render() {
    const { onRouteChange } = this.props;
    return (
      <div id="signin-form" className="signin-form">
        <h2>Sign In</h2>
        <h3
          id="wrong-credentials"
          style={{ color: 'rgb(152, 8, 8)', display: 'none' }}
        >
          Wrong Credentials
        </h3>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>

            <Form.Control
              onChange={this.onEmailChange}
              className="input-field"
              type="email"
              placeholder=" Email"
              required
            />
            <p className="demo-credentials">Demo Email: demo@email.com</p>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <br />
            <Form.Control
              onChange={this.onPasswordChange}
              className="input-field"
              type="password"
              placeholder=" Password"
              required
            />
            <p className="demo-credentials">Demo Password: password123</p>
          </Form.Group>
          <Button
            onClick={this.onSubmission}
            className="signin-button"
            variant="primary"
          >
            Sign In
          </Button>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <p onClick={() => onRouteChange('register')} className="register">
              Register
            </p>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default Signin;

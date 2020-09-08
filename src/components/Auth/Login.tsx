import React, { Component } from "react";
import {
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Label,
  Input,
  Button,
} from "reactstrap";
import APIURL from '../helpers/environment'
// import validateLogin from './validateLogin'

interface loginprofile {
  username: string;
  password: string;
}

class Login extends Component<any, loginprofile> {
  state: loginprofile;

  constructor(props: any) {
    super(props);
    this.state = { username: "", password: "" };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.authorization = this.authorization.bind(this);
  }

  authorization() {
    if (localStorage.getItem('token') === 'undefined') {
      localStorage.clear();
      alert('Incorrect Username or Password.')
    } else if (localStorage.getItem('token')) {
      window.location.reload(true);
    } else {
      alert('Incorrect Username or Password.')
      localStorage.clear();
    }
  }

  handleSubmit(event: any) {
    event.preventDefault();
    fetch(`${APIURL}/users/login`, {
      method: "POST",
      body: JSON.stringify({
        users: { username: this.state.username, password: this.state.password },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.props.updateToken(data.sessionToken);
      })
      .then(() => {
        if (localStorage.getItem("token")) {
          this.props.toggle();
        }
        this.authorization();
      });
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label className="updatetext" htmlFor="username">Username:</Label>
            <Input
              onChange={(e) => this.setState({ username: e.target.value })}
              name="username"
              value={this.state.username}
              required
              placeholder="username1"
              minLength={4}
              pattern="^(?=.*[A-Za-z])|(?=.*[@$!%*#?&]))[A-Za-z\d@$!%*#?&]{4,}$"
            />
            <FormFeedback></FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label className="updatetext" htmlFor="password">Password:</Label>
            <Input
              onChange={(e) => this.setState({ password: e.target.value })}
              name="password"
              value={this.state.password}
              required
              type="password"
              minLength={5}
              placeholder="******"
            />
            <FormFeedback></FormFeedback>
          </FormGroup>
          <Button id="ButtonSpace color1" className="Button" type="submit">Login</Button>
        </Form>
      </div>
    );
  }
}

export default Login;

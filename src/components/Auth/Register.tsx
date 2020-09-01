import React, { Component } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from "reactstrap";
// import validateSignup from './validateSignup';

interface registerprofile {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

class Register extends Component<any, registerprofile> {
  state: registerprofile;

  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      username: "",
      password: "",
      firstName: "",
      lastName: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event: any) {
    event.preventDefault();
    //setIsSubmitting to true to be called in useEffect
    fetch(`http://localhost:3002/users/register`, {
      method: "POST",
      body: JSON.stringify({
        user: {
          email: this.state.email,
          username: this.state.username,
          password: this.state.password,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
        },
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
          window.location.reload(true);
        }
      });
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label htmlFor="username">Username:</Label>
            <Input
              onChange={(e) => this.setState({username: e.target.value})}
              name="username"
              value={this.state.username}
              required
              placeholder="username1"
              minLength={4}
              pattern="^(?=.*[A-Za-z])|(?=.*[@$!%*#?&]))[A-Za-z\d@$!%*#?&]{4,}$"
              //className= {errors.username ? ":invalid" : ":valid}"}
            />
            <FormFeedback></FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Email:</Label>
            <Input
              onChange={(e) => this.setState({email: e.target.value})}
              name="email"
              value={this.state.email}
              required
              type="email"
              pattern="^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"
              placeholder="user@email.com"
              //className= {errors.email ? ":invalid" : ":valid}"}
            />
            <FormFeedback></FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password:</Label>
            <Input
              onChange={(e) => this.setState({password: e.target.value})}
              name="password"
              value={this.state.password}
              required
              type="password"
              minLength={5}
              placeholder="******"
              //className= {errors.password ? ":invalid" : ":valid}"}
            />
            <FormFeedback></FormFeedback>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="firstName">First Name:</Label>
            <Input
              onChange={(e) => this.setState({firstName: e.target.value})}
              name="firstName"
              value={this.state.firstName}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="lastName">Last Name:</Label>
            <Input
              onChange={(e) => this.setState({lastName: e.target.value})}
              name="lastName"
              value={this.state.lastName}
            />
          </FormGroup>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    );
  }
}

export default Register;

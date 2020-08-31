import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import Signup from "./Register";
import Login from "./Login";

interface auth {
  sessionToken: string;
  login: boolean;
  modal: boolean;
}

class Auth extends Component<any> {
  state: auth;

  constructor(props: any) {
    super(props);
    this.state = { sessionToken: "", login: false, modal: false };
    this.toggle = this.toggle.bind(this);
    this.title = this.title.bind(this);
    this.loginToggle = this.loginToggle.bind(this);
    this.updateToken = this.updateToken.bind(this);
  }

  title() {
    return this.state.login ? "Login" : "Signup";
  }

  loginToggle(event: any) {
    event.preventDefault();

    this.setState({ login: !this.state.login });
  }

  updateToken(newToken: any) {
    localStorage.setItem("token", newToken);
    this.setState({ sessionToken: newToken });
  }

  toggle() {
    this.setState({ modal: !this.state.modal });
  }

  render() {
    return (
      <div className="main">
        <div className="mainDiv">
          <Button onClick={this.toggle}>Not Signed In?</Button>
          {!this.state.login ? (
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
              <ModalHeader toggle={this.toggle}>{this.title()}</ModalHeader>
              <ModalBody>
                <Signup updateToken={this.updateToken} toggle={this.toggle} />
              </ModalBody>
              <ModalFooter>
                <Button onClick={this.loginToggle}>
                  {!this.state.login ? "Login" : "Signup"}
                </Button>
              </ModalFooter>
            </Modal>
          ) : (
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
              <ModalHeader toggle={this.toggle}>{this.title()}</ModalHeader>
              <ModalBody>
                <Login updateToken={this.updateToken} toggle={this.toggle} />
              </ModalBody>
              <ModalFooter>
                <Button onClick={this.loginToggle}>
                  {this.state.login ? "Signup" : "Login"}
                </Button>
              </ModalFooter>
            </Modal>
          )}
        </div>
      </div>
    );
  }
}

export default Auth;

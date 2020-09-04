import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
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
    return this.state.login ? "Login" : "Register";
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
        <h4>
          Please Login Using The Button Below.
        </h4>
        <div className="mainDiv">
          <Button id="ButtonSpace color1" className="Button mainModalButton" onClick={this.toggle}>
            Register or Login
          </Button>
          {!this.state.login ? (
            <Modal
              className="updateprofilemodal"
              isOpen={this.state.modal}
              toggle={this.toggle}
            >
              <h5>Update Profile</h5>
          <button
            type="button"
            id="color1"
            className="close Button"
            aria-label="Close"
            onClick={this.toggle}
          >
            <span aria-hidden="true" className="CloseButton">Close</span>
          </button>
              <ModalBody>
                <Signup updateToken={this.updateToken} toggle={this.toggle} />
              </ModalBody>
              <ModalFooter>
                <Button id="ButtonSpace color1" className="Button" onClick={this.loginToggle}>
                  {!this.state.login ? "Already have an Account?: Login" : "Don't have an Account?: Register"}
                </Button>
              </ModalFooter>
            </Modal>
          ) : (
            <Modal className="updateprofilemodal" isOpen={this.state.modal} toggle={this.toggle}>
              <ModalHeader toggle={this.toggle}>{this.title()}</ModalHeader>
              <ModalBody>
                <Login updateToken={this.updateToken} toggle={this.toggle} />
              </ModalBody>
              <ModalFooter>
                <Button id="ButtonSpace color1" className="Button" onClick={this.loginToggle}>
                  {this.state.login ? "Don't have an Account?: Register" : "Already have an Account?: Login"}
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

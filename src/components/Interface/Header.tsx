import React, { Component } from "react";
import "../../App.css";
import { Col, Row, Form, Input, Button } from "reactstrap";
import { Link, Route, Switch } from "react-router-dom";
import Home from "./Home";
import LoginPage from "./LoginPage";
import Sequencer from "./Sequencer";
import AdminPortal from './AdminPortal';
import APIURL from '../helpers/environment'

interface registerprofile {
  isAdmin: boolean;
}

class Header extends Component<any, registerprofile> {
  constructor(props: any) {
    super(props);
    this.state = { isAdmin: false }
    };

  componentDidMount() {
    if (localStorage.getItem('token')) {
    fetch(`${APIURL}/users/myprofile/me`, {
      method: "GET",
      headers: new Headers({
        Authorization: String(localStorage.getItem('token')),
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ isAdmin: data.isAdmin })
      });
  } else {
    this.setState({ isAdmin: false })
  }
}

  Logout(event: any) {
    event.preventDefault();
    this.props.clickLogout()
    window.location.replace('https://synth-time.herokuapp.com/home');
  }

  render() {
    return (
      <div className="Navbar" id="color1">
        <Row>
          <Col className="nav-link">
            <Link
              to="/home"
              className="nav-link-link"
              onClick={(event) => this.Logout(event)}
            >
              Logout
            </Link>
          </Col>
            {this.state.isAdmin ?
            <Col className="nav-link">
            <Link to="/adminportal" className="nav-link-link" id="color2">
              Admin Portal
            </Link>
            </Col>
            : null
          }
          <Col className="nav-link">
            <Link to="/profile" className="nav-link-link" id="color2">
              Profile
            </Link>
          </Col>
          <Col className="nav-link">
            <Link to="/sequencer" className="nav-link-link" id="color2">
              Sequencer
            </Link>
          </Col>
          <Col className="nav-link">
            <Link to="/home" className="nav-link-link" id="color2">
              Home
            </Link>
          </Col>
        </Row>
        <div>
          <Switch>
          <Route exact path="/adminportal">
              <div className="main-content">
                <AdminPortal />
              </div>
            </Route>
            <Route exact path="/">
              <div className="main-content">
                <Home />
              </div>
            </Route>
            <Route exact path="/home">
              <div className="main-content">
                <Home />
              </div>
            </Route>
            <Route exact path="/profile">
              <div className="main-content">
                <LoginPage />
              </div>
            </Route>
            <Route exact path="/sequencer">
              <div className="main-content">
                <Sequencer />
              </div>
            </Route>
          </Switch>
        </div>
      </div>
    );
  }
}

export default Header;

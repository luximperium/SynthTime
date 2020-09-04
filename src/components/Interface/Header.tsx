import React, { Component } from "react";
import "../../App.css";
import { Col, Row, Form, Input, Button } from "reactstrap";
import { Link, Route, Switch } from "react-router-dom";
import Home from "./Home";
import LoginPage from "./LoginPage";
import Sequencer from "./Sequencer";

interface registerprofile {
  colorstate1: string;
  colorstate2: string;
  colorstate3: string;
}

class Header extends Component<any, registerprofile> {
  constructor(props: any) {
    super(props);
    };

  render() {
    return (
      <div className="Navbar" id="color1">
        <Row>
          <Col className="nav-link">
            <Link
              to="/home"
              className="nav-link-link"
              onClick={this.props.clickLogout}
            >
              Logout
            </Link>
          </Col>
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

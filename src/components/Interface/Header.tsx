import React, { Component, useEffect, useState } from "react";
import "../../App.css";
import { Col, Row } from "reactstrap";
import { Link, Route, Switch } from "react-router-dom";
import Home from "./Home";
import LoginPage from "./LoginPage";

class Header extends Component<any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div>
        <Row>
          <Col>
            <Link to="/home">Home</Link>
          </Col>
          <Col>
            <Link to="/login">Login</Link>
          </Col>
          <Col>
            <Link to="/home" onClick={this.props.clickLogout}>Logout</Link>
          </Col>
        </Row>
        <div>
          <Switch>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/login">
              <LoginPage />
            </Route>
          </Switch>
        </div>
      </div>
    );
  }
}

export default Header;

import React, { Component } from "react";
import "../../App.css";
import { Col, Row } from "reactstrap";
import { Link, Route, Switch } from "react-router-dom";
import Home from "./Home";
import LoginPage from "./LoginPage";
import Sequencer from "./Sequencer";

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
            <Link to="/profile">Profile</Link>
          </Col>
          <Col>
            <Link to="/home" onClick={this.props.clickLogout}>Logout</Link>
          </Col>
          <Col>
            <Link to="/sequencer">Sequencer</Link>
          </Col>
        </Row>
        <div>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/profile">
              <LoginPage />
            </Route>
            <Route exact path="/sequencer">
              <Sequencer />
            </Route>
          </Switch>
        </div>
      </div>
    );
  }
}

export default Header;

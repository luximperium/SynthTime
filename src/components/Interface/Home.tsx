import React, { Component } from "react";
import "../../App.css";
import { Col, Row } from "reactstrap";

class Home extends Component<any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="home-content-container">
        <Col>
          <h1 className="HomePageHeader">Welcome to SynthTime!</h1>
        </Col>
      </div>
    );
  }
}

export default Home;
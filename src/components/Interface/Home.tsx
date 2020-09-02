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
          <Row className="HomePageSubContainer">
            <h3 className="HomePageSubtitle">What is SynthTime?</h3>
            <p className="HomePageText">
              SynthTime is a basic 8 note pattern sequencer that allows you to
              select what notes you would like to play, at what time you'd like
              to play them (based on 8th notes), as well as allowing you to skip
              certain notes (rests) and select which note you'd like the
              sequencer to play at what time!
            </p>
          </Row>
        </Col>
      </div>
    );
  }
}

export default Home;

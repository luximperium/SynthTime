import React, { Component } from "react";
import "../../App.css";
import { Col, Row } from "reactstrap";
import styled from "styled-components";

const StyledContainer = styled.div`
  text-align: center;
  padding: 30px;
  background: linear-gradient(black 0%, gray 50%);
  border-top: solid 1em black;
  border-bottom: solid 1em black;
  text-align: center;
`;

class Home extends Component<any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <StyledContainer>
        <Col>
          <h1 className="HomePageHeader">Welcome to SynthTime!</h1>
        </Col>
      </StyledContainer>
    );
  }
}

export default Home;

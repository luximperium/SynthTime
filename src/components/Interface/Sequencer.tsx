import React, { Component } from "react";
import "../../App.css";
import { Button, Input, FormGroup, Form, Row, Col, ButtonDropdown, DropdownToggle, DropdownItem, DropdownMenu } from "reactstrap";
import { WAAClock } from "waaclock";
import {
  Synth,
  Context,
  Pattern,
  PolySynth,
  Sequence,
  Transport,
  now,
  ToneEvent,
} from "tone";
import { start } from "repl";

interface sequencerState {
  projectName: string;
  projectResponse: any;
  toggleOn: boolean;
  check1: boolean;
  check2: boolean;
  check3: boolean;
  check4: boolean;
  sessionToken: any;
  projects: any;
  isOpen: boolean;
  projectInfo: any;
}

const synth = new PolySynth().toMaster();

class Sequencer extends Component<any, sequencerState> {
  state: sequencerState;

  constructor(props: any) {
    super(props);
    this.state = {
      projectName: "",
      projectResponse: "",
      toggleOn: true,
      check1: false,
      check2: false,
      check3: false,
      check4: false,
      sessionToken: "",
      projects: [],
      isOpen: false,
      projectInfo: [],
    };
    this.toggle = this.toggle.bind(this);
    this.createProject = this.createProject.bind(this);
    this.loadProjectList = this.loadProjectList.bind(this);
    this.toggleDrop = this.toggleDrop.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem("token") === "undefined") {
      alert("You must be logged in to do this!");
    } else if (localStorage.getItem("token")) {
      this.setState({ sessionToken: localStorage.getItem("token") });
    }
  }

  loadProjectList() {
    fetch(`http://localhost:3000/project/users/mine`, {
      method: "GET",
      headers: new Headers({
        Authorization: this.state.sessionToken,
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ projects: data })
        console.log(data)
      });
  }

  loadProject(incomingdata: any) {
    fetch(`http://localhost:3000/project/${incomingdata}`, {
      method: "GET",
      headers: new Headers({
        Authorization: this.state.sessionToken,
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ projectName: data[0].projectName })
        this.setState({ check1: data[0].check1 })
        this.setState({ check2: data[0].check2 })
        this.setState({ check3: data[0].check3 })
        this.setState({ check4: data[0].check4 })
      })
  }

  createProject(event: any) {
    event.preventDefault();

    fetch(`http://localhost:3000/project/create`, {
      method: "POST",
      body: JSON.stringify({
        project: {
          projectName: this.state.projectName,
          check1: this.state.check1,
          check2: this.state.check2,
          check3: this.state.check3,
          check4: this.state.check4
        },
      }),
      headers: new Headers({
        Authorization: this.state.sessionToken,
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ projectResponse: data.message });
        console.log(this.state.projectResponse);
      });
  }

  toggle() {
    this.setState({ toggleOn: !this.state.toggleOn });

    const sequence = new Sequence(
      (time, note) => {
        synth.triggerAttackRelease(note, 0.1, time);
      },
      [
        this.state.check1 ? "C2" : [],
        this.state.check2 ? "C3" : [],
        this.state.check3 ? "C4" : [],
        this.state.check4 ? "C5" : [],
      ],
      "8n"
    );
    if (this.state.toggleOn) {
      Transport.start();
      sequence.start(0);
    } else {
      Transport.cancel();
    }
    console.log(this.state.toggleOn);
  }

  handleClick(d: any) {
    this.setState({ projectInfo: d })
    this.loadProject(d.projectName);
    console.log(d.projectName)
  }

  toggleDrop() { this.setState({ isOpen: !this.state.isOpen })}

  render() {
    return (
      <div>
        <h4>{this.state.projectName}</h4>
        <div>
          <input
            type="checkbox"
            onChange={() =>
              this.state.check1
                ? this.setState({ check1: false })
                : this.setState({ check1: true })
            }
            checked={this.state.check1}
          />
          <input
            type="checkbox"
            onChange={() =>
              this.state.check2
                ? this.setState({ check2: false })
                : this.setState({ check2: true })
            }
            checked={this.state.check2}
          />
          <input
            type="checkbox"
            onChange={() =>
              this.state.check3
                ? this.setState({ check3: false })
                : this.setState({ check3: true })
            }
            checked={this.state.check3}
          />
          <input
            type="checkbox"
            onChange={() =>
              this.state.check4
                ? this.setState({ check4: false })
                : this.setState({ check4: true })
            }
            checked={this.state.check4}
          />
          <Button onClick={this.toggle}>Play/Pause</Button>
          <Form onSubmit={this.createProject}>
            <FormGroup>
              <Input
                onChange={(e) => this.setState({ projectName: e.target.value })}
                name="Project Name"
                value={this.state.projectName}
                required
                placeholder="My Project"
                minLength={4}
              />
            </FormGroup>
            <Button type="submit">Submit</Button>
          </Form>
          <h1>{this.state.projectResponse}</h1>
        </div>
        <div>
          <h5>Load Project</h5>
          <ButtonDropdown isOpen={this.state.isOpen} toggle={this.toggleDrop}>
                <DropdownToggle className="ReleaseButton" caret onClick={this.loadProjectList}>
                  Your Projects
                </DropdownToggle>
                <DropdownMenu className="releaseMenu">
                  <DropdownItem header>Your Projects</DropdownItem>
                  {this.state.projects.map((d: any) => (
                    <DropdownItem onClick={() => this.handleClick(d)}>
                      {d.projectName}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </ButtonDropdown>
        </div>
      </div>
    );
  }
}

export default Sequencer;

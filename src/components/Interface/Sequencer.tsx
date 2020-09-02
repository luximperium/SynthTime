import React, { Component } from "react";
import "../../App.css";
import {
  Button,
  Input,
  FormGroup,
  Form,
  ButtonDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";
import { PolySynth, Sequence, Transport, start } from "tone";

interface sequencerState {
  projectName: string;
  projectResponse: any;
  toggleOn: boolean;
  check1: boolean;
  check2: boolean;
  check3: boolean;
  check4: boolean;
  check5: boolean;
  check6: boolean;
  check7: boolean;
  check8: boolean;
  check1Note: string;
  check2Note: string;
  check3Note: string;
  check4Note: string;
  check5Note: string;
  check6Note: string;
  check7Note: string;
  check8Note: string;
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
      check5: false,
      check6: false,
      check7: false,
      check8: false,
      check1Note: "C3",
      check2Note: "C3",
      check3Note: "C3",
      check4Note: "C3",
      check5Note: "C3",
      check6Note: "C3",
      check7Note: "C3",
      check8Note: "C3",
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
    this.check1OptionHandleChange = this.check1OptionHandleChange.bind(this);
    this.check2OptionHandleChange = this.check2OptionHandleChange.bind(this);
    this.check3OptionHandleChange = this.check3OptionHandleChange.bind(this);
    this.check4OptionHandleChange = this.check4OptionHandleChange.bind(this);
    this.check5OptionHandleChange = this.check5OptionHandleChange.bind(this);
    this.check6OptionHandleChange = this.check6OptionHandleChange.bind(this);
    this.check7OptionHandleChange = this.check7OptionHandleChange.bind(this);
    this.check8OptionHandleChange = this.check8OptionHandleChange.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem("token") === "undefined") {
      alert("You must be logged in to do this!");
    } else if (localStorage.getItem("token")) {
      this.setState({ sessionToken: localStorage.getItem("token") });
    }
  }

  loadProjectList() {
    if (localStorage.getItem('token') === 'undefined') {
      localStorage.clear();
      alert('You must be logged in to do this.')
    } else if (localStorage.getItem('token')) {
    fetch(`http://localhost:3002/project/users/mine`, {
      method: "GET",
      headers: new Headers({
        Authorization: this.state.sessionToken,
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ projects: data });
        console.log(data);
      });
    } else {
      alert('You must be logged in to do this.')
      localStorage.clear();
    }
  }

  loadProject(incomingdata: any) {
    fetch(`http://localhost:3002/project/${incomingdata}`, {
      method: "GET",
      headers: new Headers({
        Authorization: this.state.sessionToken,
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ projectName: data[0].projectName });
        this.setState({ check1: data[0].check1 });
        this.setState({ check2: data[0].check2 });
        this.setState({ check3: data[0].check3 });
        this.setState({ check4: data[0].check4 });
        this.setState({ check5: data[0].check5 });
        this.setState({ check6: data[0].check6 });
        this.setState({ check7: data[0].check7 });
        this.setState({ check8: data[0].check8 });
        this.setState({ check1Note: data[0].check1Note });
        this.setState({ check2Note: data[0].check2Note });
        this.setState({ check3Note: data[0].check3Note });
        this.setState({ check4Note: data[0].check4Note });
        this.setState({ check5Note: data[0].check5Note });
        this.setState({ check6Note: data[0].check6Note });
        this.setState({ check7Note: data[0].check7Note });
        this.setState({ check8Note: data[0].check8Note });
      });
  }

  createProject(event: any) {
    event.preventDefault();

    fetch(`http://localhost:3002/project/create`, {
      method: "POST",
      body: JSON.stringify({
        project: {
          projectName: this.state.projectName,
          check1: this.state.check1,
          check2: this.state.check2,
          check3: this.state.check3,
          check4: this.state.check4,
          check5: this.state.check5,
          check6: this.state.check6,
          check7: this.state.check7,
          check8: this.state.check8,
          check1Note: this.state.check1Note,
          check2Note: this.state.check2Note,
          check3Note: this.state.check3Note,
          check4Note: this.state.check4Note,
          check5Note: this.state.check5Note,
          check6Note: this.state.check6Note,
          check7Note: this.state.check7Note,
          check8Note: this.state.check8Note,
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
        this.state.check1 ? this.state.check1Note : [],
        this.state.check2 ? this.state.check2Note : [],
        this.state.check3 ? this.state.check3Note : [],
        this.state.check4 ? this.state.check4Note : [],
        this.state.check5 ? this.state.check5Note : [],
        this.state.check6 ? this.state.check6Note : [],
        this.state.check7 ? this.state.check7Note : [],
        this.state.check8 ? this.state.check8Note : [],
      ],
      "8n"
    );
    if (this.state.toggleOn) {
      Transport.start();
      start();
      sequence.start(0);
    } else {
      Transport.cancel();
    }
    console.log(this.state.toggleOn);
  }

  handleClick(d: any) {
    this.setState({ projectInfo: d });
    this.loadProject(d.projectName);
  }

  toggleDrop() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  check1OptionHandleChange(event: any) {
    this.setState({ check1Note: event.target.value });
  }

  check2OptionHandleChange(event: any) {
    this.setState({ check2Note: event.target.value });
  }

  check3OptionHandleChange(event: any) {
    this.setState({ check3Note: event.target.value });
  }

  check4OptionHandleChange(event: any) {
    this.setState({ check4Note: event.target.value });
  }

  check5OptionHandleChange(event: any) {
    this.setState({ check5Note: event.target.value });
  }

  check6OptionHandleChange(event: any) {
    this.setState({ check6Note: event.target.value });
  }

  check7OptionHandleChange(event: any) {
    this.setState({ check7Note: event.target.value });
  }

  check8OptionHandleChange(event: any) {
    this.setState({ check8Note: event.target.value });
  }

  render() {
    return (
      <div className="sequencer">
        <h4>{this.state.projectName}</h4>
        <div>
          <div className="content-container">
          <input
            className="checkbox"
            type="checkbox"
            onChange={() =>
              this.state.check1
                ? this.setState({ check1: false })
                : this.setState({ check1: true })
            }
            checked={this.state.check1}
          />
          <select
          className="selectbox"
            name="Note"
            id="note"
            value={this.state.check1Note}
            onChange={this.check1OptionHandleChange}
          >
            <option value="C3">C</option>
            <option value="C#3">C#</option>
            <option value="D3">D</option>
            <option value="D#3">D#</option>
            <option value="E3">E</option>
            <option value="F3">F</option>
            <option value="F#3">F#</option>
            <option value="G3">G</option>
            <option value="G#3">G#</option>
            <option value="A3">A</option>
            <option value="A#3">A#</option>
            <option value="B3">B</option>
          </select>
          <input
            className="checkbox"
            type="checkbox"
            onChange={() =>
              this.state.check2
                ? this.setState({ check2: false })
                : this.setState({ check2: true })
            }
            checked={this.state.check2}
          />
          <select
          className="selectbox"
            name="Note"
            id="note"
            value={this.state.check2Note}
            onChange={this.check2OptionHandleChange}
          >
            <option value="C3">C</option>
            <option value="C#3">C#</option>
            <option value="D3">D</option>
            <option value="D#3">D#</option>
            <option value="E3">E</option>
            <option value="F3">F</option>
            <option value="F#3">F#</option>
            <option value="G3">G</option>
            <option value="G#3">G#</option>
            <option value="A3">A</option>
            <option value="A#3">A#</option>
            <option value="B3">B</option>
          </select>
          <input
          className="checkbox"
            type="checkbox"
            onChange={() =>
              this.state.check3
                ? this.setState({ check3: false })
                : this.setState({ check3: true })
            }
            checked={this.state.check3}
          />
          <select
          className="selectbox"
            name="Note"
            id="note"
            value={this.state.check3Note}
            onChange={this.check3OptionHandleChange}
          >
            <option value="C3">C</option>
            <option value="C#3">C#</option>
            <option value="D3">D</option>
            <option value="D#3">D#</option>
            <option value="E3">E</option>
            <option value="F3">F</option>
            <option value="F#3">F#</option>
            <option value="G3">G</option>
            <option value="G#3">G#</option>
            <option value="A3">A</option>
            <option value="A#3">A#</option>
            <option value="B3">B</option>
          </select>
          <input
          className="checkbox"
            type="checkbox"
            onChange={() =>
              this.state.check4
                ? this.setState({ check4: false })
                : this.setState({ check4: true })
            }
            checked={this.state.check4}
          />
          <select
          className="selectbox"
            name="Note"
            id="note"
            value={this.state.check4Note}
            onChange={this.check4OptionHandleChange}
          >
            <option value="C3">C</option>
            <option value="C#3">C#</option>
            <option value="D3">D</option>
            <option value="D#3">D#</option>
            <option value="E3">E</option>
            <option value="F3">F</option>
            <option value="F#3">F#</option>
            <option value="G3">G</option>
            <option value="G#3">G#</option>
            <option value="A3">A</option>
            <option value="A#3">A#</option>
            <option value="B3">B</option>
          </select>
          <div>
            <input
            className="checkbox"
              type="checkbox"
              onChange={() =>
                this.state.check5
                  ? this.setState({ check5: false })
                  : this.setState({ check5: true })
              }
              checked={this.state.check5}
            />
            <select
            className="selectbox"
              name="Note"
              id="note"
              value={this.state.check5Note}
              onChange={this.check5OptionHandleChange}
            >
              <option value="C3">C</option>
              <option value="C#3">C#</option>
              <option value="D3">D</option>
              <option value="D#3">D#</option>
              <option value="E3">E</option>
              <option value="F3">F</option>
              <option value="F#3">F#</option>
              <option value="G3">G</option>
              <option value="G#3">G#</option>
              <option value="A3">A</option>
              <option value="A#3">A#</option>
              <option value="B3">B</option>
            </select>
            <input
            className="checkbox"
              type="checkbox"
              onChange={() =>
                this.state.check6
                  ? this.setState({ check6: false })
                  : this.setState({ check6: true })
              }
              checked={this.state.check6}
            />
            <select
            className="selectbox"
              name="Note"
              id="note"
              value={this.state.check6Note}
              onChange={this.check6OptionHandleChange}
            >
              <option value="C3">C</option>
              <option value="C#3">C#</option>
              <option value="D3">D</option>
              <option value="D#3">D#</option>
              <option value="E3">E</option>
              <option value="F3">F</option>
              <option value="F#3">F#</option>
              <option value="G3">G</option>
              <option value="G#3">G#</option>
              <option value="A3">A</option>
              <option value="A#3">A#</option>
              <option value="B3">B</option>
            </select>
            <input
            className="checkbox"
              type="checkbox"
              onChange={() =>
                this.state.check7
                  ? this.setState({ check7: false })
                  : this.setState({ check7: true })
              }
              checked={this.state.check7}
            />
            <select
            className="selectbox"
              name="Note"
              id="note"
              value={this.state.check7Note}
              onChange={this.check7OptionHandleChange}
            >
              <option value="C3">C</option>
              <option value="C#3">C#</option>
              <option value="D3">D</option>
              <option value="D#3">D#</option>
              <option value="E3">E</option>
              <option value="F3">F</option>
              <option value="F#3">F#</option>
              <option value="G3">G</option>
              <option value="G#3">G#</option>
              <option value="A3">A</option>
              <option value="A#3">A#</option>
              <option value="B3">B</option>
            </select>
            <input
            className="checkbox"
              type="checkbox"
              onChange={() =>
                this.state.check8
                  ? this.setState({ check8: false })
                  : this.setState({ check8: true })
              }
              checked={this.state.check8}
            />
            <select
              className="selectbox"
              name="Note"
              id="note"
              value={this.state.check8Note}
              onChange={this.check8OptionHandleChange}
            >
              <option value="C3">C</option>
              <option value="C#3">C#</option>
              <option value="D3">D</option>
              <option value="D#3">D#</option>
              <option value="E3">E</option>
              <option value="F3">F</option>
              <option value="F#3">F#</option>
              <option value="G3">G</option>
              <option value="G#3">G#</option>
              <option value="A3">A</option>
              <option value="A#3">A#</option>
              <option value="B3">B</option>
            </select>
          </div>
          </div>
          <h6>Pause and Replay to Update Playing Melody</h6>
          <Button onClick={this.toggle} className="Play-Pause">Play/Pause</Button>
          <h5>Save Your Project</h5>
          <Form onSubmit={this.createProject}>
            <FormGroup className="projectform">
              <Input
                onChange={(e) => this.setState({ projectName: e.target.value })}
                name="Project Name"
                value={this.state.projectName}
                required
                placeholder="My Project"
                minLength={4}
              />
            </FormGroup>
            <Button type="submit" className="SubmitButton">Save</Button>
          </Form>
          <h1>{this.state.projectResponse}</h1>
        </div>
        <div>
          <h5>Load Project</h5>
          <ButtonDropdown>
            <DropdownToggle
              className="Button"
              caret
              onClick={this.loadProjectList}
            >
              Load Saved Projects
            </DropdownToggle>
            <DropdownMenu className="releaseMenu">
              <DropdownItem header>Your Projects</DropdownItem>
              {this.state.projects.map((d: any) => (
                <DropdownItem className="ProjectButton" onClick={() => this.handleClick(d)}>
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

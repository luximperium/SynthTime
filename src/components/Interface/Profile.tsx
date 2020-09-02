import React, { Component } from "react";
import "../../App.css";
import {
  ModalBody,
  Modal,
  ModalHeader,
  Button,
  Form,
  Label,
  Input,
  FormGroup,
  FormFeedback,
} from "reactstrap";

interface sequencerState {
  username: string;
  profilePicSrc: string;
  modal: boolean;
  bio: string;
  sessionToken: string;
}

class Profile extends Component<any, sequencerState> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: "",
      profilePicSrc:
        "https://thepowerofthedream.org/wp-content/uploads/2015/09/generic-profile-picture.jpg",
      modal: false,
      bio: "",
      sessionToken: props.token,
    };
    this.toggle = this.toggle.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
  }

  componentDidMount() {
    fetch(`http://localhost:3002/users/myprofile/me`, {
      method: "GET",
      headers: new Headers({
        Authorization: this.state.sessionToken,
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.profilePicSrc === null) {
          this.setState({
            profilePicSrc:
              "https://thepowerofthedream.org/wp-content/uploads/2015/09/generic-profile-picture.jpg",
            bio: data.biography,
            username: data.username,
          });
        } else {
          this.setState({
            profilePicSrc: data.profilePicSrc,
            bio: data.biography,
            username: data.username,
          });
        }
      });
  }

  updateProfile(event: any) {
    event.preventDefault();

    fetch(`http://localhost:3002/users/updateprofile/bio`, {
      method: "PUT",
      body: JSON.stringify({
        user: {
          biography: this.state.bio,
          sessiontoken: this.state.sessionToken,
        },
      }),
      headers: new Headers({
        Authorization: this.state.sessionToken,
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });

    fetch(`http://localhost:3002/users/updateprofile/pic`, {
      method: "PUT",
      body: JSON.stringify({
        user: {
          profilePicSrc: this.state.profilePicSrc,
          sessiontoken: this.state.sessionToken,
        },
      }),
      headers: new Headers({
        Authorization: this.state.sessionToken,
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  toggle() {
    this.setState({ modal: !this.state.modal });
  }

  render() {
    return (
      <div className="content-container">
        <h1 className="YourProfileText">{this.state.username}</h1>
        <img className="profilePic" src={this.state.profilePicSrc}></img>
        <h3 className="bioHeader">About Me:</h3>
        <p className="bio">{this.state.bio}</p>
        <Button className="Button" onClick={this.toggle}>
          Update Profile
        </Button>

        <Modal
          className="updateprofilemodal"
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <h5>Update Profile</h5>
          <button
            type="button"
            className="close Button"
            aria-label="Close"
            onClick={this.toggle}
          >
            <span aria-hidden="true" className="CloseButton">Close</span>
          </button>
          <ModalBody>
            <Form onSubmit={this.updateProfile}>
              <FormGroup>
                <img
                  className="profilePic"
                  src={this.state.profilePicSrc}
                ></img>
                <h5 className="updatetext">
                  Link a Picture to Change Profile Picture:
                </h5>
                <Input
                  id="profilePicSrc"
                  onChange={(e) =>
                    this.setState({ profilePicSrc: e.target.value })
                  }
                  name="profilePicSrc"
                  placeholder="Link To Picture"
                />
                <FormFeedback></FormFeedback>
              </FormGroup>
              <FormGroup>
                <h5 className="updatetext">
                  Update Profile Bio (Limit of 255 characters):
                </h5>
                <textarea
                  inputMode="text"
                  id="bio"
                  onChange={(e) => this.setState({ bio: e.target.value })}
                  name="bio"
                  value={this.state.bio}
                  placeholder="Who are you?"
                />
                <FormFeedback></FormFeedback>
              </FormGroup>
              <Button type="submit" id="savechanges" className="Button">
                Save Changes
              </Button>
              <h4>
                Note: If you do not save changes and instead exit out, you will
                see your profile as if you saved changes, but on refresh of the
                page, it will revert back to the original state.
              </h4>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

export default Profile;

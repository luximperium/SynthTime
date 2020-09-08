import React, { Component } from "react";
import "../../App.css";
import { Col, Row } from "reactstrap";

interface AdminTypes {
  userinfo: any;
  selecteduserid: string;
  adminrole: false;
  selecteduseridfordeletion: string;
}

class AdminPortal extends Component<any, AdminTypes> {
  constructor(props: any) {
    super(props);
    this.state = {
      userinfo: [],
      selecteduserid: "",
      adminrole: false,
      selecteduseridfordeletion: "",
    };
    this.makeAdmin = this.makeAdmin.bind(this);
    this.takeAdmin = this.takeAdmin.bind(this);
    this.deleteAccount = this.deleteAccount.bind(this);
  }

  componentDidMount() {
    fetch(`http://localhost:3002/users/allusers/allusers`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          userinfo: data,
        });
        console.log(this.state.userinfo);
      });
  }

  makeAdmin() {
    fetch(`http://localhost:3002/users/allusers/${this.state.selecteduserid}`, {
      method: "PUT",
      body: JSON.stringify({
        user: {
          isAdmin: true,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        window.location.reload(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  takeAdmin() {
    fetch(`http://localhost:3002/users/allusers/${this.state.selecteduserid}`, {
      method: "PUT",
      body: JSON.stringify({
        user: {
          isAdmin: false,
        },
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        window.location.reload(true);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  selectUser(item: any) {
    this.setState({ selecteduserid: item.id });
  }

  selectUserDeletion(item: any) {
    this.setState({ selecteduseridfordeletion: item.id });
  }

  deleteAccount() {
    fetch(
      `http://localhost:3002/users/delete/${this.state.selecteduseridfordeletion}`,
      {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        window.location.reload(true);
      });
  }

  render() {
    return (
      <div className="home-content-container">
        <div>
          <h2 className="bio">Admin Granting:</h2>
          <table>
            <tr>
              <th className="bio">Username</th>
              <th className="bio">Admin Status</th>
            </tr>
            {this.state.userinfo.map((item: any) => (
              <tr>
                <td className="bio">{item.username}</td>
                <td className="bio">{String(item.isAdmin)}</td>
                <td>
                  <button
                    onClick={() => {
                      this.selectUser(item);
                    }}
                    className="Button"
                  >
                    Select User
                  </button>
                </td>
              </tr>
            ))}
          </table>
          <button className="Button" onClick={this.makeAdmin}>Give Admin</button>
          <button className="Button" onClick={this.takeAdmin}>Take Away Admin</button>
        </div>
        <div>
          <h2 className="bio">User Account Deletion</h2>
          <tr>
            <th className="bio">Username</th>
          </tr>
          {this.state.userinfo.map((item: any) => (
            <tr>
              <td className="bio">{item.username}</td>
              <td>
                <button
                  onClick={() => {
                    this.selectUserDeletion(item);
                  }}
                  className="Button"
                >
                  Select User
                </button>
              </td>
            </tr>
          ))}
          <button className="Button" onClick={this.deleteAccount}>Delete Forever</button>
        </div>
      </div>
    );
  }
}

export default AdminPortal;

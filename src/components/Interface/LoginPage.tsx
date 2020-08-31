import React, { Component, useEffect, useState } from 'react';
import "../../App.css";
import Auth from "../Auth/Auth"
import ProfilePage from "./Profile"

interface auth {
    sessionToken: string;
  }

class LoginPage extends Component<any> {
    state: auth;

    constructor(props: any) {
      super(props);
      this.state = { sessionToken: "" };
    }

    componentDidMount() {
        if (localStorage.getItem('token') === undefined){
            this.setState({sessionToken:'broken'});
        } else if (localStorage.getItem('token')) {
          this.setState({sessionToken: localStorage.getItem('token')})
        }
      };

    protectedViews() {
        return (this.state.sessionToken === localStorage.getItem('token') ? <ProfilePage token={this.state.sessionToken}/> : <Auth updateToken={this.props.updateToken}/>)
      }
render() {
    return (
        <div>
            {this.protectedViews()}
        </div>
    );
}
};

export default LoginPage;
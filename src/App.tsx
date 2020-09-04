import React, {Component} from "react";
import "./App.css";
import Header from "./components/Interface/Header";
import { BrowserRouter as Router } from "react-router-dom";

interface sessionTokenType {
  sessionToken: string;
}

class App extends Component<any> {
  state: sessionTokenType;

  constructor(props: any) {
    super(props);
    this.state = {sessionToken: ""};
    this.clearToken = this.clearToken.bind(this);
  }

  componentDidMount(){
    if (localStorage.getItem('token')){
      this.setState({ sessionToken: localStorage.getItem('token')});
    }
  }


  clearToken() {
    localStorage.clear();
    this.setState({ sessionToken: '' });
    alert("You've Logged Out!")
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Header clickLogout={this.clearToken} token={this.state.sessionToken} />
        </Router>
      </div>
    );
  }
}

export default App;

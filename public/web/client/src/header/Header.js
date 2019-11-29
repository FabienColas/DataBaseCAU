import React, { Component } from 'react';
import "./header.css"
import {Button, Icon} from "semantic-ui-react"
import Redirect from 'react-router-dom/Redirect';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disconnect: false,
    };
  }

  Disconnect = () => {
    this.setState(prevState => ({
      disconnect: true
    }));
    sessionStorage.setItem("user", "");
  }
  render() {
    console.log("sessonStroage=", sessionStorage.getItem("user"))
    // if (this.state.disconnect || !sessionStorage.getItem("user"))
    //   return <Redirect to="/login"/>
    return (
      <div className="header">
        <div className="profile">
          <Icon className="profile-icon" name="user" size="large"/>&ensp;{sessionStorage.getItem("user") ? sessionStorage.getItem("user") : "Guest"}
        </div>
        <Button onClick={this.Disconnect} className="Deco-button">Déconnexion <Icon className="deco-icon" name="log out"/></Button>
      </div>
    );
  }
}

export default Header;
import React, { Component } from 'react';
import Services from "../Services/Services"

import {Menu, Divider} from "semantic-ui-react"
import "./sidebar.css"

import Redirect from 'react-router-dom/Redirect';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'



class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "Dashboard",
      redirect: false
    };
  }

  handleItemClick = (e, {name}) => {
    if (name !== this.state.activeItem) {
      this.setState({activeItem: name})
      this.setState({redirect: true})
    }
  }

  render() {
    if (this.state.redirect) {
      this.setState({redirect: false})
      if (this.state.activeItem === "Dashboard")
        return <Redirect to="/home"/>
      else if (this.state.activeItem === "Services")
        return <Redirect to="/home/services"/>
    }
    return (
      <div className="sidebar-parent">
        	<div className="sidebar">
            <Menu pointing secondary vertical className="sidebar-menu">
              <Menu.Item className="menu-item" name='Dashboard' active={this.state.activeItem === 'Dashboard'} onClick={this.handleItemClick}/>
              <Divider fitted/>
              <Menu.Item className="menu-item" name='Services' active={this.state.activeItem === 'Services'} onClick={this.handleItemClick}/>
              <Divider fitted/>
              <Menu.Item className="menu-item" name='Paramètres' active={this.state.activeItem === 'Paramètres'} onClick={this.handleItemClick}/>
            </Menu>
        	</div>
          <div>
              <Route exact path="/home/services" component={Services} />
          </div>
      </div>
    );
  }
}

export default Sidebar;
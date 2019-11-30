import React, { Component } from 'react';

import {Menu, Divider} from "semantic-ui-react"
import "./sidebar.css"


class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: "All",
    };
  }

  handleItemClick = (name) => {
    if (name !== this.state.activeItem) {
      this.setState({activeItem: name})
    }
    this.props.updateCategory(name);
  }

  render() {
    return (
      <div className="sidebar-parent">
        	<div className="sidebar">
            <Menu pointing secondary vertical className="sidebar-menu">
              <Menu.Item className="menu-item" name='All' active={this.state.activeItem === 'All'} onClick={() => this.handleItemClick("All")}/>
              <Divider fitted/>
              <Menu.Item className="menu-item" name='Burgers' active={this.state.activeItem === 'Burgers'} onClick={() => this.handleItemClick("Burgers")}/>
              <Divider fitted/>
              <Menu.Item className="menu-item" name='Sides' active={this.state.activeItem === 'Sides'} onClick={() => this.handleItemClick("Sides")}/>
              <Divider fitted/>
              <Menu.Item className="menu-item" name='Desserts' active={this.state.activeItem === 'Desserts'} onClick={() => this.handleItemClick("Desserts")}/>
              <Divider fitted/>
              <Menu.Item className="menu-item" name='Drinks' active={this.state.activeItem === 'Drinks'} onClick={() => this.handleItemClick("Drinks")}/>
            </Menu>
        	</div>
      </div>
    );
  }
}

export default Sidebar;
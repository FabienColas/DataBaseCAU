import React, { Component } from 'react';
import "./Home.css"
import WidgetMeteo from "../widgets/meteo/WidgetMeteo"
import {Icon} from "semantic-ui-react"

import Sidebar from "../sidebar/Sidebar"
import Services from "../Services/Services"


import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'


// import {Grid} from "semantic-ui-react"

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      city: "",
      lang: "",
      widgets: []
    }
  }

  // fetchAPI = (city, lang) => {
  //   fetch("http://api.openweathermap.org/data/2.5/weather?&lang="+ lang + "&q=" + city + "&appid=70065eef9ebe95939750966d871ed1a8").then(res => res.json()).then(data => this.setState({data}));
  // }

  componentDidMount() {
    fetch("http://localhost:8080/api/getuserWidgets/" + sessionStorage.getItem("user")).then(res => res.json()).then(widgets => this.setState({widgets}));
  }

  putWidgets = (widgets) => {
    var tab = [];
    // products.map((product) => (
    //   <Item key={product.key}>
    //   )
  }

  render() {
    var keys = []
    var i = 0;
    // keys = Object.keys(this.state.widgets.data)
    return (
      <div className="sidebar-core">
      <div className="home">
      <Route path="/home" component={Sidebar}/>
      <Switch>
        <Route exact path="/home/services" component={Services}/>
        {/* <Route exact path="/" component={App}/> */}
      </Switch>
      {console.log("WTF:", this.state.widgets)}
        {(this.state.widgets.data) ? (
          <div>
          {console.log("wiidget: ", this.state.widgets.data)}
          <div className="secret">
          {keys = Object.keys(this.state.widgets.data)}
          </div>
			      <div className="header-container">
					    <h2 className="h-title">Mon Dashboard</h2>
				    </div>
            <div className="widgets-container">
              {
                keys.map((id) => (
                  <div className="widget-item"><WidgetMeteo city={this.state.widgets.data[id].city} lang={this.state.widgets.data[id].lang}/></div>
                ))
              }
              {/* <div className="widget-item"><WidgetMeteo city={this.state.widgets.data[keys[0]].city} lang={this.state.widgets.data[keys[0]].lang}/></div> */}
            </div>
          </div>) :
        (<Icon loading size="huge" name="spinner"/>)}
      </div>
    </div>
    );
  }
}

export default Home;
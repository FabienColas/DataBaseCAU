import React, { Component } from 'react';
import "./WidgetMeteo.css"

import {Icon} from "semantic-ui-react"

class WidgetMeteo extends Component {
constructor(props) {
  super(props);
  this.state = {
	  city: this.props.city,
	  lang: this.props.lang,
	  test: []
  };
}

componentDidMount() {
	fetch("http://api.openweathermap.org/data/2.5/weather?&lang="+ this.props.lang + "&q=" + this.props.city + "&appid=70065eef9ebe95939750966d871ed1a8").then(res => res.json()).then(data => this.setState({data}));
}

render() {
	console.log("data:", this.state.data);
	return (
		<div className="widget-container">
		{(this.state.data && this.state.data.weather) ? (
			<div>
				<div className="widget-title"><h1 className="title">{this.state.data.name}</h1></div>
				<div className="widget-main-info">
					<div className="widget-icon"> <img className="widget-icon-img" alt="icon-weather" src={"https://openweathermap.org/img/w/" + this.state.data.weather[0].icon + ".png"}/> </div>
					<div className="widget-temp">{(this.state.data.main.temp - 273.15).toFixed(2)}°C</div>
				</div>
				<div className="widget-secondary-info">
					{this.state.data.weather[0].description}
				</div>
			</div>
			) : (<Icon loading size="huge" name="spinner"/>)}
	  	</div>
    );
  }
}

export default WidgetMeteo;
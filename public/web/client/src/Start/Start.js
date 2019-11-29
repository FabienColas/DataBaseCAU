import React, { Component } from 'react';
import "./Start.css"
import {Image, Header} from "semantic-ui-react"

import logo from '../media/mcdo_logo.png';

// import {Grid} from "semantic-ui-react"

class Start extends Component {
  constructor(props) {
    super(props)
    this.state = {
			options: false,
    }
	}
	
	goToOptions = (bornId) => {
		console.log("bornId:", bornId);
		sessionStorage.setItem("bornId", bornId);
		this.setState({options: true});
  }

  componentDidMount() {
    //fetch("http://localhost:8080/api/getuserWidgets/" + sessionStorage.getItem("user")).then(res => res.json()).then(widgets => this.setState({widgets}));
	}
	
	goBack = () => {
		this.setState({options: false});
	}

	proceed = (takeout) => {
		sessionStorage.setItem("takeout", takeout);
		console.log("sessionStorage get item takeout:", sessionStorage.getItem("takeout"));
    this.props.history.push("/home");
	}

  render() {
    // keys = Object.keys(this.state.widgets.data)
    return (
			<div className="parent">
				{this.state.options ? (
					<div className="start options">
						<div className="options-container">
							<div className="options-box" onClick={() => this.proceed(true)}>
								<p>TAKE OUT</p>
							</div>
							<div className="options-box" onClick={() => this.proceed(false)}>
								<p>EAT IN</p>
							</div>
						</div>
						<div className="button go-back" onClick={this.goBack}>
							BACK
						</div>
					</div>
				) : (
				<div className="start">
				<Image className="zebi2" src={logo} size='medium'/>
        <div className="born-container">
					<div className="born-item" onClick={() => this.goToOptions(1)}>
						<div className="zebi-box"></div>
						<p>#<span className="bigSize">1</span></p>
					</div>
					<div className="born-item" onClick={() => this.goToOptions(2)}>
						<div className="zebi-box"></div>
						<p>#<span className="bigSize">2</span></p>
					</div>
					<div className="born-item" onClick={() => this.goToOptions(3)}>
						<div className="zebi-box"></div>
						<p>#<span className="bigSize">3</span></p>
					</div>
					<div className="born-item" onClick={() => this.goToOptions(4)}>
						<div className="zebi-box"></div>
						<p>#<span className="bigSize">4</span></p>
					</div>
					<div className="born-item" onClick={() => this.goToOptions(5)}>
						<div className="zebi-box"></div>
						<p>#<span className="bigSize">5</span></p>
					</div>
        </div>
				<h3 className="title">Choose your command machine</h3>
      </div>
			)}
			</div>
    );
  }
}

export default Start;
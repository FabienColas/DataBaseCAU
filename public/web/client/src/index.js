import React from 'react';
import ReactDOM from 'react-dom';
import "semantic-ui-css/semantic.min.css"

import Header from "./header/Header"
import Footer from "./footer/Footer"
import Sidebar from "./sidebar/Sidebar"
import Home from "./Home/Home"
import Login from "./Login/Login"
import Start from "./Start/Start"
import Services from "./Services/Services"



import './index.css';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import * as serviceWorker from './serviceWorker';
// import Redirect from 'react-router/Redirect';

if (!sessionStorage.getItem("user"))
	sessionStorage.setItem("user", "");

const displayInId = (id) => (document.getElementById(id))

ReactDOM.render(
	<Router>
		<div className="core">
			<Route exact path="/" component={Start}/>
			<Route exact path="/login" component={Login}/>
			<Route path="/home" component={Header}/>
			<Route exact path="/home" component={Home}/>
			<Route path="/home" component={Footer}/>
		</div>
	</Router>,
        displayInId("root")
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

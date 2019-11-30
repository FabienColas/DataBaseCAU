import React, { Component } from 'react';
import "./Dashboard.css"
import {Image} from "semantic-ui-react"
import ItemCard from "../ItemCard/ItemCard"


// import {Grid} from "semantic-ui-react"

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
            items: [],
        }
	}

    componentDidMount() {
        this.getCommands();
    }

    getCommands = () => {
        fetch("http://localhost:8001/api/getAllProducts/").then(res => res.json()).then(items =>  {
		// this.setState({items: items});
		// this.organize(items);
		// console.log("items:", items);
	    });
    }

	totalPrice = () => {
		// this.totalP = 0;
		// this.items.map(item => {
		// 	this.totalP += item.price;
		// })
		// return this.totalP.toFixed(2);
	}

  render() {
    return (
		<div className="dashboard-parent">
            aezae;
        </div>
    );
  }
}

export default Dashboard;
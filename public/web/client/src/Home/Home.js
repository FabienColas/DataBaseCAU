import React, { Component } from 'react';
import "./Home.css"
import {Icon} from "semantic-ui-react"

import Sidebar from "../sidebar/Sidebar"
import ItemCard from "../ItemCard/ItemCard"



// import {Grid} from "semantic-ui-react"

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
		category:"All",
		items: [],
	};
	this.current =[];
	this.burgers = [];
	this.sides = [];
	this.desserts = [];
	this.beverages = [];
  }

  componentDidMount() {
	console.log("USER:", sessionStorage.getItem("user"));
	console.log("takeout:", sessionStorage.getItem("takeout"));
	console.log("bornId:", sessionStorage.getItem("bornId"));
	this.getAllProducts();
	console.log("items:", this.state.items);
  }

  getAllProducts = () => {
	fetch("http://localhost:8001/api/getAllProducts/").then(res => res.json()).then(items =>  {
		this.setState({items: items});
		this.organize(items);
		console.log("items:", items);
	});
  }

  getCategory = () => {
	this.current = this.state.items;
	if (this.state.category === "All") {
		this.current = this.state.items.data;
	}
	if (this.state.category === "Burgers") {
		this.current = this.burgers;
	}
	else if (this.state.category === "Desserts") {
		this.current = this.desserts;
	}
	else if (this.state.category === "Sides") {
		this.current = this.sides;
	}
	else if (this.state.category === "Drinks") {
		this.current = this.beverages;
	}
	  return (
		this.current.map((item) => (
		<ItemCard key={item.id} data={item}/>
	)));
  }

  organize = (items) => {
	items.data.map(item => {
		console.log('item:', item);
			if (item.type_name === "Burgers") {
				this.burgers.push(item);
			}
			else if (item.type_name === "Sides") {
				this.sides.push(item);
			}
			else if (item.type_name === "Dessert") {
				this.desserts.push(item);
			}
			else if (item.type_name === "Beverages") {
				this.beverages.push(item);
			}
	});
	console.log('all:', this.state.items);
	console.log('burgers:', this.burgers);
	console.log('sides:', this.sides);
	console.log('desserts:', this.desserts);
	console.log('beverages:', this.beverages);
  }

  updateCategory = (category) => {
	console.log("category updated");
	this.setState({category: category})
  }

  render() {
    return (
      	<div className="sidebar-core">
        	<Sidebar updateCategory={this.updateCategory} />
        	<div className="home">
        		{(this.state.items.data) ? (
        	    	<div className="items-container2">
        	      		{
							this.getCategory()
        	      		}
        	    	</div>)
				:
        	  	(<div className="spinner-parent">
        			<Icon className="my_spinner" loading size="huge" name="spinner"/>
        	  	</div>)}
      		</div>
    	</div>
    );
  }
}

export default Home;
import React, { Component } from 'react';
import "./Command.css"
import {Image} from "semantic-ui-react"
import ItemCard from "../ItemCard/ItemCard"


// import {Grid} from "semantic-ui-react"

class Command extends Component {
  constructor(props) {
    super(props)
    this.state = {
			dispTicket: false,
        }
	this.items = JSON.parse(sessionStorage.getItem("command"));
	this.totalP = 0;
	console.log("items commands:", this.items);
	}
	
	goBack = () => {
        this.props.history.push("/home");
	}

	proceed = () => {
		this.setState({dispTicket: true});
	}

	totalPrice = () => {
		this.totalP = 0;
		this.items.map(item => {
			this.totalP += item.price;
		})
		return this.totalP.toFixed(2);
	}

	updated = () => {
		this.items = JSON.parse(sessionStorage.getItem("command"));
		this.forceUpdate();
	}

	finish = () => {
		sessionStorage.setItem("command", []);
		sessionStorage.setItem("bornId", "");
		sessionStorage.setItem("takeout", "");
        this.props.history.push("/");
	}

  render() {
    // keys = Object.keys(this.state.widgets.data)
    return (
			<div className="parent-command">
				{this.state.dispTicket ? (
					<div className="command-ticket">
						Ticket:
						<div className="ticket-number">
							#352
						</div>
						<div className="ticket-next" onClick={this.finish}>
							finish
						</div>
					</div>
				) : (
				<div className="command-container">
					<div className="command-buttons">
						<div className="button card-button-add command_b" onClick={this.goBack}>BACK</div>
						<h3 className="command-title">Your command</h3>
					<div className="button card-button-add command_b" onClick={this.proceed}>PAY</div>
					</div>
					<div className="totalP">Total: {this.totalPrice()} €</div>
					<div>
					{
						this.items.lenght ? <div>Your command is empty</div> :
						this.items.map((item) => (
							<ItemCard key={item.id} data={item} command={true} update={this.updated}/>
						))
					}
					</div>
      			</div>
			)}
			</div>
    );
  }
}

export default Command;
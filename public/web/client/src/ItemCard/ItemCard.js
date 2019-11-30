import React, { Component } from 'react';
import "./ItemCard.css"
import {Image} from "semantic-ui-react"

class ItemCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
	}
  }

  componentDidMount() {
  }

  addToCart = (item) => {
	  let tmp = sessionStorage.getItem("command");
	  let tab = JSON.parse(tmp);
	  if (!tmp) {
		tab = [];
	  }
	  tab.push(item);
	  sessionStorage.setItem("command", JSON.stringify(tab));
  }

  removeFromCart = (item) => {
	let tmp = sessionStorage.getItem("command");
	let tab = JSON.parse(tmp);
	for(var i = tab.length - 1; i >= 0; i--) {
		if(tab[i].id === item.id) {
		   tab.splice(i, 1);
		}
	}
	sessionStorage.setItem("command", JSON.stringify(tab));
	this.props.update();
}

  render() {
    return (
        <div className="item-card">
            <Image src={this.props.data.name} size='small'/>
            <div className="card-info">
                <div className="ci-name">
			        {this.props.data.name}
                </div>
                <div>
                    <span className="ci-price">{this.props.data.price}</span> €
                </div>
            </div>
			{
				!this.props.command ? (
            		<div className="button card-button-add" onClick={() => this.addToCart(this.props.data)}>
            	    	ADD
            		</div>
				) : (
					<div className="button card-button-remove" onClick={() => this.removeFromCart(this.props.data)}>
            	    	REMOVE
            		</div>
				)
			}
		</div>
    );
  }
}

export default ItemCard;
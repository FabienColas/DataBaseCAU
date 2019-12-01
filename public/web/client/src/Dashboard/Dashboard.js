import React, { Component } from 'react';
import "./Dashboard.css"
import {Tab, Icon} from "semantic-ui-react"


// import {Grid} from "semantic-ui-react"

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {
            items: [],
            loading: true,
        }
        this.ready = [];
        this.preparing = [];
	}

    componentDidMount() {
        this.getCommands();
    }

    //get all commands
    getCommands = () => {
        this.setState({loading: true})
        fetch("http://localhost:8001/api/getAllCommandsContent").then(res => res.json()).then(items =>  {
		    console.log("items:", items.data);
            this.setState({items: items.data});
            this.organizeByStatus()
	    });
    }

    organizeByStatus = () => {
        // DECOMMENT THIS CODE when real api call is ready

         this.state.items.map(item => {
             if (item.confirmed === 1) {
                 this.ready.push(item);
             }
             else if (item.confirmed === 0) {
                 this.preparing.push(item);
             }
         })

        //this.preparing = [
            /*{total_price: 30.23, order_id: 51, user: null, products:[{name:"lol"}, {name:"lol2"}, {name:"burger cheeser"}, {name:"ohohohoho"}] },
            {total_price: 30.23, order_id: 52, user: null, name:[{name:"lol"}, {name:"lol2"}, {name:"burger cheeser"}] },
            {total_price: 35.23, order_id: 53, user: null, products:[{name:"lol"}, {name:"lol2sdfgsdfgsdfgdfgs"}, {name:"burger cheeser"}, {name:"ohohohoho"}] },
            {total_price: 30.23, order_id: 54, user: null, products:[{name:"lol"}, {name:"lol2"}, {name:"burger cheeser"}, {name:"ohohohoho"}] },
            {total_price: 32.23, order_id: 55, user: "zebi", products:[{name:"lol"}, {name:"lol2fdsfgdfgdf"}, {name:"ohohohoho"}] },*/
        //]
        //this.ready = [
            /*{total_price: 40.23, order_id: 57, user: null, products:[{name:"lazeazeazazel"}, {name:"lol2"}, {name:"burger cheeser"}, {name:"ohohoghoho"}] },
            {total_price: 50.23, order_id: 59, user: null, products:[{name:"zebi"}, {name:"lozeeeel2"}, {name:"burger cheeser"}] },*/
        //]
        console.log("ready:", this.ready);
        console.log("preparing:", this.preparing);
        this.setState({loading:false});
    }

    confirmOrder = (id) => {
        //le body peut etre null, c'est juste la confirmation
        fetch('http://localhost:8001/api/confirmOrder/' + id, {
			method: 'PUT',
			body: null,
			headers: {
			  "Content-type": "application/json; charset=UTF-8"
			}
		}).then(response => {
			console.log("res:",response);
				return response.json()
		}).then(json => {
			console.log('json;',json)
            //on re get les commandes updated
            this.getCommands();
		})
    }

  render() {
    const panes = [
        { menuItem: 'PREPARING', render: () => {
            return (
                <div className="tab-container">
                    {
                        this.state.loading ? (<div className="spinner-parent"><Icon className="my_spinner" loading size="huge" name="spinner"/></div>)
                        :
                        this.preparing.map(item => {
                            return (
                                <div key={item.order_id} className="order-parent">
                                    <div className="order-meta">
                                        <div className="order-id">id: <span className="order-value">{item.order_id}</span></div>
                                        <div className="order-user">from: <span className="order-value">{item.user ? item.user : "guest"}</span></div>
                                        <div className="order-price">total: <span className="order-value">{item.total_price}</span></div>
                                    </div>
                                    <div className="order-products">Products:
                                        {
                                        item.products.map(itemm => { return <div className="or-products"><span className="order-value">{itemm.name}</span></div> })
                                        }
                                    </div>
                                    <div className="button order-button" onClick={() => this.confirmOrder(item.order_id)}>done</div>
                                </div>
                            )
                        })
                    }
                </div>
            )
        }},
        { menuItem: 'READY', render: () => {
            return (
                <div className="tab-container">
                    {
                        this.state.loading ? (<div className="spinner-parent"><Icon className="my_spinner" loading size="huge" name="spinner"/></div>)
                        :
                        this.ready.map(item => {
                            return (
                                <div key={item.order} className="order-parent">
                                    <div className="order-meta">
                                        <div className="order-id">id: <span className="order-value">{item.order_id}</span></div>
                                        <div className="order-user">from: <span className="order-value">{item.user ? item.user : "guest"}</span></div>
                                        <div className="order-price">total: <span className="order-value">{item.total_price}</span></div>
                                    </div>
                                    <div className="order-products">Products:
                                        {
                                        item.products.map(itemm => { return <div className="or-products"><span className="order-value">{itemm.name}</span></div> })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            )
        }},
      ]
    return (
		<div className="dashboard-parent">
            <h3 className="title">DASHBOARD</h3>
            <div>
                <Tab panes={panes} />
            </div>
        </div>
    );
  }
}

export default Dashboard;
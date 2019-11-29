import React, { Component } from 'react';
import "./services.css"
import WidgetMeteo from "../widgets/meteo/WidgetMeteo"
import {Divider, Button, Form} from "semantic-ui-react"

// import {Grid} from "semantic-ui-react"

class Services extends Component {
  constructor(props) {
    super(props)
    this.state = {
      city: "",
      lang: ""
    }
  }

  handleCity = (event) => {
    this.setState({city: event.target.value})
  }

  handleLang = (event) => {
    this.setState({lang: event.target.value})
  }

  addWidget = () => {
    if (!this.state.city || !this.state.lang) {
      alert("Veuillez remplir les champs d'ajout du widget météo");
      return;
    }
    console.log("city:", this.state.city)
    console.log("lang:", this.state.lang)
    fetch("http://localhost:8080/api/adduserWidget/" +
        sessionStorage.getItem("user") + "/" +
        this.state.city + "/" +
        this.state.lang)
    console.log("added widget to user'sdb")
  }

  render() {
    return (
      <div className="services">
        <div className="header-container">
	        <h2 className="h-title">Nos Services</h2>
	      </div>
        <h2>Météo:</h2>
        <div className="widgets-container">
          <div className="widget-item"><WidgetMeteo city={"Nice"} lang={"fr"}/></div>
          <div className="widget-item br"><WidgetMeteo city={"London"} lang={"en"}/></div>
          <div className="widget-item"><WidgetMeteo city={"Minsk"} lang={"ru"}/></div>
        </div>
        <div className="add-widget-div">
          <Form className="form-widget">
            <Form.Group>
              <Form.Input
                onChange={this.handleCity}
                label='Ville'
                placeholder='rentrez la ville'
              />
              <Form.Input
                onChange={this.handleLang}
                label='Langue'
                placeholder='choisissez la langue'
              />
            </Form.Group>
          </Form>
          <Button onClick={this.addWidget} className="button-add">Ajouter ce widget</Button>
        </div>
        <Divider/>
        <h2>Cinéma:</h2>
        </div>
    );
  }
}

export default Services;
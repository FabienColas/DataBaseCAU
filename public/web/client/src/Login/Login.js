import React, { Component } from 'react';
import {Button, Form, Checkbox} from "semantic-ui-react"
// import {Link} from "react-router-dom"
import './Login.css';
import Redirect from 'react-router-dom/Redirect';
// import FacebookAuth from "react-facebook-auth"

// sessionStorage.removeItem("user");
class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pseudo: "",
      password: "",
      password2: "",
      conditions: false,
      redirect: false,
      lastUserID:0
    };
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePseudo = this.handlePseudo.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handlePassword2 = this.handlePassword2.bind(this);
    this.handleCondition = this.handleCondition.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.pseudoExists = this.pseudoExists.bind(this);
  }

  handleEmail(event) {
    this.setState({email: event.target.value})
  }

  handlePseudo(event) {
    this.setState({pseudo: event.target.value})
  }

  handlePassword(event) {
    this.setState({password: event.target.value})
  }

  handlePassword2(event) {
    this.setState({password2: event.target.value})
  }

  handleCondition() {
    this.setState(prevState => ({
      conditions: !this.state.conditions
    }));
  }

  pseudoExists()
  {
    // const users = this.props.users.data
    // if (users[this.state.pseudo])
      return false;
  }

  handleSignUp() {
//     var users = this.getUsers();
    if (this.state.password !== this.state.password2)
      alert("Your passwords doesn't match");
    else if (!this.state.password)
      alert("Empty password !");
    else if (!this.state.pseudo)
      alert("Empty pseudo !");
    else if (!this.state.email)
      alert("Empty email !");
    else if (!this.state.conditions)
      alert("You must accept the conditions !");
    else if (this.pseudoExists(this.state.pseudo))
        alert("Le pseudo " + this.state.pseudo + " est déjà pris !");
    else {

      // fetch("http://localhost:8080/api/adduser/" + 
      //   this.state.email + "/" +
      //   this.state.pseudo + "/" +
      //   this.state.password).then(console.log("user added to db."));
      //   sessionStorage.setItem("user", (this.state.pseudo));
      //   this.setState(prevState => ({
      //   redirect: true
      // }));
      this.setState(prevState => ({
        redirect: true
      }));
    }
  }

  render(){
    if (this.state.redirect || this.props.fb)
      return (<Redirect to="/home"/>)
    return(
      <div className="SignUp">
        <Form onSubmit={this.handleSignUp}>
          <Form.Field>
            <label>Email</label>
            <input placeholder="type your email" onChange={this.handleEmail} className="myform"/>
          </Form.Field>
          <Form.Field fluid>
            <label>Pseudo</label>
            <input placeholder="type your pseudo" className="myform" onChange={this.handlePseudo}/>
          </Form.Field>
          <Form.Field type="password">
            <label>Password</label>
            <input type="password" placeholder="password" className="myform" onChange={this.handlePassword}/>
            <input id="PWD" type="password" placeholder="confirm password" className="myform" onChange={this.handlePassword2}/>
          </Form.Field>
          <Form.Field>
            <Checkbox label="I accept the general conditions" onChange={this.handleCondition}/>
          </Form.Field>
          <Button type='submit'>S'inscrire</Button>
        </Form>
      </div>
    );
  }
}

class LogIn extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pseudo: "",
      password: "",
      redirect: false,
      users: []
    };
    this.handlePseudo = this.handlePseudo.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
    this.pseudoExists = this.pseudoExists.bind(this);
    this.authentificationCheck = this.authentificationCheck.bind(this);
  }

  handlePseudo(event) {
    // console.log(event.target.value);
    this.setState({pseudo: event.target.value})
  }

  handlePassword(event) {
    // console.log(event.target.value);
    this.setState({password: event.target.value})
  }

  pseudoExists()
  {
    // const users = this.props.users.data
    // if (users[this.state.pseudo])
    return true;
  }

  authentificationCheck()
  {
    // if (this.props.users.data[this.state.pseudo].password === this.state.password)
    //   return true
    return true;
  }

  handleLogIn(event) {
    // fetch("http://localhost:8080/api/getusers
    if (!this.state.pseudo)
      alert("Fill your pseudo")
    else if (!this.state.password)
      alert("Choose your password")
    else if (!this.pseudoExists())
      alert("the pseudo " + this.state.pseudo + " doesn't  exists!");
    else if (this.authentificationCheck()){
      sessionStorage.setItem("user", (this.state.pseudo));
      this.setState({redirect: true});
    }
    else {
        alert("Wrong password, try again.");
    }
  }

  render(){
    if (this.state.redirect || this.props.fb)
      return <Redirect to="/home"/>
    return(
      <div className="LogIn">
        <Form onSubmit={this.handleLogIn}>
          <Form.Field>
            <label>Pseudo</label>
            <input placeholder="Type your password" className="myform" onChange={this.handlePseudo}/>
          </Form.Field>
         <Form.Field type="password">
          <label>Mot de Passe</label>
          <input type="password" placeholder="password" className="myform" onChange={this.handlePassword}/>
        </Form.Field>
        <Button type='submit'>Se connecter</Button>
        </Form>
       </div> 
    );
  }
}

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loginState: true,
      email: "",
      pseudo: "",
      password: "",
      password2: "",
      redirect: false
    };
    this.changeState = this.changeState.bind(this);
    this.isActive = this.isActive.bind(this);
  }

  componentDidMount()
  {
    //fetch("http://localhost:8080/api/getusers").then(res => res.json()).then(users => this.setState({users}));
  }
  changeState(login)
  {
    // console.log("clicked");
    if (login)
    {
      this.setState(prevState => ({
        loginState: true
      }));
    }
    else
    {
      this.setState(prevState => ({
        loginState: false
      }));
    }
  }

  isActive(login)
  {
    if (this.state.loginState && login)
    {
      return ("active")
    }
    else
    {
      return ("desactive")
    }
  }

  render() {
    return (
      <div className="App">
        <div className="Login-container">
          <div className="Labels">
              <label id="LoginLabel" className={this.state.loginState ? "active" : ""} onClick={() => this.changeState(true)}>Login</label>
              <label id="SignupLabel"  className={this.state.loginState ? "" : "active"} onClick={() => this.changeState(false)}>Sign Up</label>
            </div>
          <div className="Connect-Form">
            {this.state.loginState ? <LogIn users={this.state.users} fb={this.state.redirect}/> : <SignUp users={this.state.users} fb={this.state.redirect}/>}
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
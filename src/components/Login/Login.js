import React, { Component } from "react";
import logo from "./../Images/logo.png";
import './Login.css'

class Login extends Component {
  render() {
    return (
      <div className="root">
        <div className="login_container">
          <img className="helo_logo" src={logo} alt="" />
          <h1 className="login__app_name">Helo</h1>
          <a className="login_button" href={process.env.REACT_APP_LOGIN}>
            Login/Register
          </a>
        </div>
      </div>
    );
  }
}


export default Login

import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Search.css";
import house from "./../Images/house.png";
import search from "./../Images/search.png";

class Search extends Component {
  componentDidMount() {
    axios
      .get("/checkLoggedIn")
      .then()
      .catch(res => {
        console.log("error");
        this.props.history.push("/");
      });
  }
  render() {
    return (
      <div className="search_root">
        <div className="dashboard_header">
          <div className="left_header">
            <p className="dashboard_header_helo">Helo</p>
            <Link  to='/Dashboard'><img className="search_icon" src={house} alt="house logo" /></Link>
            <img className="search_icon" src={search} alt="search" />
          </div>
          <p className="dashboard_link"> Dashboard</p>
          <a className="logout_button" href="http://localhost:3005/auth/logout">
            Logout
          </a>
        </div>
      </div>
    );
  }
}

export default Search;

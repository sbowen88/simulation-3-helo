import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import house from "./../Images/house.png";
import search from "./../Images/search.png";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

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
      <div className="dashboard_root">
        <div className="dashboard_header">
          <div className="left_header">
            <p className="dashboard_header_helo">Helo</p>
            <img src={house} alt="house logo" />
            <Link  to='/search'><img className='search_icon' src={search} alt="search" /></Link>
          </div>
          <p className="dashboard_link">  Dashboard</p>
          <a className="logout_button" href="http://localhost:3005/auth/logout">
            Logout
          </a>
        </div>
        <div className="display_user_container">
          <div className="user_container">
            <div className="user_img_container">
              <img
                src=""
                alt="user profile img"
                className="user_img"
              />
            </div>
            <div className="user_info_container">
              <span className="user_text">First name</span>
              <br />
              <span className="user_text">Last Name</span>
              <br />
              <Link to="/profile">
                <button type="" className="edit_button">
                  Edit Profile
                </button>
              </Link>
            </div>
          </div>
          <div className="welcome_parent_container">
            <div className="welcome_text_containter">
              <p className='welcome_text'>
                Welcome to Helo! Find recommended friends based on your
                similarities, and even search for them by name. The more you
                update your profile, the better recommendations we can make!
              </p>
            </div>
          </div>
        </div>
        <div className="recommended_friends_parent_container">
          <div className="recommended_friends_header">
            <div className="recommended_friends_title">Recommended Friends</div>
            <div className="sorted_by_parent">
              Sorted by <button className="sorted_by_dropdown" />
            </div>
            {/* recommended friends will populate here */}
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;

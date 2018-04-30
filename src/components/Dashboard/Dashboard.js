import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import house from "./../Images/house.png";
import search from "./../Images/search.png";
import Pagination from "react-js-pagination";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      activePage: 1,
      sort_parameter: "",
      users: []
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
    this.getUserInfo();
  }
  handleChange(prop, val) {
    this.setState({ [prop]: val });
  }
  getUserInfo() {
    axios.get("/getUserInfo").then(resp => this.setState({ user: resp.data }));
  }
  getRecommended() {
    axios
      .get(`getRecommended/${this.state.sort_parameter}`)
      .then(resp => this.setState({ users: resp.data }));
  }
  changeFriendStatus(index) {
    this.setState({ users: ![index].friend_status });
    let body = {
      friend_status: this.state.users[index].friend_status
    };
    axios.put("/changefriend_status", body).then(req => {});
    this.getRecommended();
  }
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }

  render() {
    console.log(this.state.user);
    return (
      <div className="dashboard_root">
        <div className="dashboard_header">
          <div className="left_header">
            <p className="dashboard_header_helo">Helo</p>
            <img src={house} alt="house logo" />
            <Link to="/search">
              <img className="search_icon" src={search} alt="search" />
            </Link>
          </div>
          <p className="dashboard_link"> Dashboard</p>
          <a className="logout_button" href="http://localhost:3005/auth/logout">
            Logout
          </a>
        </div>
        <div className="display_user_container">
          <div className="user_container">
            <div className="user_img_container">
              <img src={this.state.user.profile_pic} alt="user profile img" className="user_img" />
            </div>
            <div className="user_info_container">
              <span className="user_text">{this.state.user.first_name}</span>
              <br />
              <span className="user_text">{this.state.user.last_name}</span>
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
              <p className="welcome_text">
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
              Sort by{" "}
              <select
                className="custom-select mr-sm-2 search_bar_dropdown"
                id="inlineFormCustomSelect"
                onChange={e =>
                  this.handleChange("sort_parameter", e.target.value)
                }
              >
                <option defaultValue>...</option>
                <option value="1">First Name</option>
                <option value="2">Last Name</option>
                <option value="3">Gender</option>
                <option value="4">Hair Color</option>
                <option value="5">Eye Color</option>
                <option value="6">Hobby</option>
                <option value="7">Birthday</option>
                <option value="8">Birth Year</option>
              </select>
            </div>
            {/* recommended friends will populate here */}
          </div>
        </div>
        
          <Pagination
            className="pagination"
            activePage={this.state.activePage}
            itemsCountPerPage={4}
            totalItemsCount={this.state.users.length}
            pageRangeDisplayed={this.props.totalItemsCount/this.props.itemsCountPerPage}
            onChange={_ => this.handlePageChange}
          />
        
      </div>
    );
  }
}

export default Dashboard;

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
      users: [],
      currentPage: 1,
      usersPerPage: 4
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
    this.getUsers();
  }
  handleChange(prop, val) {
    this.setState({ [prop]: val }, _ => this.getRecommended());
  }
  getUserInfo() {
    axios.get("/getUserInfo").then(resp => this.setState({ user: resp.data }));
  }

  getUsers() {
    axios.get("/getUsers").then(resp => this.setState({ users: resp.data }));
  }
  getRecommended() {
    console.log(this.state.user[this.state.sort_parameter]);
    axios
      .get(
        `/getRecommended/${this.state.sort_parameter}/${
          this.state.user[this.state.sort_parameter]
        }`
      )
      .then(resp => this.setState({ users: resp.data }));
  }
  handleClick(e) {
    this.setState({
      currentPage: Number(e.target.id)
    });
  }
  changeFriendStatus(index) {
    this.setState({ users: ![index].friend_status });
    let body = {
      friend_status: this.state.users[index].friend_status
    };
    axios.put("/changefriend_status", body).then(req => {});
    this.getRecommended();
  }

  render() {
    const { users, currentPage, usersPerPage } = this.state;

    // Logic for displaying current todos
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li key={number} id={number} onClick={_ => this.handleClick}>
          {number}
        </li>
      );
    });
    const renderUsers =
      this.state.users.length > 0
        ? currentUsers.map((user, index) => {
            return (
              <div key={index} className="filtered_user">
                <div className="filtered_user_img_container">
                  <img
                    className="filtered_user_img"
                    src={this.state.users[index].profile_picture}
                    alt=""
                  />
                </div>
                <div className="filtered_user_name">
                  <span className="filtered_user_first_name">
                    {this.state.users[index].first_name}
                  </span>
                  {"    "}
                  <span className="filtered_user_last_name">
                    {this.state.users[index].last_name}
                  </span>
                  {"     "}
                </div>
                <div className="filtered_user_add_btn_container">
                  <button
                    className="filtered_user_add_btn"
                    // onClick={this.changeFriendStatus(index)}
                  >
                    Add Friend
                  </button>
                </div>
              </div>
            );
          })
        : null;
    console.log(
      "hello",
      this.state.user[this.state.sort_parameter],
      this.state.users
    );
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
              <img
                src={this.state.user.profile_pic}
                alt="user profile img"
                className="user_img"
              />
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
                <option value="first_name">First Name</option>
                <option value="last_name">Last Name</option>
                <option value="gender">Gender</option>
                <option value="hair_color">Hair Color</option>
                <option value="eye_color">Eye Color</option>
                <option value="hobby">Hobby</option>
                <option value="birthday">Birthday</option>
                <option value="birthday_month">Birthday Month</option>
                <option value="birth_year">Birth Year</option>
              </select>
            </div>
          </div>
          <div className="users_list">{renderUsers}</div>
        </div>
        <div className="pagenumber_container">
          <ul id="page-numbers">{renderPageNumbers}</ul>
        </div>
      </div>
    );
  }
}

export default Dashboard;

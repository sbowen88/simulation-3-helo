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
      user: [],
      sort_parameter: "",
      users: [],
      currentPage: 1,
      usersPerPage: 4
    };
    this.handleClick = this.handleClick.bind(this);
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
    console.log(
      this.state.sort_parameter,
      this.state.user[this.state.sort_parameter]
    );
    axios
      .get(
        `/getRecommended/${this.state.sort_parameter}/${
          this.state.user[this.state.sort_parameter]
        }`
      )
      .then(resp => this.setState({ users: resp.data }));
  }
  addFriend(user_id, friend_id) {
    axios.post("/addFriend", { user_id, friend_id }).then(response => {
      response.data;
      this.getUsers();
    });
  }
  handleClick(e) {
    this.setState({
      currentPage: Number(e.target.id)
    });
  }
componentDidUpdate(oldProps, oldState) {
  console.log('update' , oldState, 'new state' , this.state)
}
  render() {
    let { users, currentPage, usersPerPage } = this.state;

    // Logic for displaying current users
    let indexOfLastUser = currentPage * usersPerPage;
    let indexOfFirstUser = indexOfLastUser - usersPerPage;
    let currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    console.log(currentUsers, indexOfFirstUser, indexOfLastUser, currentPage);

    // Logic for displaying page numbers
    let pageNumbers = [];
    for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
      pageNumbers.push(i);
    }
    console.log(pageNumbers, 'pages')
    let renderPageNumbers = pageNumbers.map(number => {
      return (
        <li key={number} id={number} onClick={this.handleClick}>
          {number}
        </li>
      );
    });
    let renderUsers = currentUsers.map((user, index) => {
          console.log(user, 'user')
            return user.user_id !== this.state.user.id ? (
              <div key={index} className="filtered_user">
                <div className="filtered_user_img_container">
                  <img
                    className="filtered_user_img"
                    src={user.profile_picture}
                    alt=""
                  />
                </div>
                <div className="filtered_user_name">
                  <span className="filtered_user_first_name">
                    {user.first_name}
                  </span>
                  {"    "}
                  <span className="filtered_user_last_name">
                    {user.last_name}
                  </span>
                  {"     "}
                </div>
                <div className="filtered_user_add_btn_container">
                  <button
                    className="filtered_user_add_btn"
                    onClick={() =>
                      this.addFriend(
                        this.state.user.id,
                        this.state.users[index].id
                      )
                    }
                  >
                    <p className="add_btn_text"> Add Friend</p>
                  </button>
                </div>
              </div>
            ) : null;
          })
console.log(renderUsers)
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
          <button
            className="logout_button"
            onClick={() => {
              console.log("loggin out");
            }}
          >
            <a href='http://localhost:3005/auth/logout'>Logout</a>
          </button>

          {/* axios.get("/auth/logout").then(res=>{
              this.props.history.push('/');
            }) */}
        </div>
        <div className="display_user_container">
          <div className="user_container">
            <div className="user_img_container">
              <img
                src={this.state.user.profile_picture}
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
          <ul className="page-numbers">{renderPageNumbers}</ul>
        </div>
      </div>
    );
  }
}

export default Dashboard;

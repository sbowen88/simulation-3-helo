import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Search.css";
import house from "./../Images/house.png";
import search from "./../Images/search.png";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search_parameter: "",
      search_input: "",
      user: [],
      users: [],
      currentPage: 1,
      usersPerPage: 3
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
  getUserInfo() {
    axios.get("/getUserInfo").then(resp => this.setState({ user: resp.data }));
  }
  getUsers() {
    axios.get("/getUsers").then(resp => this.setState({ users: resp.data }));
  }
  handleClick(e) {
    this.setState({
      currentPage: Number(e.target.id)
    });
  }
  userSearch() {
    axios
      .get(
        `userSearch/${this.state.search_parameter}/${this.state.search_input}`
      )
      .then(resp => {
        this.setState({ users: resp.data });
      });
  }
  reset = ()=> {
    this.setState({
      search_input: "",
      search_parameter: "...Search By",
      currentPage:1
    });
    this.getUsers()
    console.log('everything reset', this.state.search_input)
  }
  addFriend(user_id, friend_id) {
    axios.post("/addFriend", { user_id, friend_id }).then(response => {
      response.data;
      this.getUsers();
    });
  }

  removeFriend(user_id, friend_id) {
    axios.delete(`/removeFriend/${user_id}/${friend_id}`).then(response => {
      response.data;
      this.getUsers();
    });
  }

  handleChange(prop, val) {
    this.setState({ [prop]: val });
  }

  render() {
    const { users, currentPage, usersPerPage } = this.state;

    // Logic for displaying current users
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    // console.log(currentUsers);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(users.length / usersPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li key={number} id={number} onClick={this.handleClick}>
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
                  {user.user_id === this.state.user.id ? (
                    <button
                      className="remove_friend_button"
                      onClick={() =>
                        this.removeFriend(
                          this.state.user.id,
                          this.state.users[index].id
                        )
                      }
                    >
                      <p className="remove_btn_text"> Remove Friend </p>
                    </button>
                  ) : (
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
                  )}
                </div>
              </div>
            );
            {
            }
          })
        : null;
    return (
      <div className="search_root">
        <div className="dashboard_header">
          <div className="left_header">
            <p className="dashboard_header_helo">Helo</p>
            <Link to="/Dashboard">
              <img className="search_icon" src={house} alt="house logo" />
            </Link>
            <img className="search_icon" src={search} alt="search" />
          </div>
          <Link to ='dashboard' className="dashboard_link_link"><p className="dashboard_link"> Dashboard</p></Link>
          <button className="logout_button" onClick={()=>{
            console.log('loggin out')
            // axios.get("/auth/logout").then(res=>{
            //   this.props.history.push('/');
            // })
            }}>
            <a href='http://localhost:3005/auth/logout'>Logout</a>
          </button>
        </div>
        <div className="search_container">
          <div className="search_bar">
            <select
              className="custom-select mr-sm-2 search_bar_dropdown"
              id="inlineFormCustomSelect"
              value = {this.state.search_parameter}
              onChange={e =>
                this.handleChange("search_parameter", e.target.value)
              }
            >
              <option defaultValue>Search by...</option>
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
            <input
              type="text"
              className="search_input"
              onChange={e => this.handleChange("search_input", e.target.value)}
              value={this.state.search_input}
            />
            <div className="search_buttons_container">
              <button
                className="search_button"
                onClick={() => this.userSearch()}
              >
                Search
              </button>
              <button className="reset_button" onClick={this.reset}>
                Reset
              </button>
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

export default Search;

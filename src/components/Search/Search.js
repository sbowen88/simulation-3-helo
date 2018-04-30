import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Search.css";
import house from "./../Images/house.png";
import search from "./../Images/search.png";
import Pagination from "react-js-pagination";


class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search_parameter: "",
      search_input: "",
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
  }
  userSearch() {
    axios
      .get(
        `userSearch/${this.state.search_parameter}/${this.state.search_input}`
      )
      .then(resp => this.setState({ users: resp.data }));
  }

  handleChange(prop, val) {
    this.setState({ [prop]: val });
  }
  changeFriendStatus(index) {
    this.setState({ users: ![index].friend_status });
    let body = {
      friend_status: this.state.users[index].friend_status
    };
    axios.put("/changefriend_status", body).then(req => {});
    this.userSearch();
  }

  render() {
    const users = this.state.users.map((user, index) => {
      return (
        <div className="filtered_user">
          <div className="filtered_user_img">
            <img src={this.state.users[index].profile_pic} alt="" />
          </div>
          <div className="filtered_user_name">
            <span className="filtered_user_first_name" />
            <span className="filtered_user_last_name" />
          </div>
          <div className="filtered_user_add_btn_container">
            <button
              className="filtered_user_add_btn"
              onClick={this.changeFriendStatus(index)}
            >
              {/* need to call on the friend status of this one user{this.setState.friend_status ? "Remove Friend" : "Add Friend"} */}
            </button>
          </div>
        </div>
      );
    });
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
          <p className="dashboard_link"> Dashboard</p>
          <a className="logout_button" href="http://localhost:3005/auth/logout">
            Logout
          </a>
        </div>
        <div className="search_container">
          <div className="search_bar">
            <select
              className="custom-select mr-sm-2 search_bar_dropdown"
              id="inlineFormCustomSelect"
              onChange={e =>
                this.handleChange("search_parameter", e.target.value)
              }
            >
              <option defaultValue>Search by...</option>
              <option value="1">First Name</option>
              <option value="2">Last Name</option>
              <option value="3">Gender</option>
              <option value="4">Hair Color</option>
              <option value="5">Eye Color</option>
              <option value="6">Hobby</option>
              <option value="7">Birthday</option>
              <option value="8">Birth Year</option>
            </select>
            <input
              type="text"
              className="search_input"
              onChange={e => this.handleChange("search_input", e.target.value)}
            />
            <div className="search_buttons_container">
              <button className="search_button">Search</button>
              <button className="reset_button">Reset</button>
            </div>
          </div>
          <div className="Search_filtered_users_parent">{users}</div>
          <Pagination
            className="pagination"
            activePage={this.state.activePage}
            itemsCountPerPage={4}
            totalItemsCount={this.state.users.length}
            pageRangeDisplayed={this.props.totalItemsCount/this.props.itemsCountPerPage}
            onChange={_ => this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Search;

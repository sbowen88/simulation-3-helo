import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Profile.css";
import house from "./../Images/house.png";
import search from "./../Images/search.png";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      first_name: "",
      last_name: "",
      gender: "",
      hair_color: "",
      eye_color: "",
      hobby: "",
      birthday: "",
      birth_year: "",
      years: ""
    };
  }

  handleChange(prop, val) {
    this.setState({ [prop]: val });
  }
  patchUser() {
    let {
      first_name,
      last_name,
      gender,
      hair_color,
      eye_color,
      hobby,
      birthday,
      birth_year
    } = this.state;
    let body = {
      first_name,
      last_name,
      gender,
      hair_color,
      eye_color,
      hobby,
      birthday,
      birth_year
    };

    axios.patch("/api/user/patch/:id", body).then(res => {
      this.cancel();
      this.props.history.push("/dashboard");
    });
  }

  render() {
    const yearsArray = [];
    const thisYear = 2018;
    for (let i = 0; i <= 100; i++) {
      yearsArray.push(thisYear - i);
    }
    let stuff = yearsArray.map((year, index) => {
      return (
        <option key={`year${index}`} value={year}>
          {year}
        </option>
      );
    });
    console.log(stuff);
    return (
      <div className="profile_root">
        <div className="dashboard_header">
          <div className="left_header">
            <p className="dashboard_header_helo">Helo</p>
            <Link to="/Dashboard">
              <img className="search_icon" src={house} alt="house logo" />
            </Link>
            <img className="search_icon" src={search} alt="search" />
          </div>
          <p className="dashboard_link">Profile</p>
          <a className="logout_button" href="http://localhost:3005/auth/logout">
            Logout
          </a>
        </div>
        <div className="profile_display_user_container">
          <div className="user_container">
            <div className="user_img_container">
              <img src="" alt="user profile img" className="user_img" />
            </div>
            <div className="user_info_container">
              <div className="profile_user_text">First name</div>
              <br />
              <div className="profile_user_text">Last Name</div>
              <br />
            </div>
          </div>
          <div className="update_buttons_container">
            <button className="update_button">Update</button>
            <button className="cancel_button">Cancel</button>
          </div>
        </div>
        <div className="edit_profile">
          <div className="edit_profile_left">
            <div className="attribute">
              <span className="edit_profile_first_name">First Name</span>
            </div>
            <input
              type="text"
              onChange={e => this.handleChange("first_name", e.target.value)}
              value={this.state.first_name}
            />
            <div className="attribute">
              <span className="edit_profile_last_name">Last Name</span>
            </div>
            <input
              type="text"
              onChange={e => this.handleChange("last_name", e.target.value)}
              value={this.state.last_name}
            />
            <div className="attribute">
              <span>Gender</span>
              <select
                className="custom-select mr-sm-2"
                id="inlineFormCustomSelect"
                onChange={e => this.handleChange("gender", e.target.value)}
              >
                <option selected>Choose...</option>
                <option value="1">Female</option>
                <option value="2">Male</option>
              </select>
            </div>
            <div className="attribute">
              <span>Hair Color</span>
              <select
                className="custom-select mr-sm-2"
                id="inlineFormCustomSelect"
                onChange={e => this.handleChange("hair_color", e.target.value)}
              >
                <option selected>Choose...</option>
                <option value="1">Blonde</option>
                <option value="2">Brown</option>
                <option value="3">Red</option>
                <option value="4">Black</option>
                <option value="5">Grey</option>
              </select>
            </div>
            <div className="attribute">
              <span>Eye Color</span>
              <select
                className="custom-select mr-sm-2"
                id="inlineFormCustomSelect"
                onChange={e => this.handleChange("eye_color", e.target.value)}
              >
                <option selected>Choose...</option>
                <option value="1">Black</option>
                <option value="2">Blue</option>
                <option value="3">Brown</option>
                <option value="4">Green</option>
                <option value="5">Hazel</option>
              </select>
            </div>
          </div>
          <div className="edit_profile_right">
            <div className="attribute">
              <span>Hobby</span>
              <select
                className="custom-select mr-sm-2"
                id="inlineFormCustomSelect"
                onChange={e => this.handleChange("hobby", e.target.value)}
              >
                <option selected>Choose...</option>
                <option value="1">Sports</option>
                <option value="2">Camping</option>
                <option value="3">Cooking</option>
                <option value="4">Movies</option>
                <option value="5">Sewing</option>
              </select>
            </div>
            <div className="attribute">
              <span>Birthday Day</span>
              <select
                className="custom-select mr-sm-2"
                id="inlineFormCustomSelect"
              >
                <option selected>Choose...</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="25">25</option>
                <option value="26">26</option>
                <option value="27">27</option>
                <option value="28">28</option>
                <option value="29">29</option>
                <option value="30">30</option>
                <option value="31">31</option>
              </select>
            </div>
            <div className="attribute">
              <span>Birthday Month</span>
              <select
                className="custom-select mr-sm-2"
                id="inlineFormCustomSelect"
                onChange={e => this.handleChange("Birth", e.target.value)}
              >
                <option selected>Choose...</option>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </div>
            <div className="attribute">
              <span>Birth Year</span>
              <select
                className="custom-select mr-sm-2"
                id="inlineFormCustomSelect"
                onChange={e => this.handleChange("birth_year", e.target.value)}
              >
                <option selected>Choose...</option>
                {stuff}
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;

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
      user: [],
      first_name: "",
      last_name: "",
      gender: "",
      hair_color: "",
      eye_color: "",
      hobby: "",
      birthday: "",
      birthday_month: "",
      birth_year: "",
      show_required: false
    };
  }

  handleChange(prop, val) {
    console.log("changing");
    this.setState({ [prop]: val });
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
  getUserInfo() {
    axios.get("/getUserInfo").then(resp => {
      console.log("user", resp.data);
      this.setState({
        user: resp.data,
        first_name: resp.data.first_name ? resp.data.first_name : "",
        last_name: resp.data.last_name ? resp.data.last_name : "",
        gender: resp.data.gender ? resp.data.gender : "",
        eye_color: resp.data.eye_color ? resp.data.eye_color : "",
        hair_color: resp.data.hair_color ? resp.data.hair_color : "",
        hobby: resp.data.hobby ? resp.data.hobby : "",
        birthday: resp.data.birthday ? resp.data.birthday : "",
        birthday_month: resp.data.birthday_month
          ? resp.data.birthday_month
          : "",
        birth_year: resp.data.birth_year ? resp.data.birth_year : "",
        show_required: false
      });
    });
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
      birthday_month,
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
      birthday_month,
      birth_year
    };
    if (birthday === "Select") {
      console.log("test");
      this.setState({
        show_required: true
      });
    } else {
      this.setState({
        show_required: false
      });
      axios.patch("/userPatch", body).then(res => {
        this.props.history.push("/dashboard");
      });
    }
  }

  render() {
    // console.log(this.state);
    const required_error = (
      <div className="open-sans" style={{ color: "red", marginTop: "20px", marginBottom: "20px" }}>
        Required fields: Birthday, month, and year.
      </div>
    );
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

    return (
      <div className="profile_root">
        <div className="dashboard_header">
          <div className="left_header">
            <p className="dashboard_header_helo">Helo</p>
            <Link to="/Dashboard">
              <img className="search_icon" src={house} alt="house logo" />
            </Link>
            <Link to="/search">
              <img className="search_icon" src={search} alt="search" />
            </Link>
          </div>
          <p className="dashboard_link">Profile</p>
          <button
            className="logout_button"
            onClick={() => {
              console.log("loggin out");
            }}
          >
            <a href="http://localhost:3005/auth/logout">Logout</a>
          </button>
        </div>
        <div className="profile_display_user_container">
          <div className="user_container">
            <div className="user_img_container">
              <img
                src={this.state.user.profile_picture}
                alt="user profile img"
                className="user_img"
              />
            </div>
            <div className="user_info_container">
              <div className="profile_user_text">
                {this.state.user.first_name}
              </div>
              <br />
              <div className="profile_user_text">
                {this.state.user.last_name}
              </div>
              <br />
            </div>
          </div>
          <div className="update_buttons_container">
            <button className="update_button" onClick={_ => this.patchUser()}>
              Update
            </button>
            <button className="cancel_button" onClick={_ => this.getUserInfo()}>
              Cancel
            </button>
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
                value={this.state.gender}
              >
                <option value="Female">Female</option>
                <option value="Male">Male</option>
              </select>
            </div>
            <div className="attribute">
              <span>Hair Color</span>
              <select
                className="custom-select mr-sm-2"
                id="inlineFormCustomSelect"
                onChange={e => this.handleChange("hair_color", e.target.value)}
                value={this.state.hair_color}
              >
                <option value="Blonde">Blonde</option>
                <option value="Brown">Brown</option>
                <option value="Red">Red</option>
                <option value="Black">Black</option>
                <option value="Grey">Grey</option>
              </select>
            </div>
            <div className="attribute">
              <span>Eye Color</span>
              <select
                className="custom-select mr-sm-2"
                id="inlineFormCustomSelect"
                onChange={e => this.handleChange("eye_color", e.target.value)}
                value={this.state.eye_color}
              >
                <option value="Black">Black</option>
                <option value="Blue">Blue</option>
                <option value="Brown">Brown</option>
                <option value="Green">Green</option>
                <option value="Hazel">Hazel</option>
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
                value={this.state.hobby}
              >
                <option value="Sports">Sports</option>
                <option value="Camping">Camping</option>
                <option value="Cooking">Cooking</option>
                <option value="Movies">Movies</option>
                <option value="Sewing">Sewing</option>
              </select>
            </div>
            <div className="attribute">
              <span>Birthday</span>
              <select
                className="custom-select mr-sm-2"
                id="inlineFormCustomSelect"
                onChange={e => this.handleChange("birthday", e.target.value)}
                value={this.state.birthday}
              >
                <option value="Select">Select</option>
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
                onChange={e =>
                  this.handleChange("birthday_month", e.target.value)
                }
                value={this.state.birthday_month}
              >
                <option value="January">January</option>
                <option value="February">February</option>
                <option value="March">March</option>
                <option value="April">April</option>
                <option value="May">May</option>
                <option value="June">June</option>
                <option value="July">July</option>
                <option value="August">August</option>
                <option value="September">September</option>
                <option value="October">October</option>
                <option value="November">November</option>
                <option value="December">December</option>
              </select>
            </div>
            <div className="attribute">
              <span>Birth Year</span>
              <select
                className="custom-select mr-sm-2"
                id="inlineFormCustomSelect"
                onChange={e => this.handleChange("birth_year", e.target.value)}
                value={this.state.birth_year}
              >
                {stuff}
              </select>
            </div>
          </div>
        </div>
        <div>{this.state.show_required ? required_error : null}</div>
      </div>
    );
  }
}

export default Profile;

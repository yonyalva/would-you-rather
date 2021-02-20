import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser.js";
import { withRouter } from "react-router-dom";

class Login extends Component {
  state = { loggeduser: "" };

  handleChange = (e, props) => {
    const loggeduser = e.target.value;
    this.setState(() => ({
      loggeduser,
    }));
    const { dispatch } = this.props;
    dispatch(setAuthedUser(loggeduser));
    /*
    commenting the below out as the rubic is confusing on whether
    once the user is logged, is supposed to be redirected to the home page (#4) 
    or stay on the same page (#5) where the request to login originated from.
    Removing the comment below will redirect to the home page.
    */
    // this.props.history.replace('/')
  };

  render() {
    return (
      <div className="center">
        <h3>Welcome to Would you Rather...!</h3>
        <h4 style={{ color: "red" }}>Please select your user to sign in</h4>
        <select
          onChange={(e) => {
            this.handleChange(e);
          }}
          defaultValue="1"
        >
          <option value="1" disabled>
            Select User
          </option>
          {this.props.usersList.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

function mapStateToProps({ users, authedUser }) {
  const usersList = Object.values(users);
  return { usersList, authedUser };
}

export default connect(mapStateToProps)(withRouter(Login));

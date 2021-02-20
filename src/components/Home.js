import React, { Component } from "react";
import { connect } from "react-redux";
import Unanswered from "./Unanswered";
import Login from "./Login";

class Dashboard extends Component {
  render() {
    return (
      <div>
        {!this.props.authedUser && <Login />}
        {this.props.authedUser && <Unanswered />}
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(Dashboard);

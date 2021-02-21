import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Qusetion from "./Qusetion";
import { NavLink } from "react-router-dom";
import Login from "./Login";

class Unanswered extends Component {
  render() {
    return (
      <Fragment>
        {!this.props.authedUser && <Login />}
        {this.props.authedUser && (
          <Fragment>
            <h3 className="center">Would you rather</h3>
            <nav className="nav">
              <ul>
                <li>
                  <NavLink to="/" exact activeClassName="active">
                    Unanswered
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/answered" activeClassName="active">
                    Answered
                  </NavLink>
                </li>
              </ul>
            </nav>
            <ul className="dashboard-list">
              {this.props.questionIds
                .filter(
                  (questionIds) =>
                    !Object.keys(
                      this.props.users[this.props.authedUser].answers
                    ).includes(questionIds)
                )
                .map((id) => (
                  <li key={id}>
                    <Qusetion id={id} />
                  </li>
                ))}
            </ul>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }) {
  return {
    authedUser,
    users,
    questionIds: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    ),
  };
}

export default connect(mapStateToProps)(Unanswered);

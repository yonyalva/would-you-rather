import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Login from "./Login";

class leaderboard extends Component {
  render() {
    return (
      <div>
        {!this.props.authedUser ? (
          <Login />
        ) : (
          <Fragment>
            <h4 className="center">Leader Board</h4>
            {this.props.usersList.map((user, id) => (
              <div
                key={user.id}
                className="question pollwi"
                style={{ marginBottom: ".5em" }}
              >
                <img
                  src={user.avatarURL}
                  alt={`Avatar of ${user.name}`}
                  className="avatar"
                />
                <div className="question-info">
                  <span>
                    {user.name}
                    <span
                      style={{
                        color: "green",
                        marginLeft: "2em",
                        fontSize: "1.5em",
                      }}
                    >
                      Score ={" "}
                      {Object.values(user.answers).length +
                        user.questions.length}
                    </span>
                  </span>
                  <br></br>
                  <br></br>
                  <span>
                    Answered questions = {Object.values(user.answers).length}
                  </span>
                  <br></br>
                  <br></br>
                  <span>Created questions = {user.questions.length}</span>
                  <br></br>
                </div>
              </div>
            ))}
          </Fragment>
        )}
      </div>
    );
  }
}

function mapStateToProps({ users, authedUser }) {
  return {
    authedUser,
    usersList: Object.values(users).sort(
      (a, b) =>
        Object.values(b.answers).length +
        b.questions.length -
        (Object.values(a.answers).length + a.questions.length)
    ),
  };
}

export default connect(mapStateToProps)(withRouter(leaderboard));

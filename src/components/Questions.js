import React, { Component } from "react";
import { connect } from "react-redux";
import { formatQuestion } from "../utils/helpers";
import { handlePoll } from "../actions/questions";
import { withRouter, Redirect } from "react-router-dom";
import ProgressBar from "@ramonak/react-progress-bar";

class Questions extends Component {
  state = { selectedOption: "" };

  onValueChange = (e) => {
    this.setState(() => ({
      selectedOption: e.target.value,
    }));
  };

  formSubmit = (e) => {
    e.preventDefault();
    const answer = this.state.selectedOption;
    const { dispatch, question, authedUser } = this.props;

    dispatch(handlePoll({ qid: question.id, authedUser, answer }));
  };

  render() {
    const { question } = this.props;

    if (question === null) {
      return <Redirect to="/404" />;
    }

    const { name, avatar, optionOne, optionTwo, authedUser } = question;
    return (
      <div className="question">
        <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />
        <div className="question-info">
          {/* user asks question section */}
          {!(
            optionOne.votes.includes(authedUser) ||
            optionTwo.votes.includes(authedUser)
          ) && (
            <div>
              <div>
                <span>{name} asks:</span>
                <h3>Would you Rather...</h3>
              </div>
              <form onSubmit={this.formSubmit}>
                <div className="radio">
                  <label className="checkcontainer">
                    <input
                      type="radio"
                      value="optionOne"
                      checked={this.state.selectedOption === "optionOne"}
                      onChange={this.onValueChange}
                    />{" "}
                    {optionOne.text}
                    <span className="checkmark"></span>
                  </label>
                </div>
                <br></br>
                <div className="radio">
                  <label className="checkcontainer">
                    <input
                      type="radio"
                      value="optionTwo"
                      checked={this.state.selectedOption === "optionTwo"}
                      onChange={this.onValueChange}
                    />{" "}
                    {optionTwo.text}
                    <span className="checkmark"></span>
                  </label>
                </div>
                <button className="btn" disabled={!this.state.selectedOption}>
                  Submit
                </button>
              </form>
            </div>
          )}
          {/* asked by section */}
          {(optionOne.votes.includes(authedUser) ||
            optionTwo.votes.includes(authedUser)) && (
            <div className="question-info">
              <span>Asked by {name}</span>
              <h3>Results:</h3>
              <div className="pollwi">
                <span>
                  {optionOne.votes.includes(authedUser) && (
                    <img
                      alt="yourvote"
                      src="../images/yourvote.png"
                      className="yourvote"
                    ></img>
                  )}
                  Would you rather {optionOne.text}?
                </span>
                <br></br>
                <br></br>
                <ProgressBar
                  completed={Math.round(
                    (optionOne.votes.length /
                      [optionOne.votes.length + optionTwo.votes.length]) *
                      100
                  )}
                  bgcolor="green"
                  baseBgColor="red"
                />
                <div style={{ marginTop: ".5em", textAlign: "center" }}>
                  {optionOne.votes.length} out of{" "}
                  {optionOne.votes.length + optionTwo.votes.length} votes
                  <br></br>
                </div>
              </div>
              <div className="pollwi" style={{ marginTop: ".5em" }}>
                <span>
                  {optionTwo.votes.includes(authedUser) && (
                    <img
                      alt="yourvote"
                      src="../images/yourvote.png"
                      className="yourvote"
                    ></img>
                  )}
                  Would you rather {optionTwo.text}?
                </span>
                <br></br>
                <br></br>
                <ProgressBar
                  completed={Math.round(
                    (optionTwo.votes.length /
                      [optionOne.votes.length + optionTwo.votes.length]) *
                      100
                  )}
                  bgcolor="green"
                  baseBgColor="red"
                />
                <div style={{ marginTop: ".5em", textAlign: "center" }}>
                  {optionTwo.votes.length} out of{" "}
                  {optionOne.votes.length + optionTwo.votes.length} votes
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id];
  return {
    authedUser,
    users,
    question: question ? formatQuestion(question, users[question.author], authedUser) : null,
  };
}

export default withRouter(connect(mapStateToProps)(Questions));

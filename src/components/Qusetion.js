import React, { Component } from "react";
import { connect } from "react-redux";
import { formatQuestion } from "../utils/helpers";
import { Link, withRouter } from "react-router-dom";

class Qusetion extends Component {
  render() {
    const { question } = this.props;

    if (question === null) {
      return <p>This question doesn't exists</p>;
    }

    const { name, avatar, optionOne, id } = question;

    return (
      <div className="question">
        <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />
        <div className="question-info">
          <div>
            <span>{name}</span>
            <p>...{optionOne.text.slice(0, 15)}...</p>
          </div>
          <Link to={`/questions/${id}`}>
            <button className="btn-question">View Poll</button>
          </Link>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id];
  return {
    question: question ? formatQuestion(question, users[question.author], authedUser) : null,
  };
}

export default withRouter(connect(mapStateToProps)(Qusetion));

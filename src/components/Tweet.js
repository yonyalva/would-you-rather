import React, { Component } from "react";
import { connect } from "react-redux";
import { formatTweet } from "../utils/helpers";
import { Link, withRouter } from "react-router-dom";

class Tweet extends Component {
  render() {
    const { tweet } = this.props;

    if (tweet === null) {
      return <p>This question doesn't exists</p>;
    }

    const { name, avatar, optionOne, id } = tweet;

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

function mapStateToProps({ authedUser, users, tweets }, { id }) {
  const tweet = tweets[id];
  return {
    tweet: tweet ? formatTweet(tweet, users[tweet.author], authedUser) : null,
  };
}

export default withRouter(connect(mapStateToProps)(Tweet));

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatTweet } from '../utils/helpers'
import { handleToggleTweet } from '../actions/tweets'
import { Link, withRouter } from 'react-router-dom'
import { _getQuestions, _getUsers } from '../utils/_DATA'

class Upoll extends Component {
  state = {
    name: "pollgroup",
    optionOneText: '',
    optionTwoText: '',
  }

  onValueChange = (e) => {
    this.setState(() => ({
      selectedOption: e.target.value
    }))
  }

  formSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.selectedOption)
  }

  toParent = (e, id) => {
    e.preventDefault()
    this.props.history.push(`/tweet/${id}`)
  }
  render() {
    const { tweet } = this.props

    if (tweet === null) {
      return <p>This Tweet doesn't existd</p>
    }

    const {
      name, avatar, timestamp, text, optionOne, optionTwo, authedUser, hasLiked, likes, replies, id, parent
    } = tweet

    return (
      <div className='tweet'>
        <img
          src={avatar}
          alt={`Avatar of ${name}`}
          className='avatar'
        />
        <div className='tweet-info'>
          <div>
            <span>{name}</span>
            <h3>Would you Rather...</h3>
            {/* <p>{optionOne.text}</p>
            <p>{optionTwo.text}</p> */}
            {/* <p>...{Object.keys(answers)}...</p> */}
            {/* <p>{Object.keys(this.props.users)}</p> */}
          </div>
          <form onSubmit={this.formSubmit}>
            <div className="radio">
              <label>
                <input type="radio" value="Male"
                  checked={this.state.selectedOption === "Male"}
                  onChange={this.onValueChange}/> {optionOne.text}
              </label>
            </div>
            <div className="radio">
              <label>
                <input type="radio" value="Female"
                  checked={this.state.selectedOption === "Female"}
                  onChange={this.onValueChange}/> {optionTwo.text}
              </label>
              <div>
              Selected option is : {this.state.selectedOption}
            </div>
            </div>
            <button className="btn" disabled={!this.state.selectedOption}>
              Submit
            </button>
          </form>
        </div>
      </div>
    )
  }
}

function mapStateToProps ({authedUser, users, tweets}, { id }) {
  const tweet = tweets[id]
  const parentTweet = tweet ? tweets[tweet.replyingTo] : null

  return {
    authedUser,
    tweet: tweet
      ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet )
      : null
  }
}

export default withRouter(connect(mapStateToProps)(Upoll))
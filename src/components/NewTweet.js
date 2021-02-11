import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleAddTweet } from '../actions/tweets'
import { Redirect } from 'react-router-dom'
import Login from './Login'

class NewTweet extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
    toHome: false,
  }
  handleChange = (e) => {
    const optionOneText = e.target.value

    this.setState(() => ({
      optionOneText
    }))
  }

  handleChange2 = (e) => {
    const optionTwoText = e.target.value

    this.setState(() => ({
      optionTwoText
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { optionOneText, optionTwoText } = this.state
    const { dispatch, id } = this.props

    dispatch(handleAddTweet(optionOneText, optionTwoText))

    this.setState(() => ({
      optionOneText: '',
      optionTwoText: '',
      toHome: id ? false : true,
    }))
  }
  render() {
    const { optionOneText, optionTwoText, toHome } = this.state

    if (toHome === true) {
      return <Redirect to='/' />
    }

    {!this.props.authedUser &&
      <Login />}

    return (
      <div>
      {!this.props.authedUser &&
      <Login />}
      {this.props.authedUser &&
      <Fragment>
        <h3 className='center'>Create a New Question</h3>
        <h4 style={{paddingLeft:'20%'}}>Would you rather...</h4>
        <form className='new-tweet' onSubmit={this.handleSubmit}>
        <input type="text" name="option1" id="option1" placeholder="Enter Option one here" value={optionOneText} onChange={this.handleChange} required></input>
        <h3 className='center'>Or</h3>
        <input type="text" name="option2" id="option2" placeholder="Enter Option two here" value={optionTwoText} onChange={this.handleChange2} required></input>
          {/* <textarea
            placeholder="What's happening?"
            value={text}
            onChange={this.handleChange}
            className='textarea'
            maxLength={280}
          /> */}
          {/* {tweetLeft <= 100 && (
            <div className='tweet-length'>
              {tweetLeft}
            </div>
          )} */}
          <button
            className='btn'
            type='submit'
            disabled={optionOneText === '' || optionTwoText === ''}>
              Submit
          </button>
        </form>
        </Fragment>}
      </div>
    )
  }
}

<<<<<<< HEAD
function mapStateToProps ({ authedUser }) {
  return {
    authedUser
=======
function mapStateToProps ({ tweets, users, authedUser }) {
  return {
    authedUser,
    users,
    tweetIds: Object.keys(tweets)
      .sort((a,b) => tweets[b].timestamp - tweets[a].timestamp)
>>>>>>> 4b52de3e282f39e2f705d28dec561075f4b39908
  }
}

export default connect(mapStateToProps)(NewTweet)
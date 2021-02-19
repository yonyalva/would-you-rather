import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatTweet } from '../utils/helpers'
import { handlePoll } from '../actions/tweets'
import { withRouter, Redirect } from 'react-router-dom'
import { _getQuestions, _getUsers } from '../utils/_DATA'
import ProgressBar from "@ramonak/react-progress-bar";

class Questions extends Component {

  state = {selectedOption: ''}

  onValueChange = (e) => {
    this.setState(() => ({
      selectedOption: e.target.value
    }))
  }
  Example = () => {
    return <ProgressBar completed={60} />;
  };

  // formSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(this.state.selectedOption)
  // }

  // handleLike = (e) => {
  //   e.preventDefault()

  //   const { dispatch, tweet, authedUser, user } = this.props

  //   dispatch(handleToggleTweet({
  //     id: tweet.id,
  //     hasLiked: tweet.hasLiked,
  //     authedUser
  //   }))
  // }
  // toParent = (e, id) => {
  //   e.preventDefault()
  //   this.props.history.push(`/tweet/${id}`)
  // }

  // Below is from Add
  // handleSubmit = (e) => {
  //   e.preventDefault()

  //   const { optionOneText, optionTwoText } = this.state
  //   const { dispatch, id } = this.props

  //   dispatch(handleAddTweet(optionOneText, optionTwoText))

  //   this.setState(() => ({
  //     optionOneText: '',
  //     optionTwoText: '',
  //     toHome: id ? false : true,
  //   }))
  // }

    formSubmit = (e) => {
    e.preventDefault()
    const answer = this.state.selectedOption
    const { dispatch, tweet, authedUser, qid } = this.props

    dispatch(handlePoll({ qid: tweet.id, authedUser, answer}))
    // this.setState(() => ({
    //   toHome: qid ? false : true,
    // }))
    }

  toParent = (e, id) => {
    e.preventDefault()
    this.props.history.push(`/tweet/${id}`)
  }

  render() {
    // const { toHome } = this.state

    // if (toHome === true) {
    //   return <Redirect to='/' />
    // }

    const { tweet } = this.props

    if (tweet === null) {
      return <Redirect to='/404' />
    }

    const {
      name, avatar, timestamp, text, optionOne, optionTwo, authedUser, hasLiked, likes, replies, id, parent
    } = tweet
    return (
      <div className='tweet'>
        <img src={avatar} alt={`Avatar of ${name}`} className='avatar'/>
        <div className='tweet-info'>
        {!(optionOne.votes.includes(authedUser) || optionTwo.votes.includes(authedUser)) &&
          <div>
          <div>
            <span>{name} asks:</span>
            <h3>Would you Rather...</h3>
          </div>
          <form onSubmit={this.formSubmit}>
            <div className="radio">
              <label className="checkcontainer"> 
                <input type="radio" value="optionOne" 
                  checked={this.state.selectedOption === "optionOne"}
                  onChange={this.onValueChange}/>  {optionOne.text}
                  <span className="checkmark"></span>              
              </label>
            </div>
            <br></br>
            <div className="radio">
              <label className="checkcontainer">
                <input type="radio" value="optionTwo"
                  checked={this.state.selectedOption === "optionTwo"}
                  onChange={this.onValueChange}/> {optionTwo.text}
                  <span className="checkmark"></span>              
              </label>
            </div>
            <button className="btn" disabled={!this.state.selectedOption}>
              Submit
            </button>
          </form>
          </div>}
          {/* asked by section */}
          {(optionOne.votes.includes(authedUser) || optionTwo.votes.includes(authedUser)) &&
          <div className='tweet-info'>
          <span>Asked by {name}</span>
          <h3>Results:</h3>
          <div className='pollwi'>
         <span>
          {optionOne.votes.includes(authedUser) &&
          <img src="../images/yourvote.png" className='yourvote'></img>}
           Would you rather {optionOne.text}?</span><br></br><br></br>
          <ProgressBar completed={Math.round(optionOne.votes.length / [optionOne.votes.length + optionTwo.votes.length] * 100)} bgcolor="green" baseBgColor="red"/>
          <div style={{marginTop:'.5em', textAlign:'center'}}>
          {optionOne.votes.length} out of {optionOne.votes.length + optionTwo.votes.length} votes
          <br></br>
          </div>
          </div>
          <div className='pollwi' style={{marginTop: '.5em'}}>
          <span>
          {optionTwo.votes.includes(authedUser) &&
          <img src="../images/yourvote.png" className='yourvote'></img>}
          Would you rather {optionTwo.text}?</span><br></br><br></br>
          <ProgressBar completed={Math.round(optionTwo.votes.length / [optionOne.votes.length + optionTwo.votes.length] * 100)} bgcolor="green" baseBgColor="red"/>
          <div style={{marginTop:'.5em', textAlign:'center'}}>
          {optionTwo.votes.length} out of {optionOne.votes.length + optionTwo.votes.length} votes
          </div>
          </div>
        </div>}
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
    users,
    tweet: tweet
      ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet )
      : null
  }
}

export default withRouter(connect(mapStateToProps)(Questions))
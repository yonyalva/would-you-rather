import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatTweet } from '../utils/helpers'
// import TiArrowBackOutline from 'react-icons/lib/ti/arrow-back-outline'
// import TiHeartOutline from 'react-icons/lib/ti/heart-outline'
// import TiHeartFullOutline from 'react-icons/lib/ti/heart-full-outline'
// import { handleToggleTweet } from '../actions/tweets'
import { Link, withRouter } from 'react-router-dom'
import { _getQuestions, _getUsers } from '../utils/_DATA'

class Tweet extends Component {
  // handleLike = (e) => {
  //   e.preventDefault()

  //   const { dispatch, tweet, authedUser, user } = this.props

  //   dispatch(handleToggleTweet({
  //     id: tweet.id,
  //     hasLiked: tweet.hasLiked,
  //     authedUser
  //   }))
  // }
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
      name, avatar, timestamp, text, optionOne, authedUser, hasLiked, likes, replies, id, parent
    } = tweet

    return (
      // <Link to={`/tweet/${id}`} className='tweet'>
      <div className='tweet'>
        <img
          src={avatar}
          alt={`Avatar of ${name}`}
          className='avatar'
        />
        <div className='tweet-info'>
          <div>
            <span>{name}</span>
            {/* <div>{formatDate(timestamp)}</div> */}
            {/* {parent && (
              <button className='replying-to' onClick={(e) => this.toParent(e, parent.id)}>
                Replying to @{parent.author}
              </button>
            )} */}
            <p>...{optionOne.text.slice(0, 15)}...</p>
            {/* <p>...{Object.keys(answers)}...</p> */}
            {/* <p>{Object.keys(this.props.users)}</p> */}
          </div>
          {/* <div className='tweet-icons'>
            <TiArrowBackOutline className='tweet-icon' />
            <span>{replies !== 0 && replies}</span> */}
            <Link to={`/questions/${id}`}><button className='btn-question'>
              {/* {hasLiked === true
                ? <TiHeartFullOutline color='#e0245e' className='tweet-icon' />
                : <TiHeartOutline className='tweet-icon'/>} */}
                View Poll
            </button>
            </Link>
            {/* {Object.keys(this.props.users[this.props.authedUser].answers} */}
            {/* <span>{likes !== 0 && likes}</span>
          </div> */}
        </div>
      {/* </Link> */}
      </div>
    )
  }
}

function mapStateToProps ({authedUser, users, tweets}, { id }) {
  const tweet = tweets[id]
  // const parentTweet = tweet ? tweets[tweet.replyingTo] : null

  return {
    authedUser,
    users,
    tweetIds: Object.keys(tweets)
    .sort((a,b) => tweets[b].timestamp - tweets[a].timestamp),
    // tweet: tweet
    //   ? formatTweet(tweet, users[tweet.author], authedUser, parentTweet )
    //   : null
    tweet: tweet
      ? formatTweet(tweet, users[tweet.author], authedUser )
      : null
  }
}

export default withRouter(connect(mapStateToProps)(Tweet))
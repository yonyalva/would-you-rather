import { saveTweet, saveQanswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const RECEIVE_POLL = 'RECEIVE_POLL'
export const ADD_TWEET = 'ADD_TWEET'

function addTweet (tweet) {
  return {
    type: ADD_TWEET,
    tweet,
  }
}

// export function handleAddTweet (text, replyingTo) {
//   return (dispatch, getState) => {
//     const { authedUser } = getState()

//     dispatch(showLoading())

//     return saveTweet({
//       text,
//       author: authedUser,
//       replyingTo
//     })
//       .then((tweet) => dispatch(addTweet(tweet)))
//       .then(() => dispatch(hideLoading()))
//   }
// }

export function handleAddTweet (optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())

    return saveTweet({
      optionOneText,
      optionTwoText,
      author: authedUser
    })
      .then((tweet) => dispatch(addTweet(tweet)))
      .then(() => dispatch(hideLoading()))
  }
}

export function receiveTweets (tweets) {
  return {
    type: RECEIVE_TWEETS,
    tweets,
  }
}

// function toggleTweet ({ id, authedUser, hasLiked }) {
//   return {
//     type: TOGGLE_TWEET,
//     id,
//     authedUser,
//     hasLiked
//   }
// }

function pollAnswer ({ authedUser, qid, answer }) {
  return {
    type: RECEIVE_POLL,
    authedUser,
    qid,
    answer
  }
}

// export function handleToggleTweet (info) {
//   return (dispatch) => {
//     dispatch(toggleTweet(info))

//     return saveLikeToggle(info)
//       .catch((e) => {
//         console.warn('Error in handleToggleTweet: ', e)
//         dispatch(toggleTweet(info))
//         alert('The was an error liking the tweet. Try again.')
//       })
//   }
// }

export function handlePoll (info) {
  return (dispatch) => {
    dispatch(pollAnswer(info))
    // console.log('inside action')

    return saveQanswer(info)
      .catch((e) => {
        console.warn('Error in handlePoll: ', e)
        dispatch(pollAnswer(info))
        alert('The was an error submitting this answer. Try again.')
      })
  }
}
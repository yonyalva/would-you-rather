import { RECEIVE_TWEETS, RECEIVE_POLL, ADD_TWEET } from '../actions/tweets'

export default function tweets (state = {}, action) {
  switch(action.type) {
    case RECEIVE_TWEETS :
      return {
        ...state,
        ...action.tweets
      }
      case RECEIVE_POLL :
        return {
          ...state,
          [action.qid]: {
            ...state[action.qid],
            [action.answer]: {
              ...state[action.qid][action.answer],
              votes: state[action.qid][action.answer].votes.concat([action.authedUser])
            }
          }
        }
    case ADD_TWEET :
      return {
        ...state,
        [action.tweet.id]: {...action.tweet}
      }
    default :
      return state
  }
}
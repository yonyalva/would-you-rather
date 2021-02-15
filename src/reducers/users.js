import { RECEIVE_USERS } from '../actions/users'
import { RECEIVE_POLL } from '../actions/tweets'

export default function users (state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS :
      return {
        ...state,
        ...action.users
      }
      case RECEIVE_POLL:
        return {
          ...state,
          [action.authedUser]: {
            ...state[action.authedUser],
            answers: {
              ...state[action.authedUser].answers,
              [action.qid]: action.answer,
            },
          },
        };
    default :
      return state
  }
}
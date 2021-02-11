import { getInitialData } from '../utils/api'
import { receiveUsers } from '../actions/users'
import { receiveTweets } from '../actions/tweets'
import { setAuthedUser } from '../actions/authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'

<<<<<<< HEAD
const AUTHED_ID = 'tylermcginnis'
=======
    // const AUTHED_ID = ''
    let AUTHED_ID = 'johndoe'
>>>>>>> 4b52de3e282f39e2f705d28dec561075f4b39908
// const AUTHED_ID = ''

export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
      .then(({ users, tweets }) => {
        dispatch(receiveUsers(users))
        dispatch(receiveTweets(tweets))
        dispatch(setAuthedUser(AUTHED_ID))
        dispatch(hideLoading())
      })
  }
}
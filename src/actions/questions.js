import { saveQuestion, saveQanswer } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const RECEIVE_POLL = 'RECEIVE_POLL'
export const ADD_QUESTION = 'ADD_QUESTION'

function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question,
  }
}

export function handleAddQuestion (optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState()

    dispatch(showLoading())

    return saveQuestion({
      optionOneText,
      optionTwoText,
      author: authedUser
    })
      .then((question) => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()))
  }
}

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  }
}

function pollAnswer ({ authedUser, qid, answer }) {
  return {
    type: RECEIVE_POLL,
    authedUser,
    qid,
    answer
  }
}

export function handlePoll (info) {
  return (dispatch) => {
    dispatch(pollAnswer(info))

    return saveQanswer(info)
      .catch((e) => {
        console.warn('Error in handlePoll: ', e)
        dispatch(pollAnswer(info))
        alert('The was an error submitting this answer. Try again.')
      })
  }
}
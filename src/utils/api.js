import {
  _getUsers,
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from './_DATA.js'

export function getInitialData () {
  return Promise.all([
    _getUsers(),
    _getQuestions(),
  ]).then(([users, tweets]) => ({
    users,
    tweets,
  }))
}

// export function saveLikeToggle (info) {
//   return _saveQuestionAnswer(info)
// }

export function saveQanswer (info) {
  return _saveQuestionAnswer(info)
}

export function saveTweet (info) {
  return _saveQuestion(info)
}
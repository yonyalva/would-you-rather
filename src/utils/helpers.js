export function formatDate (timestamp) {
  const d = new Date(timestamp)
  const time = d.toLocaleTimeString('en-US')
  return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}

export function formatTweet (tweet, author, authedUser, parentTweet ) {
  const { id, text, timestamp, optionOne, optionTwo  } = tweet
  const { name, avatarURL } = author

  return {
    name,
    id,
    timestamp,
    text,
    avatar: avatarURL,
    optionOne,
    optionTwo,
    authedUser
  }
}

export function formatUser (user, authedUser) {
  const { answers, name, questions, id } = user

  return {
    name,
    id,
    answers,
    questions,
    authedUser
  }
}
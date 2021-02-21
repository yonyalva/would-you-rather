export function formatQuestion (question, author, authedUser) {
  const { id, text, timestamp, optionOne, optionTwo  } = question
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

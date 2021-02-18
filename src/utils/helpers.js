export function formatDate (timestamp) {
  const d = new Date(timestamp)
  const time = d.toLocaleTimeString('en-US')
  return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}

export function formatTweet (tweet, author, authedUser, parentTweet ) {
  const { id, likes, replies, text, timestamp, optionOne, optionTwo  } = tweet
  const { name, avatarURL } = author

  return {
    name,
    id,
    timestamp,
    text,
    avatar: avatarURL,
    optionOne,
    optionTwo,
    // answers,
    authedUser,
    // likes: likes.length,
    // replies: replies.length,
    // hasLiked: likes.includes(authedUser),
    // parent: !parentTweet ? null : {
    //   author: parentTweet.author,
    //   id: parentTweet.id,
    // }
  }
}

export function formatUser (user, authedUser) {
  const { answers, name, questions, id } = user
  // const name = uname

  return {
    name,
    id,
    // avatar: avatarURL,
    answers,
    questions,
    authedUser
  }
}
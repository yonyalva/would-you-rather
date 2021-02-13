import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Tweet from './Tweet'
import Add from './Add'
import Login from './Login'
import Upoll from './Upoll'

class Unansweredpoll extends Component {
  render() {
    const { id, replies } = this.props
    return (
      <div>
        {!this.props.authedUser &&
        <Login />}
        {this.props.authedUser &&
        <Fragment>     
        <Upoll id={id} />
        {/* <Add id={id} /> */}
        {/* {replies.length !== 0 && <h3 className='center'>Replies</h3>}
        <ul>
          {replies.map((replyId) => (
            <li key={replyId}>
              <Tweet id={replyId}/>
            </li>
          ))}
        </ul> */}
      </Fragment> }
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, tweets, users }, props) {
  const { id } = props.match.params

  return {
    id,
    authedUser
    // replies: !tweets[id]
    //   ? []
    //   : tweets[id].replies.sort((a,b,) => tweets[b].timestamp - tweets[a].timestamp)
  }
}

export default connect(mapStateToProps)(Unansweredpoll)
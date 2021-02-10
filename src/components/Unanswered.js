import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Tweet from './Tweet'
import { NavLink } from 'react-router-dom'

class Unanswered extends Component {
  render() {
    return (
      <Fragment>
        <h3 className='center' >Would you rather</h3>
        <nav className='nav'>
        <ul>
            <li>
            <NavLink to='/' exact activeClassName='active'>
                Unanswered
            </NavLink>
            </li>
            <li>
            <NavLink to='/Answered'  activeClassName='active'>
                Answered
            </NavLink>
            </li>
        </ul>
        </nav>
        <ul className='dashboard-list'>
          {this.props.tweetIds.filter((tweetIds) => !Object.keys(this.props.users[this.props.authedUser].answers).includes(tweetIds)).map((id) => (
            <li key={id}>
              <Tweet id={id}/>
            </li>
          ))}
        </ul>
       </Fragment>
    )
  }
}

function mapStateToProps ({ tweets, users, authedUser }) {
  return {
    authedUser,
    users,
    tweetIds: Object.keys(tweets)
      .sort((a,b) => tweets[b].timestamp - tweets[a].timestamp)
  }
}

export default connect(mapStateToProps)(Unanswered)
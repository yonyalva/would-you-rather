import React, { Component, Fragment } from "react";
import { connect } from 'react-redux'
import {setAuthedUser} from '../actions/authedUser.js'
import { withRouter } from "react-router-dom";
import Login from './Login'

class leaderboard extends Component {
  state = { loggeduser: "" }

  handleChange = (e, props) => {
    this.state.loggeduser = e.target.value
    const { dispatch } = this.props
    dispatch(setAuthedUser(this.state.loggeduser))
    /*
    commenting the below out as the rubic is confusing on whether
    once the user is logged, is supposed to be redirected to the home page (#4) 
    or stay on the same page (#5) where the request to login originated from.
    Removing the comment below will redirect to the home page.
    */
    // this.props.history.replace('/')  
  }

  render() {
    return (
      <div>
      {!this.props.authedUser &&
      <Login />}
        {this.props.authedUser &&
        <Fragment>
          <h4 className='center'>Leader Board</h4>
            {this.props.usersList.sort((a, b) => Object.values(b.answers).length + b.questions.length - 
            Object.values(a.answers).length + b.questions.length).map((user, id) => ( 
            <div className='tweet pollwi' style={{marginBottom: '.5em'}}>
            <img src={user.avatarURL} alt={`Avatar of ${user.name}`} className='avatar'/>
            <div className='tweet-info'>
            <span>{user.name}<span style={{color:'green', marginLeft:'2em', fontSize:'1.5em'}}>
              Score = {Object.values(user.answers).length + user.questions.length}</span></span>
            <br></br><br></br>
            <span>Answered questions = {user.questions.length}</span>
            <br></br><br></br>
            <span>Created questions = {Object.values(user.answers).length}</span>
            <br></br>
            </div>
            </div>
            ))}
        </Fragment>}
      </div>
    );
  }
}

// function mapStateToProps ({ users, authedUser }) {
//   return {
//     users,
//     authedUser,
//     usersIds: Object.values(users)
//   }
// }

function mapStateToProps ({ users, authedUser }) {
  const usersList = Object.values(users)
  return { usersList, authedUser };
}

export default connect(mapStateToProps)(withRouter(leaderboard))

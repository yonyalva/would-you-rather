import React, { Component } from "react";
import { connect } from 'react-redux'
import { _getUsers } from '../utils/_DATA'
import {setAuthedUser} from '../actions/authedUser.js'
import { withRouter } from "react-router-dom";

class Login extends Component {
  state = {
    loggeduser: "",
  }


  handleChange = (e, props) => {
    this.state.loggeduser = e.target.value
    const { dispatch } = this.props
    dispatch(setAuthedUser(this.state.loggeduser))
    // commenting the below out as the rubic is confusing on whether
    // once the user is logged, is supposed to be redirected to the home (#4) 
    // or stay on the same page (#5) where the request to login originated from
    // this.props.history.replace('/')  
  }

  render() {
    return (
      <div className='center'>
          <h3 >Welcome to Would you Rather...!</h3>
          <h4 style={{color:'red'}}>Please select your user to sign in</h4>
          <select onChange={(e) => {this.handleChange(e)}} defaultValue='1'>
            <option value='1' disabled >Select User</option>
            {this.props.usersIds.map((user) => (
            <option value={user}>{user}</option>
            ))}
          </select>
      </div>
    );
  }
}

function mapStateToProps ({ users, authedUser }) {
  return {
    authedUser,
    usersIds: Object.keys(users)
  }
}

export default connect(mapStateToProps)(withRouter(Login))

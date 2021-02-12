import React, { Component } from "react";
import { connect } from 'react-redux'
import { _getUsers } from '../utils/_DATA'
import {setAuthedUser} from '../actions/authedUser.js'
import { Redirect } from 'react-router-dom'

class Login extends Component {
  // constructor(props) {
  //   super(props);
  state = {
    loggeduser: "",
  }

    // this.handleChange = this.handleChange.bind(this);
  // }

  // signIn = () => {
  //   const { dispatch } = this.props
  //   dispatch(setAuthedUser(this.state.loggeduser))
  // }

  handleChange = (e) => {
    this.state.loggeduser = e.target.value
    const { dispatch } = this.props
    dispatch(setAuthedUser(this.state.loggeduser))
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
          {/* <br></br><br></br>
          <button  onClick={() => {this.signIn()}}>Sign In</button> */}
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

export default connect(mapStateToProps)(Login)
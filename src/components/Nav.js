import React, { Component, Fragment } from 'react'
<<<<<<< HEAD
import { NavLink, Redirect } from 'react-router-dom'
=======
import { NavLink } from 'react-router-dom'
>>>>>>> 4b52de3e282f39e2f705d28dec561075f4b39908
import { connect } from 'react-redux'
import {setAuthedUser} from '../actions/authedUser.js'

class Nav extends Component {
  signOut = () =>{
    // e.preventDefault()
    const { dispatch } = this.props

    dispatch(setAuthedUser(""))
    // return    <Redirect  to="/" />

  }

  render() {
    return (
      <nav className='nav'>
        <ul>
          <li>
            <NavLink to='/' exact activeClassName='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/new'  activeClassName='active'>
              New Question
            </NavLink>
          </li>
          <li>
            <NavLink to='/new1' activeClassName='active'>
              Leader Board
            </NavLink>
          </li>
          {this.props.authedUser &&
          <Fragment>
          <li>
            <label>Hello {this.props.authedUser}!</label>
          </li>
          <li>
<<<<<<< HEAD
            <button onClick={() => {this.signOut()}}>Sign Out</button>
=======
          <button>Sign Out</button>
>>>>>>> 4b52de3e282f39e2f705d28dec561075f4b39908
          </li>
          </Fragment>}
        </ul>
      </nav>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    authedUser
  }
}

export default connect(mapStateToProps)(Nav)
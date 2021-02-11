import React, { Component, Fragment } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
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
            <button onClick={() => {this.signOut()}}>Sign Out</button>
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
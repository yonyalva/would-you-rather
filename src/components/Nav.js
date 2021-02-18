import React, { Component, Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import {setAuthedUser} from '../actions/authedUser.js'
import {Login} from './Login'

class Nav extends Component {
  signOut = () =>{
    const { dispatch } = this.props
    dispatch(setAuthedUser(""))
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
            <NavLink to='/add'  activeClassName='active'>
              New Question
            </NavLink>
          </li>
          <li>
            <NavLink to='/leaderboard' activeClassName='active'>
              Leader Board
            </NavLink>
          </li>
          {this.props.authedUser &&
          <Fragment>
          {this.props.username.map( id => (
          <li>
            <label>Hello {id.name}!</label>
          </li>))}
          <li>
          <NavLink to='/' onClick={() => {this.signOut()}}>Sign Out</NavLink>
          </li>
          </Fragment>}
        </ul>
      </nav>
    )
  }
}

function mapStateToProps ({ users, authedUser, name }, {id}) {
  const usersList = Object.values(users)
  const username = Object.values(users).filter((user) => user.id === authedUser)
  return { usersList, authedUser, username }
}

export default connect(mapStateToProps)(Nav)
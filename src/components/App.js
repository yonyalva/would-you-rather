import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Home'
import LoadingBar from 'react-redux-loading'
import Add from './Add'
import Nav from './Nav'
import Answered from './Answered'
import NotFound from './404'
import PollPage from './PollPage'
import Leaderboard from './Leaderboard'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <Nav />
            <hr style={{border: 'solid green'}} />
            {this.props.loading === true
              ? null
              : <div>
                <Switch>
                  <Route path='/' exact component={Dashboard} />
                  <Route path='/Answered'  component={Answered} />
                  {/* <Route path='/Unanswered'  component={Unanswered} /> */}
                  <Route path='/questions/:id' component={PollPage} />
                  <Route path='/add' component={Add} />
                  <Route path='/leaderboard' component={Leaderboard} />

                  <Route component={NotFound} />
                </Switch>
                </div>}
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)
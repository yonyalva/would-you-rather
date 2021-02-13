import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Home'
import LoadingBar from 'react-redux-loading'
import Add from './Add'
// import TweetPage from './TweetPage'
import Nav from './Nav'
import Answered from './Answered'
import Unanswered from './Unanswered'
import NotFound from './404'
import Unansweredpoll from './Unansweredpoll'

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
                  <Route path='/Unanswered'  component={Unanswered} />
                  <Route path='/Upoll/:id' component={Unansweredpoll} />
                  <Route path='/add' component={Add} />
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
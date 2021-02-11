import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Home'
import LoadingBar from 'react-redux-loading'
import NewTweet from './NewTweet'
import TweetPage from './TweetPage'
import Nav from './Nav'
import Answered from './Answered'
import Unanswered from './Unanswered'

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
                  <Route path='/' exact component={Dashboard} />
                  <Route path='/Answered'  component={Answered} />
                  {/* <Route path='/Unanswered'  component={Unanswered} /> */}
                  <Route path='/tweet/:id' component={TweetPage} />
                  <Route path='/new' component={NewTweet} />
                </div>}
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    authedUser,
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)
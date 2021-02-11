import React, { Component } from "react";
import { connect } from 'react-redux'
import { _getQuestions, _getUsers } from '../utils/_DATA'
import { handleToggleTweet } from '../actions/tweets'
import Tweet from './Tweet'

const options = [
  {
    label: "Apple",
    value: "apple",
  },
  {
    label: "Mango",
    value: "mango",
  },
  {
    label: "Banana",
    value: "banana",
  },
  {
    label: "Pineapple",
    value: "pineapple",
  },
];

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // fruit: "banana",
      value: 1,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    console.log("Fruit Selected!!");
    this.setState({ fruit: e.target.value });
  }

  render() {
    return (
      <div className='center'>
          <h3 >Welcome to Would you Rather!</h3>
          <h4 style={{color:'red'}}>Please select your user to login</h4>
          <select value={this.state.fruit} onChange={this.handleChange}>
            <option value='1' disabled default>Select User</option>
            {this.props.usersIds.map((user) => (
              <option value={user}>{user}</option>
            ))}
          </select>
          <br></br><br></br>
          <button>Sign In</button>
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
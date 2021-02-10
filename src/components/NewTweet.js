import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddTweet } from '../actions/tweets'
import { Redirect } from 'react-router-dom'

class NewTweet extends Component {
  state = {
    text: '',
    text2: '',
    toHome: false,
  }
  handleChange = (e) => {
    const text = e.target.value

    this.setState(() => ({
      text
    }))
  }

  handleChange2 = (e) => {
    const text2 = e.target.value

    this.setState(() => ({
      text2
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { text } = this.state
    const { dispatch, id } = this.props

    dispatch(handleAddTweet(text, id))

    this.setState(() => ({
      text: '',
      text2: '',
      toHome: id ? false : true,
    }))
  }
  render() {
    const { text, text2, toHome } = this.state

    if (toHome === true) {
      return <Redirect to='/' />
    }

    const tweetLeft = 280 - text.length

    return (
      <div>
        <h3 className='center'>Create a New Question</h3>
        <h4 style={{paddingLeft:'20%'}}>Would you rather...</h4>
        <form className='new-tweet' onSubmit={this.handleSubmit}>
        <input type="text" name="option1" id="option1" placeholder="Enter Option one here" value={text} onChange={this.handleChange} required></input>
        <h3 className='center'>Or</h3>
        <input type="text" name="option2" id="option2" placeholder="Enter Option two here" value={text2} onChange={this.handleChange2} required></input>
          {/* <textarea
            placeholder="What's happening?"
            value={text}
            onChange={this.handleChange}
            className='textarea'
            maxLength={280}
          /> */}
          {/* {tweetLeft <= 100 && (
            <div className='tweet-length'>
              {tweetLeft}
            </div>
          )} */}
          <button
            className='btn'
            type='submit'
            disabled={text === '' || text2 === ''}>
              Submit
          </button>
        </form>
      </div>
    )
  }
}

export default connect()(NewTweet)
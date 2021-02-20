import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import Login from "./Login";
import Qustions from "./Questions";

class PollPage extends Component {
  render() {
    const { id } = this.props;
    return (
      <div>
        {!this.props.authedUser && <Login />}
        {this.props.authedUser && (
          <Fragment>
            <Qustions id={id} />
          </Fragment>
        )}
      </div>
    );
  }
}

function mapStateToProps({ authedUser }, props) {
  const { id } = props.match.params;

  return {
    id,
    authedUser,
  };
}

export default connect(mapStateToProps)(PollPage);

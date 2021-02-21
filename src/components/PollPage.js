import { connect } from "react-redux";
import Login from "./Login";
import Qustions from "./Questions";

const PollPage = ({ id, authedUser }) => (
  <div>{authedUser ? <Qustions id={id} /> : <Login />}</div>
);

function mapStateToProps({ authedUser }, props) {
  const { id } = props.match.params;

  return {
    id,
    authedUser,
  };
}

export default connect(mapStateToProps)(PollPage);

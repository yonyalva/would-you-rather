import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class NotFound extends Component {
  render() {
    return (
      <div className="center">
        <h1>Page not Found, Error 404</h1>
        <NavLink to="/" style={{ color: "red" }}>
          <div>
            Please click here to go to the home page
            <br></br>
            <img
              style={{ marginTop: "2em" }}
              src="https://78.media.tumblr.com/5d011cb95c3021d5454766d2baa39a9d/tumblr_omtd52eBdY1qgvqxoo2_400.gif"
              alt="RRaccoon"
            ></img>
          </div>
        </NavLink>
      </div>
    );
  }
}

export default NotFound;

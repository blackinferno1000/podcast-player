import { Link } from "react-router-dom";
import { useState, useRef } from "react";

export default function Profile(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const handleLogin = (e) => {
    e.preventDefault();
    fetch(
      `/login?username=${usernameRef.current.value}&password=${passwordRef.current.value}`,
      { method: "POST" }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  const handleSignup = (e) => {
    fetch(`/signup`, { method: "POST" })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <section>
      <div className="container">
        {loggedIn ? (
          <div>Logged in</div>
        ) : (
          <div>
            <form action="/login" method="post">
              <h1 className="h1">Login</h1>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingUsername"
                  placeholder="Username"
                  ref={usernameRef}
                />
                <label htmlFor="floatingUsername">Username</label>
              </div>
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  ref={passwordRef}
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
            </form>
            <p className="h5">Don't have an account?</p>
            <button
              className="btn btn-primary col-sm-6 col-md-2 mb-3 me-2"
              onClick={handleLogin}
            >
              Login
            </button>
            <button
              className="btn btn-primary col-sm-6 col-md-2 mb-3"
              onClick={handleSignup}
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

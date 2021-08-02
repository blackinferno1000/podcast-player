import { Link } from "react-router-dom";
import { useState } from "react";

export default function Profile(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <section>
      <div className="container">
        {props.signup !== "true" && (
          <div>
            <form action="/login" method="post">
              <h1 className="h1">Login</h1>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Username"
                />
                <label htmlFor="floatingInput">Username</label>
              </div>
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
            </form>
            <p className="h5">Don't have an account?</p>
            <a href="/signup">Sign Up</a>
          </div>
        )}
      </div>
    </section>
  );
}

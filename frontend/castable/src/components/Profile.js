import { Link } from "react-router-dom";
import { useState } from "react";

export default function Profile() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <section>
      <div className="container">
        {!loggedIn && (
          <div>
            <form action="/login" method="post">
              <div>
                <h1>Login</h1>
              </div>
              <div class="form-group">
                <label for="">Username:</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Enter your username"
                  required
                ></input>
              </div>
              <div class="form-group">
                <label for="">Password:</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  required
                ></input>
              </div>
              <button type="submit">Login</button>
            </form>
            <p>Don't have an account?</p>
            <a href="/signup">Sign Up</a>
          </div>
        )}
      </div>
    </section>
  );
}

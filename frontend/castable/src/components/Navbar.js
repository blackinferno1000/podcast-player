import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { UserContext } from "../UserContext";

export default function Navbar(props) {
  const [favorites, setFavorites] = useState([]);

  const value = useMemo(
    () => ({ favorites, setFavorites }),
    [favorites, setFavorites]
  );
  return (
    <nav>
      <div className="container pb-3">
        <div className="row align-items-center justify-content-center p-2">
          <div className="col-9">
            <h1 className="display-4 ">
              <Link to="/" className="logo text-dark">
                Castable
              </Link>
            </h1>
          </div>
          <div className="col-3 align-self-end">
            <Link to="/profile">
              <i className="bi bi-person display-4 text-dark"></i>
            </Link>
          </div>
        </div>
        <UserContext.Provider value={value}>
          {props.children}
        </UserContext.Provider>
      </div>
    </nav>
  );
}

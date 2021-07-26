import { Link } from "react-router-dom";

export default function Navbar() {
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
      </div>
    </nav>
  );
}

import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./styles.css";

function Navbar(props) {
  const history = useHistory();
  const { name, setName } = props;

  const Logout = () => {
    localStorage.clear();
    const Name = localStorage.getItem("name");
    setName(Name);
    history.push("/signin");
  };

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="#">
          TAX CALCULATOR
        </Link>
        <button
          className="navbar-toggler order-first"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <button
          className="navbar-toggler "
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#account"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="fa fa-user"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav text-center">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                AboutUs
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="#">
                Terms
              </Link>
            </li>
          </ul>
        </div>
        <div className="collapse navbar-collapse margin-auth" id="account">
          {name === null ? (
            <ul className="navbar-nav text-center">
              <li className="nav-item ">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signin">
                  Signin
                </Link>
              </li>
            </ul>
          ) : (
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {name}
              </button>
              <div className="dropdown-menu dropdown-menu-right bg-dark text-center">
                <button
                  type="submit"
                  className="btn text-light"
                  aria-labelledby="dropdownMenuButton1"
                  onClick={Logout}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

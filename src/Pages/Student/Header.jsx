import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  function logOut(event) {
    event.preventDefault(); // Prevent the default link behavior

    // Clear user data from local storage
    localStorage.removeItem("userType");

    // Redirect to the login page
    navigate("/Login");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar nav-bg">
      <div className="container">
        <Link className="navbar-brand text-light" to="/Student">
          Student
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-light"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Profile
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li>
                  <Link className="dropdown-item" to="/Student/Profile">
                    View Profile
                  </Link>
                </li>
                <li>
                  <a className="dropdown-item" href="/Logout" onClick={logOut}>
                    Logout
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;

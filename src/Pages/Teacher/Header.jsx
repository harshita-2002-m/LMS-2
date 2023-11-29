import Main from "./Main";
import { Link } from "react-router-dom";
import Login from "../../Login/Login";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
function Header() {
  const navigate = useNavigate();
 function logOut(event) {
  event.preventDefault();

  console.log("Logging out...");
  console.log("Local Storage before logout:", localStorage);
  localStorage.clear();


  console.log("Local Storage after logout:", localStorage);
  Cookies.remove("csrftoken");
  console.log("Cookies after logout:", document.cookie);
  navigate("/Login");
  window.location.reload(); 
}
  return (
    <nav className="navbar navbar-expand-lg navbar nav-bg">
      <div className="container">
        <Link className="navbar-brand text-light" to="/Teacher">
          Teacher
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
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <a className="dropdown-item" href="/Teacher/Profile">
                    View Profile
                  </a>
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

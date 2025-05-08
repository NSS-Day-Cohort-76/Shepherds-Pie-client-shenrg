// NavBar should be seen universally across the entire application. 

import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import "./NavBar.css"


export const EmployeeNav = () => {
    const navigate = useNavigate()
    return (
        <ul className="navbar">
            <li className="navbar-item">
                <Link to="/">Home</Link>
            </li>
            <li className="navbar-item">
                <Link to="/StartOrder">Start Order</Link>
            </li>
            <li className="navbar-item">
                <Link to="/list">Orders List</Link>
            </li>
            <li className="navbar-item">
                <Link to="/employees">Employees</Link>
            </li>
            <li className="navbar-item">
                <Link to="/sales">Sales</Link>
            </li>
            {localStorage.getItem("shepherd_user") ? (
        <li className="navbar-item navbar-logout">
          <Link
            className="navbar-link"
            to="/login"
            onClick={() => {
              localStorage.removeItem("shepherd_user");
              navigate("/login", { replace: true });
            }}
          >
            Logout
          </Link>
        </li>
      ) : (
        ""
      )}
    </ul>
    )
} 
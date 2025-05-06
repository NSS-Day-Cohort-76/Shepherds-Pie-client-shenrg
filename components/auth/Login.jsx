

// Copied file from Honey Rae's. Please be sure there aren't naming errors.
// Line 66 may or may not be needed (see commented out line)

import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import { GetAllEmployees, getEmployeeByEmail } from "../../services/employeeService.jsx"  

export const Login = () => {
  const [email, set] = useState("isabella.white@gmail.com")
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    getEmployeeByEmail(email).then((foundUsers) => {
      if (foundUsers.length === 1) {
        const employee = foundUsers[0]
        localStorage.setItem(
          "shepherd_user",
          JSON.stringify({
            id: employee.id,
            isAdmin: employee.isAdmin,
          })
        )

        navigate("/")
      } else {
        window.alert("Invalid login")
      }
    })
  }

  return (
    <main className="container-login">
      <section>
        <form className="form-login" onSubmit={handleLogin}>
          <h1>Shepherd's Pie</h1>
          <h2>Please sign in</h2>
          <fieldset>
            <div className="form-group">
              <input
                type="email"
                value={email}
                onChange={(evt) => set(evt.target.value)}
                className="form-control"
                placeholder="Email address"
                required
                autoFocus
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <button className="login-btn btn-info" type="submit">
                Sign in
              </button>
            </div>
          </fieldset>
        </form>
      </section>
      <section>
        {/* <Link to="/register">Not a member yet?</Link> */}
      </section>
    </main>
  )
}

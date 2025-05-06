import { useEffect, useState } from "react"
import { GetAllEmployees } from "../../services/employeeService.jsx"
import { Link } from "react-router-dom"
import "./Employees.css"


export const EmployeeList = ({ currentUser }) => {
  const [allEmployees, setAllEmployees] = useState([])

  useEffect(() => {
    GetAllEmployees().then((employeesArray) => {
      setAllEmployees(employeesArray)
    })
  }, [])

  if (!currentUser || currentUser.isAdmin !== true) {
    return (
      <div className="unauthorized-message">
        <h2>You don't have authorization to view this page!</h2>
      </div>
    )
  }
  return (
    <div className="employees-container">
      <h2>Employees</h2>
      <article className="employees">
        {allEmployees.map((employee) => {
          return (
            <Link 
              to={`/employees/${employee.id}`} 
              key={employee.id} 
              className="employee-link"
            >
              <section className="employee">
                <header className="employee-info">{employee.name}</header>
                <footer>
                  <div className="employee-info">
                    <div>Email: {employee.email}</div>
                    <div>Phone: {employee.phone}</div>
                    <div>Address: {employee.address}</div>
                  </div>
                </footer>
              </section>
            </Link>
          )
        })}
      </article>
    </div>
  )
}

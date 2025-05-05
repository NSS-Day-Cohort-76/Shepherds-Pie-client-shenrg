
// Ticket #7, Frame 8

// Employee list should only be viewable by a Admin level user. All other users (employees) 
// should be shown an error page then redirected back to the home screen. 
// Employees name and contact info should be displayed in the main list. 
import { useEffect, useState } from "react"
import { GetAllEmployees } from "../../services/employeeService.jsx"
import { Link } from "react-router-dom"
import "./Employees.css"

export const EmployeeList = () => {
  const [allEmployees, setAllEmployees] = useState([])

  useEffect(() => {
    GetAllEmployees().then((employeesArray) => {
      setAllEmployees(employeesArray)
      console.log("employees set!")
    })
  }, [])

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

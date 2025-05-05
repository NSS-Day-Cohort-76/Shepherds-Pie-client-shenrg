export const GetAllEmployees = () => {
    return fetch(`http://localhost:8088/employees`)
        .then((res) => res.json())
}


export const GetEmployeeById = async (id) => {
    const response = await fetch(`http://localhost:8088/employees/${id}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch employee with id ${id}`)
    }
    const employee = await response.json()
    return employee
  }

export const UpdateEmployee = async (id, updatedEmployee) => {
  const response = await fetch(`http://localhost:8088/employees/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedEmployee),
  })
  if (!response.ok) {
    throw new Error(`Failed to update employee with id ${id}`)
  }
  const updated = await response.json()
  return updated
}



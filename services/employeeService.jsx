export const GetAllEmployees = () => {
    return fetch(`http://localhost:8088/employees`)
        .then((res) => res.json())
}

export const GetEmployeeById = async (id) => {
  const response = await fetch(`http://localhost:8088/employees/${id}`)
  return await response.json()
}

export const UpdateEmployee = async (id, updatedEmployee) => {
  const response = await fetch(`http://localhost:8088/employees/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedEmployee),
  })
  return await response.json()
}


export const getEmployeeByEmail = (email) => {
  return fetch(`http://localhost:8088/employees?email=${email}`
  ).then((res) => res.json())
      
}
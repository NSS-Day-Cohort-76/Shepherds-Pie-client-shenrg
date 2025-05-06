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


export const getEmployeeByEmail = (email) => {
  return fetch(`http://localhost:8088/employees?email=${email}`
  ).then((res) => res.json())
      
}

export const assignDriverToOrder = (orderId, driverId) => {
  return fetch(`http://localhost:8088/orders/${orderId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ driverId }),
  }).then((res) => res.json());
};

export const updateEmployeeStatus = async (employeeId, data) => {
  return fetch(`http://localhost:8088/employees/${employeeId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

export const setDriverOnDelivery = (driverId, onDelivery) => {
  return fetch(`http://localhost:8088/employees/${driverId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ onDelivery }),
  });
};
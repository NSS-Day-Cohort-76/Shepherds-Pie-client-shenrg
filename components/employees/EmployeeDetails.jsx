
// Ticket #7, Frame #10

// Should listen for a click on the employee list, opens to new page and shows more details about the clicked on employee.
// Should have input fields to edit all of the employee information, which includes name, number, email, address. 
// Needs a save button at the bottom to save the changes made, then redirecting back to the employee list. 

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetEmployeeById, UpdateEmployee } from "../../services/employeeService.jsx";

export const EmployeeDetails = () => {
  const { employeeId } = useParams(); 
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    GetEmployeeById(employeeId).then((data) => {
      setEmployee(data);
      setFormData({
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
      });
    });
  }, [employeeId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Please enter a name!";
    if (!formData.email.includes("@")) newErrors.email = "Email must be valid!";
    if (formData.phone.length !== 12) newErrors.phone = "Phone number must be 12 characters!";
    if (!formData.address) newErrors.address = "Address is required!";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; 
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    if (validateForm()) {
      UpdateEmployee(employeeId, formData).then(() => {
        const isConfirmed = window.confirm("Employee details updated successfully!");
        if (isConfirmed) {
          navigate("/employees/");
        }
      });
    }
  };
  if (!employee) return <div>Loading...</div>;

  return (
    <div className="employee-details-container">
      <h2>Edit Employee Details</h2>
      {message && <div className="message">{message}</div>}
      <form onSubmit={handleSaveChanges}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {errors.name && <div className="error">{errors.name}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
          />
          {errors.phone && <div className="error">{errors.phone}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
          />
          {errors.address && <div className="error">{errors.address}</div>}
        </div>
        <button className="save-button" type="submit">Save Changes</button>
      </form>
    </div>
  );
};

// Refers to ticket #1 / Frame 2 

import { useNavigate } from "react-router-dom"
import "./OrderForm.css"
import { useState } from "react"
import { createOrder } from "../../services/orderService.jsx"


// When the employee hits start order, this component will load. This is where they will input 
// their customer info and unique order ID will be generated.
//  Should be a button at the bottom to take you to pizza creating component

export const OrderForm = ({ currentUser }) => {
    const [order, setOrder] = useState({
      customerName: "",
      customerPhone: "",
      orderStatus: "",
      createdAt: "",
      totalCost: 0,
      tip: 0
      
    })

    const navigate = useNavigate()

    const handleSave = (event) => {
        event.preventDefault()

        if (order.customerName && order.customerPhone) {
            const newOrder = {
                employeeId: currentUser?.id,
                customerName: order.customerName,
                customerPhone: order.customerPhone,
                tip: order.tip,
                createdAt: new Date().toISOString(),
                totalCost: order.totalCost
            }

            createOrder(newOrder).then(() => {
              navigate("/list")
            })
        } else {
          window.alert("Please fill out all the input fields.")
        }
    }

    return (
      <form>
      <h2>Customer Details</h2>
      <fieldset>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Customer name"
            onChange={(event) => {
              const orderCopy = { ...order };
              orderCopy.customerName = event.target.value;
              setOrder(orderCopy);
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label>Contact Info</label>
          <input
            type="text"
            className="form-control"
            placeholder="Phone number"
            onChange={(event) => {
              const orderCopy = { ...order };
              orderCopy.customerPhone = event.target.value;
              setOrder(orderCopy);
            }}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <button className="form-btn btn-info" onClick={handleSave}>
            Start Order
          </button>
        </div>
      </fieldset>
    </form>
  );
};
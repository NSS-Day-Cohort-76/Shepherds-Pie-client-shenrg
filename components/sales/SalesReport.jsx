
// Ticket #10, Frame 11

import { useEffect, useState } from "react"
import { GetAllOrders } from "../../services/orderService.jsx"
import "./Sales.css"

// Needs to be a date select button 
// If an employee is logged in, the sales report section should list a report for whatever month is selected, 
// should list total # of orders, sales amount, average order value, and day by day breakdown of sales

// 

export const SalesReport = () => {
    const [selectedMonth, setSelectedMonth] = useState("2025-05")
    const [filteredOrders, setFilteredOrders] = useState([])
    const [orders, setOrders] = useState([])

    useEffect(() => {
        GetAllOrders().then((data) => {
            setOrders(data)
        })
        .catch((error) => {
            console.error("Error fetching orders:", error)
        })
    }, [])

    const filteredOrdersByMonth = () => {
        const filtered = orders.filter((order) => {
            const orderDate = new Date(order.createdAt)
            const orderMonth = `${orderDate.getFullYear()}-${String(orderDate.getMonth() + 1).padStart(2, "0")}`
            return orderMonth === selectedMonth
        })
        setFilteredOrders(filtered)
    }

    useEffect(() => {
        filteredOrdersByMonth
    }, [selectedMonth, orders])

    return (
        <div>
            <h2>Sales Report</h2>
            <label htmlFor="month-select">Select Month:</label>
            <input
            type="month"
            id="month-select"
            value={selectedMonth}
            onChange={(event) => setSelectedMonth(event.target.value)}
            />
            <div>
                <h3>Report for {selectedMonth}</h3>
                <p>Total Orders: {filteredOrders.length}</p>
                <p>
                    Total Sales: $
                    {filteredOrders.reduce((total, order) => total + order.totalAmount, 0).toFixed(2)}
                </p>
                <p>
                    Average Order Value: $
                    {filteredOrders.length > 0 ? (filteredOrders.reduce((total, order) => total + order.totalAmount, 0) / filteredOrders.length).toFixed(2) : 0}
                </p>
                <h4>Day-by-Day Breakdown:</h4>
                <ul>
                    {filteredOrders.map((order) => (
                        <li key={order.id}>
                            {new Date(order.createdAt).toLocaleDateString()}: ${order.totalAmount.toFixed(2)}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
} 
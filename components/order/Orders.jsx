import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import { GetAllOrders } from "../../services/orderService.jsx";


export const Orders = ({ order, employees }) => {
  const [allOrders, setAllOrders] = useState([]);


  useEffect(() => {
    const fetchOrders = async () => {
        try {
            const orders = await GetAllOrders();
            setAllOrders(orders);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    fetchOrders();
}, []); // Empty dependency array ensures this runs only on mount

    const handleDriverAssign = async (orderId, driverId) => {
      try {
        await assignDriverToOrder(orderId, driverId);
        await updateEmployeeStatus(driverId, { onDelivery: true });
        const updatedOrders = await GetAllOrders();
        setAllOrders(updatedOrders);
      } catch (error) {
        console.error("Error assigning driver:", error);
      }
    };

    return (
        <section className="order">
            <Link to={`/list/${order.id}`}>
                <header className="order-info">Order #{order.id}</header>
                <div>{order.orderStatus}</div>
                <footer>
                    <div>
                        <div className="order-info">Customer Name</div>
                        <div>{order.customerName}</div>
                    </div>
                    <div>
                        <div className="order-info">Customer Number</div>
                        <div>{order.customerPhone}</div>
                    </div>
                </footer>
            </Link>
            <label htmlFor={`driver-${order.id}`}>Assign Driver:</label>
                <select
                  id={`driver-${order.id}`}
                  onChange={(e) => handleDriverAssign(order.id, parseInt(e.target.value))}
                  defaultValue=""
                >
                  <option value="" disabled>Select a driver</option>
                  {employees.map((driver) => (
                    <option key={driver.id} value={driver.id}>
                      {driver.name} {driver.onDelivery ? "(On Delivery)" : ""}
                    </option>
                  ))}
                </select>
        </section>
    )
}

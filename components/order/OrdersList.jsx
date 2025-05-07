import { useEffect, useState } from "react";
import { GetAllOrders } from "../../services/orderService.jsx";
import { Link } from "react-router-dom";
import "./OrdersList.css";
import { assignDriverToOrder, GetAllEmployees, updateEmployeeStatus,} from "../../services/employeeService.jsx";
import { Orders } from "./Orders.jsx";


export const OrdersList = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // Defaults to today
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 20;
  const [employees, setEmployees] = useState([]);
  // Helper function to filter and sort orders based on the selected date
  const filterAndSortOrders = (orders, date) => {
    return orders
      .filter((order) => {
        if (!order.createdAt) {
          return false;
        }
        const orderDate = order.createdAt.split("T")[0];
        return orderDate === date;
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  };
  useEffect(() => {
    GetAllOrders().then((ordersArray) => {
      setAllOrders(ordersArray);
      const sortedFilteredOrders = filterAndSortOrders(
        ordersArray,
        selectedDate
      );
      setFilteredOrders(sortedFilteredOrders);
    });
  }, []);
  useEffect(() => {
    GetAllEmployees().then((employeesArray) => {
      const drivers = employeesArray.filter(
        (emp) => emp.isDriver && !emp.onDelivery
      );
      setEmployees(drivers);
    });
  }, []);
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
  // Whenever selectedDate or allOrders change, filter and reset to page 1
  useEffect(() => {
    const sortedFilteredOrders = filterAndSortOrders(allOrders, selectedDate);
    setFilteredOrders(sortedFilteredOrders);
    setCurrentPage(1); // Reset to first page when date changes
  }, [selectedDate, allOrders]);
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(
    indexOfFirstOrder,
    indexOfLastOrder
  );
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  // In OrdersList.jsx, add this before the return statement
  useEffect(() => {
    console.log("filteredOrders:", filteredOrders)
  }, [filteredOrders])
  return (
    <div className="order">
      <h2>Orders</h2>
      <label htmlFor="datePicker">Select Date:</label>
      <input
        type="date"
        id="datePicker"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />
      <article className="orders">
        {filteredOrders.length === 0 ? (
          <p>No orders for {selectedDate}.</p>
        ) : (
          filteredOrders.map((order) => {
            return (
              <section key={order.id} className="order">
                <Link to={`/list/${order.id}`} className="order-link">
                  <header className="order-info">Order #{order.id}</header>
                  <div>{order.orderStatus}</div>
                  <footer>
                    <div>
                      <div className="order-info">Customer Name</div>
                      <div>{order.customerName}</div>
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
            );
          })
        )}
      </article>
      <div>
        {currentPage > 1 && (
          <button
            className="pagination-button"
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
        )}
        {currentPage < totalPages && (
          <button
            className="pagination-button"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};
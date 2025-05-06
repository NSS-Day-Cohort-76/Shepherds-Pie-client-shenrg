import { useEffect, useState } from "react";
import { GetAllOrders } from "../../services/orderService.jsx";
import { Link } from "react-router-dom";
import "./OrdersList.css";
import { Orders } from "./Orders.jsx";

export const OrdersList = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]); // Default to today

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
      if (Array.isArray(ordersArray)) {
        setAllOrders(ordersArray);
        const sortedFilteredOrders = filterAndSortOrders(ordersArray, selectedDate);
        setFilteredOrders(sortedFilteredOrders);
      } else {
        console.error("Fetched data is not an array:", ordersArray);
      }
    });
  }, []);

  // Whenever selectedDate changes, filter the orders again
  useEffect(() => {
    const sortedFilteredOrders = filterAndSortOrders(allOrders, selectedDate);
    setFilteredOrders(sortedFilteredOrders);
  }, [selectedDate, allOrders]);

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

      <article className="order">
        {filteredOrders.length === 0 ? (
          <p>No orders for {selectedDate}.</p>
        ) : (
          filteredOrders.map((orderObj) => (
            <Orders
              key={orderObj.id}
              order={orderObj}
            />
          ))
        )}
      </article>
    </div>
  );
};
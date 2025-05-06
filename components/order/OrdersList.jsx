import { useEffect, useState } from "react"
import { GetAllOrders } from "../../services/orderService.jsx"
import { Link } from "react-router-dom"
import "./OrdersList.css"

// This component looks at ticket #2 / Frame 4

// Should list all orders, starting with todays orders by default (newest first). Date select functionality to look at orders on any given day.  
// Id, customer name, and status should be displayed. 

// Status should be updated automatically based off of order type / if completed or not

// Orders need to be "paginated" so only x amount of orders on one page, ability to click and go back and forth on different pages of orders. 

export const OrdersList = () => {
  const [allOrders, setAllOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]) // This sets our default time to today!

  // This is a helper function to filter and sort the orders based on the selected date
  const filterAndSortOrders = (orders, date) => {
    return orders
      .filter((order) => {
        const orderDate = order.date.split("T")[0]
        return orderDate === date
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date))
  }

  useEffect(() => {
    GetAllOrders().then((ordersArray) => {
      if (Array.isArray(ordersArray)) {
        setAllOrders(ordersArray)
        const sortedFilteredOrders = filterAndSortOrders(ordersArray, selectedDate)
        setFilteredOrders(sortedFilteredOrders)
      } else {
        console.error("Fetched data is not an array:", ordersArray)
      }
    })
  }, [])

  // // Whenever selectedDate changes, filter the orders again (and set)
  useEffect(() => {
    const sortedFilteredOrders = filterAndSortOrders(allOrders, selectedDate)
    setFilteredOrders(sortedFilteredOrders)
  }, [selectedDate, allOrders])

  return (
    <div className="orders-container">
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
              </section>
            )
          })
        )}
      </article>
    </div>
  )
}

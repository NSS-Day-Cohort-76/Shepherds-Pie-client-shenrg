import { useEffect, useState } from "react"
import { getAllOrders } from "../../services/orderService.jsx"



// This component looks at ticket #2 / Frame 4

// Should list all orders, starting with todays orders by default (newest first). Date select functionality to look at orders on any given day.  
// Id, customer name, and status should be displayed. 

// Status should be updated automatically based off of order type / if completed or not

// Orders need to be "paginated" so only x amount of orders on one page, ability to click and go back and forth on different pages of orders. 



export const OrdersList = () => {
        const [allOrders, setAllOrders] = useState([])

  useEffect(() => {
    getAllOrders().then((ordersArray) => {
      setAllOrders(ordersArray)
      console.log("orders set!")
    })
  }, [])

  return (
  <div className="orders-container">
    <h2>Orders</h2>
    <article className="orders">
      {allOrders.map((order) => {
        return (
          <section className="order">
            <header className="order-info">Order #{order.id}</header>
            <div>{order.orderStatus}</div>
            <footer>
              <div>
                <div className="order-info">Customer Name</div>
                <div>{order.customerName}</div>
              </div>
            </footer>
          </section>
        )
      })}
    </article>
  </div>
  )
}

// This component is looking at ticket #3 / frame 5

// When a specific order is clicked on, we should be able to see all information about that order. Order ID, datetime, customer info,
//  pizzas in the order, total cost

// Each pizza in the order should display cheese, size, sauce, toppings, and cost for that specific pizza. 

// Should have buttons for editing, assigning a driver, canceling the order, and confirming the changes.  

// Should be smaller buttons on the actual pizzas (see wireframe) to edit or remove those specific pizzas

import { Link, useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { getPizzasByOrderId } from "../../services/orderService.jsx"
import "./OrdersList.css"

export const OrderDetails = () => {

    const navigate = useNavigate()

    const [order, setOrder] = useState({
        id: 0,
        customerName: "",
        totalCost: 0,
        pizzas: []
    })
    const { orderId } = useParams()

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount)
    }

    useEffect(() => {
        console.log("orderId:", orderId)
        getPizzasByOrderId(orderId).then((orderData) => {
            console.log("API response:", orderData)
            setOrder(orderData)
        })
    }, [orderId])

    return (
        <section className="order">
            <header className="order-header">
                <h2>Order Details #{orderId}</h2>
            </header>
            
            {/* Basic order info */}
            <div className="order-info-container">
                <div>
                    <button onClick={() => navigate(`/orders/${orderId}/add-pizza`)}>
                     Add Pizza
                    </button>
                </div>
                <div>
                    <span className="order-info">Customer Name: </span>
                    {order?.customerName}
                </div>
                <div>
                    <span className="order-info">Customer Phone: </span>
                    {order?.customerPhone}
                </div>
                <div>
                    <span className="order-info">Total Cost: </span>
                    {order?.totalCost && formatCurrency(order.totalCost)}
                </div>
            </div>

            {/* Pizza list section */}
            {/* Pizza list section */}
<section className="order-container">
    <h3>Pizzas in this Order:</h3>
    {order?.pizzas?.map((pizza, index) => (
        <div key={pizza.id} className="orders">
            <div className="order-details">
                <p>Pizza #{index + 1}</p>
                <p>Size: {pizza.size}</p>
                <p>Sauce: {pizza.sauce}</p>
                <p>Cheese: {pizza.cheese}</p>
                <p>Cost: {formatCurrency(pizza.cost)}</p>
            </div>
            <div className="btn-container">
                <button onClick={() => navigate(`/orders/${orderId}/edit-pizza/${pizza.id}`)}>Edit</button>
                <button onClick={() => handleDeletePizza(pizza.id)}>Delete</button>
            </div>
        </div>
    ))}
</section>
        </section>
    )
}





// export const OrderDetails = () => {
//     const [order, setOrder] = useState([])
//     const { orderId } = useParams() // { orderId: 3}

//     useEffect(() => {
//         getPizzasByOrderId(orderId).then((data) => {
//             const orderObj = data[0]
//             setOrder(orderObj)
//         })
//     }, [orderId])

//     // Function to format cost as USD
//     const formatCurrency = (amount) => {
//         return new Intl.NumberFormat("en-US", {
//             style: "currency",
//             currency: "USD",
//         }).format(amount)
//     }

//     return (
//         <section className="order">
//             <header className="order-header">{pizzas.id}</header>
//             <div>
//                 <span className="order-info">Pizza # : </span>
//                 {order.employee?.email}
//             </div>
//             <div>
//                 <span className="order-info">Customer Name : </span>
//                 {order.customerName}
//             </div>
//             <div>
//                 <span className="order-info">Cost : </span>
//                 {formatCurrency(order.totalCost)} {/* formats this number to USD */}
//             <div>
//                 <span className="order-info">Tickets Assigned : </span>
//                 {order.orderTickets?.length} {/* Display the ticket count */}
//             </div>
//             </div>
//         </section>
//     )
// }
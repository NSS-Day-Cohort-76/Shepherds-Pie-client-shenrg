
// This component is looking at ticket #3 / frame 5

// When a specific order is clicked on, we should be able to see all information about that order. Order ID, datetime, customer info,
//  pizzas in the order, total cost

// Each pizza in the order should display cheese, size, sauce, toppings, and cost for that specific pizza. 

// Should have buttons for editing, assigning a driver, canceling the order, and confirming the changes.  

// Should be smaller buttons on the actual pizzas (see wireframe) to edit or remove those specific pizzas

import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { getPizzasByOrderId } from "../../services/orderService.jsx"
import { deletePizza } from "../../services/orderService.jsx"
import "./OrdersList.css"
import { PizzaCard } from "../pizza/PizzaCard.jsx"
import { saveTip } from "../../services/orderService.jsx"
import { cancelOrder } from "../../services/orderService.jsx"

export const OrderDetails = ({ orderObj }) => {
    const [order, setOrder] = useState({
        id: 0,
        customerName: "",
        totalCost: 0,
        tip: 0,
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


    const handleTipChange = (event) => {
        const tipAmount = parseFloat(event.target.value) || 0;
        setOrder((prevOrder) => ({
            ...prevOrder,
            tip: tipAmount, // Only update the tip
        }));
    };


    // Fix handleDeletePizza function
    const handleDeletePizza = (pizzaId) => {
        if (window.confirm("Are you sure you want to delete this pizza?")) {
            deletePizza(pizzaId)
                .then(() => {
                    // Update the order state to remove the deleted pizza
                    setOrder(prevOrder => ({
                        ...prevOrder,
                        pizzas: prevOrder.pizzas.filter(p => p.id !== pizzaId)
                    }))
                })
                .catch(error => {
                    console.error("Error deleting pizza:", error)
                })
        }
    }

    const handleSaveTip = () => {
        if (window.confirm("Are you sure you want to update the tip?")) {
            saveTip(orderId, order.tip) // Pass the orderId and tip to the saveTip function
                .then(() => {
                    alert("Tip updated successfully!");
                    // Optionally, fetch the updated order from the database to ensure state is in sync
                    setOrder((prevOrder) => ({
                        ...prevOrder,
                        tip: order.tip, // Ensure the tip in state matches the saved tip
                    }));
                })
                .catch((error) => {
                    console.error("Error saving tip:", error);
                    alert("An error occurred while saving the tip. Please try again.");
                });
        }
    };

    const handleDeleteOrder = (orderId) => {
        if (window.confirm("Are you sure you want to cancel this order? This action cannot be undone.")) {
            cancelOrder(orderId) // Use the correct function to delete the order
                .then(() => {
                    alert("Order has been successfully canceled.");
                    // Optionally redirect or update the UI
                    window.location.href = "/list"; // Redirect to the orders list
                })
                .catch((error) => {
                    console.error("Error deleting order:", error);
                    alert("An error occurred while canceling the order. Please try again.");
                });
        }
    };

    return (
        <section className="order">
            <header className="order-header">
                <h2>Order Details #{orderId}</h2>
            </header>

            {/* Basic order info */}
            <div className="order-info-container">
                <div>
                    <span className="order-info">Customer Name: </span>
                    {order?.customerName}
                </div>
                <div>
                    <span className="order-info">Customer Phone: </span>
                    {order?.customerPhone}
                </div>
                <div className="tip-container">
                    <span className="order-info">Tip: </span>
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={order?.tip || ""} // Bind to order.tip
                        onChange={handleTipChange} // Call handleTipChange on input change
                        className="tip-input"
                    />
                    <button onClick= {handleSaveTip} className="btn-edit">
                        Save Tip
                    </button>
                </div>
                <div>
                    <button onClick={handleDeleteOrder} className="btn-edit">
                        Cancel Order
                    </button>
                </div>
                <div>
                    <span className="order-info">Total Cost: </span>
                    {order?.totalCost && formatCurrency(order.totalCost)}
                </div>
            </div>

            {/* Pizza list section */}
            {/* Pizza list section */}
            <section className="pizza-card">
                <h3>Pizzas in this Order:</h3>
                {order?.pizzas?.map((pizza, index) => (
                    <PizzaCard
                        key={pizza.id}
                        pizza={pizza}
                        index={index}
                        // onEdit={handleEditPizza}
                        onDelete={handleDeletePizza} />
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
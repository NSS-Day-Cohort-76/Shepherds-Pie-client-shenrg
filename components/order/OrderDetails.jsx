
// This component is looking at ticket #3 / frame 5

// When a specific order is clicked on, we should be able to see all information about that order. Order ID, datetime, customer info,
//  pizzas in the order, total cost

// Each pizza in the order should display cheese, size, sauce, toppings, and cost for that specific pizza. 

// Should have buttons for editing, assigning a driver, canceling the order, and confirming the changes.  

// Should be smaller buttons on the actual pizzas (see wireframe) to edit or remove those specific pizzas

import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPizzasByOrderId, deletePizza, saveTip, cancelOrder, fetchPizzasWithToppingsAndCosts } from "../../services/orderService.jsx";
import "./OrdersList.css";

export const OrderDetails = () => {
    const navigate = useNavigate();
    const { orderId } = useParams();

    const [order, setOrder] = useState({
        id: 0,
        customerName: "",
        customerPhone: "",
        totalCost: 0,
        tip: 0,
        pizzas: [],
    });

    // Helper function to format currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount);
    };

    // Fetch order details and calculate pizza costs
    useEffect(() => {
        getPizzasByOrderId(orderId).then((orderData) => {
            fetchPizzasWithToppingsAndCosts().then((pizzasWithCosts) => {
                const updatedPizzas = orderData.pizzas.map((pizza) => {
                    const pizzaWithCost = pizzasWithCosts.find((p) => p.id === pizza.id);
                    return pizzaWithCost || pizza; // Use the pizza with cost if available
                });

                setOrder({
                    ...orderData,
                    pizzas: updatedPizzas,
                });
            });
        });
    }, [orderId]);

    // Calculate the total cost of all pizzas in the order
    const calculateTotalCost = () => {
        const pizzasCost = order.pizzas.reduce((total, pizza) => total + (pizza.totalCost || 0), 0);
        return pizzasCost + (order.tip || 0);
    };

    // Handle tip change
    const handleTipChange = (event) => {
        const tipAmount = parseFloat(event.target.value) || 0;
        setOrder((prevOrder) => ({
            ...prevOrder,
            tip: tipAmount,
        }));
    };

    // Save the updated tip
    const handleSaveTip = () => {
        if (window.confirm("Are you sure you want to update the tip?")) {
            saveTip(orderId, order.tip)
                .then(() => {
                    alert("Tip updated successfully!");
                })
                .catch((error) => {
                    console.error("Error saving tip:", error);
                    alert("An error occurred while saving the tip. Please try again.");
                });
        }
    };

    // Delete a specific pizza
    const handleDeletePizza = (pizzaId) => {
        if (window.confirm("Are you sure you want to delete this pizza?")) {
            deletePizza(pizzaId)
                .then(() => {
                    setOrder((prevOrder) => ({
                        ...prevOrder,
                        pizzas: prevOrder.pizzas.filter((p) => p.id !== pizzaId),
                    }));
                })
                .catch((error) => {
                    console.error("Error deleting pizza:", error);
                });
        }
    };

    // Cancel the entire order
    const handleDeleteOrder = () => {
        if (window.confirm("Are you sure you want to cancel this order? This action cannot be undone.")) {
            cancelOrder(orderId)
                .then(() => {
                    alert("Order has been successfully canceled.");
                    navigate(`/list`);
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
                    <button onClick={() => navigate(`/orders/${orderId}/add-pizza`)}>Add Pizza</button>
                </div>
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
                        value={order?.tip || ""}
                        onChange={handleTipChange}
                        className="tip-input"
                    />
                    <button onClick={handleSaveTip} className="btn-edit">
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
                    {formatCurrency(calculateTotalCost())}
                </div>
            </div>

            {/* Pizza list section */}
            <section className="order-container">
                <h3>Pizzas in this Order:</h3>
                {order?.pizzas?.map((pizza, index) => (
                    <div key={pizza.id} className="orders">
                        <div className="order-details">
                            <p>Pizza #{index + 1}</p>
                            <p>Size: {pizza.size?.name || "N/A"}</p> {/* Render the name of the size */}
                            <p>Base Cost: {formatCurrency(pizza.size?.baseCost || 0)}</p> {/* Render the base cost */}
                            {/* <p>Sauce: {pizza.sauce || "N/A"}</p>
                            <p>Cheese: {pizza.cheese || "N/A"}</p> */}
                            <p>
                                Toppings:{" "}
                                {pizza.toppings?.length > 0
                                    ? pizza.toppings.map((topping) => topping.name).join(", ")
                                    : "None"}
                            </p>
                            <p>Cost: {formatCurrency(pizza.totalCost || 0)}</p>
                        </div>
                        <div className="btn-container">
                            <button onClick={() => navigate(`/orders/${orderId}/edit-pizza/${pizza.id}`)}>Edit</button>
                            <button onClick={() => handleDeletePizza(pizza.id)}>Delete</button>
                        </div>
                    </div>
                ))}
                </section>
            </section>
)}
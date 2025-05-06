import { GetAllOrders } from "../../services/orderService.jsx";
import { GetPizzasWithToppings } from "../../services/pizzaService.jsx"; // Import the updated function
import React, { useState, useEffect } from "react";

export const SalesReport = () => {
    const [selectedMonth, setSelectedMonth] = useState("2025-05");
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [orders, setOrders] = useState([]);
    const [pizzas, setPizzas] = useState([]); // State to store pizza details with toppings
    const [popularItems, setPopularItems] = useState({});

    useEffect(() => {
        // Fetch orders
        GetAllOrders()
            .then((data) => {
                setOrders(data);
                console.log("Orders:", data.map((order) => order.pizzaId)); // Log the pizzaId values from orders
            })
            .catch((error) => {
                console.error("Error fetching orders:", error);
            });
    
        // Fetch pizzas with toppings
        GetPizzasWithToppings()
            .then((data) => {
                setPizzas(data);
                console.log("Pizzas:", data); // Log the pizzas array
            })
            .catch((error) => {
                console.error("Error fetching pizzas with toppings:", error);
            });
    }, []);

    const filteredOrdersByMonth = () => {
        const filtered = orders.filter((order) => {
            const orderDate = new Date(order.createdAt);
            const orderMonth = `${orderDate.getFullYear()}-${String(orderDate.getMonth() + 1).padStart(2, "0")}`;
            return orderMonth === selectedMonth;
        });
        setFilteredOrders(filtered);
    };

    const calculatePopularItems = () => {
        const sizeCounts = {};
        const cheeseCounts = {};
        const sauceCounts = {};
        const toppingCounts = {};
    
        filteredOrders.forEach((order) => {
            const pizza = pizzas.find((p) => p.id === order.pizzaId); // Match pizza by pizzaId
            if (!pizza) {
                console.warn(`Pizza not found for order with pizzaId: ${order.pizzaId}`, order); // Debugging
                return; // Skip if pizza details are missing
            }
    
            const { sizeId, cheeseId, sauceId, toppings } = pizza;
    
            // Count pizza sizes
            sizeCounts[sizeId] = (sizeCounts[sizeId] || 0) + 1;
    
            // Count cheese types
            cheeseCounts[cheeseId] = (cheeseCounts[cheeseId] || 0) + 1;
    
            // Count sauce types
            sauceCounts[sauceId] = (sauceCounts[sauceId] || 0) + 1;
    
            // Count toppings
            if (Array.isArray(toppings)) {
                toppings.forEach((toppingId) => {
                    toppingCounts[toppingId] = (toppingCounts[toppingId] || 0) + 1;
                });
            }
        });
    
        // Find the most popular items
        const mostPopularSize = Object.entries(sizeCounts).sort((a, b) => b[1] - a[1])[0];
        const mostPopularCheese = Object.entries(cheeseCounts).sort((a, b) => b[1] - a[1])[0];
        const mostPopularSauce = Object.entries(sauceCounts).sort((a, b) => b[1] - a[1])[0];
        const topToppings = Object.entries(toppingCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3);
    
        setPopularItems({
            mostPopularSize,
            mostPopularCheese,
            mostPopularSauce,
            topToppings,
        });
    };

    useEffect(() => {
        filteredOrdersByMonth();
    }, [selectedMonth, orders]);

    useEffect(() => {
        calculatePopularItems();
    }, [filteredOrders, pizzas]);

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
                    {filteredOrders.reduce((total, order) => total + order.totalCost, 0).toFixed(2)}
                </p>
                <p>
                    Average Order Value: $
                    {filteredOrders.length > 0
                        ? (filteredOrders.reduce((total, order) => total + order.totalCost, 0) / filteredOrders.length).toFixed(2)
                        : 0}
                </p>
                <h4>Day-by-Day Breakdown:</h4>
                <ul>
                    {filteredOrders.map((order) => (
                        <li key={order.id}>
                            {new Date(order.createdAt).toLocaleDateString()}: ${order.totalCost.toFixed(2)}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h3>Popular Items</h3>
                <p>
                    Most Popular Size: {popularItems.mostPopularSize?.[0]} ({popularItems.mostPopularSize?.[1]} orders)
                </p>
                <p>
                    Most Popular Cheese: {popularItems.mostPopularCheese?.[0]} ({popularItems.mostPopularCheese?.[1]} orders)
                </p>
                <p>
                    Most Popular Sauce: {popularItems.mostPopularSauce?.[0]} ({popularItems.mostPopularSauce?.[1]} orders)
                </p>
                <h4>Top 3 Toppings:</h4>
                <ul>
                    {popularItems.topToppings?.map(([topping, count]) => (
                        <li key={topping}>
                            {topping}: {count} orders
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
import { GetAllOrders } from "../../services/orderService.jsx";
import { GetPizzasWithToppings } from "../../services/pizzaService.jsx";
import React, { useState, useEffect } from "react";
import "./Sales.css"
export const SalesReport = () => {
    const [selectedMonth, setSelectedMonth] = useState("2025-05");
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [orders, setOrders] = useState([]);
    const [pizzas, setPizzas] = useState([]);
    const [popularItems, setPopularItems] = useState({});
    const [sizes, setSizes] = useState([]);
    const [cheeses, setCheeses] = useState([]);
    const [sauces, setSauces] = useState([]);
    const [toppings, setToppings] = useState([]);
    // New state for selected item detail view
    const [selectedItemDetail, setSelectedItemDetail] = useState(null);
    useEffect(() => {
        GetAllOrders()
            .then((data) => {
                setOrders(data);
                console.log("Orders:", data.map((order) => order.pizzaId));
            })
            .catch((error) => {
                console.error("Error fetching orders:", error);
            });
        GetPizzasWithToppings()
            .then((data) => {
                setPizzas(data);
                console.log("Pizzas:", data);
            })
            .catch((error) => {
                console.error("Error fetching pizzas with toppings:", error);
            });
        fetch("http://localhost:8088/sizes")
            .then((response) => response.json())
            .then((data) => setSizes(data))
            .catch((error) => console.error("Error fetching sizes:", error));
        fetch("http://localhost:8088/cheeses")
            .then((response) => response.json())
            .then((data) => setCheeses(data))
            .catch((error) => console.error("Error fetching cheeses:", error));
        fetch("http://localhost:8088/sauces")
            .then((response) => response.json())
            .then((data) => setSauces(data))
            .catch((error) => console.error("Error fetching sauces:", error));
        fetch("http://localhost:8088/toppings")
            .then((response) => response.json())
            .then((data) => setToppings(data))
            .catch((error) => console.error("Error fetching toppings:", error));
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
            const pizzasForOrder = pizzas.filter((pizza) => pizza.orderId === order.id);
            pizzasForOrder.forEach((pizza) => {
            const { sizeId, cheeseId, sauceId, toppings } = pizza;
            sizeCounts[sizeId] = (sizeCounts[sizeId] || 0) + 1;
            cheeseCounts[cheeseId] = (cheeseCounts[cheeseId] || 0) + 1;
            sauceCounts[sauceId] = (sauceCounts[sauceId] || 0) + 1;
            if (Array.isArray(toppings)) {
                toppings.forEach((toppingId) => {
                    toppingCounts[toppingId] = (toppingCounts[toppingId] || 0) + 1;
                });
            }
        })
    });
        const mostPopularSize = Object.entries(sizeCounts).sort((a, b) => b[1] - a[1])[0];
        const mostPopularCheese = Object.entries(cheeseCounts).sort((a, b) => b[1] - a[1])[0];
        const mostPopularSauce = Object.entries(sauceCounts).sort((a, b) => b[1] - a[1])[0];
        const topToppings = Object.entries(toppingCounts).sort((a, b) => b[1] - a[1]).slice(0, 3);
        setPopularItems({
            mostPopularSize,
            mostPopularCheese,
            mostPopularSauce,
            topToppings,
        });
    };
    const getNameById = (id, data) => {
        const item = data.find((d) => d.id === Number(id) || d.id === id);
        return item ? item.name : "Unknown";
    };
    const handleItemClick = (type, id, name) => {
        setSelectedItemDetail({ type, id, name });
    };
    const getItemBreakdown = () => {
        if (!selectedItemDetail || filteredOrders.length === 0) return null;
        const { type, id } = selectedItemDetail;
        let matchCount = 0;
        filteredOrders.forEach((order) => {
            const pizzasForOrder = pizzas.filter((pizza) => pizza.orderId === order.id);
            pizzasForOrder.forEach((pizza) => {
            if (type === "size" && pizza.sizeId === id) matchCount++;
            if (type === "cheese" && pizza.cheeseId === id) matchCount++;
            if (type === "sauce" && pizza.sauceId === id) matchCount++;
            if (type === "topping" && Array.isArray(pizza.toppings) && pizza.toppings.includes(id)) matchCount++;
            })     
        });
        const percentage = ((matchCount / filteredOrders.length) * 100).toFixed(1);
        return { matchCount, percentage };
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
            {/* Month Selection */}
            <label htmlFor="month-select">Select Month:</label>
            <input
                type="month"
                id="month-select"
                value={selectedMonth}
                onChange={(event) => setSelectedMonth(event.target.value)}
            />
            <div>
                {/* Report Summary */}
                <h3>Report for {selectedMonth}</h3>
                <p>Total Orders: {filteredOrders.length}</p>
                <p>
                    Total Sales: $
                    {filteredOrders.reduce((total, order) => total + order.totalCost, 0)?.toFixed(2)}
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
                            {new Date(order.createdAt).toLocaleDateString()}: ${order.totalCost?.toFixed(2)}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                {/* Popular Items */}
                <h3>Popular Items</h3>
                {/* Most Popular Size */}
                <p
                    className={`clickable ${selectedItemDetail?.type === "size" && selectedItemDetail.id === Number(popularItems.mostPopularSize?.[0])
                            ? "selected"
                            : ""
                        }`}
                    onClick={() =>
                        handleItemClick(
                            "size",
                            Number(popularItems.mostPopularSize?.[0]),
                            getNameById(popularItems.mostPopularSize?.[0], sizes)
                        )
                    }
                >
                    Most Popular Size: {getNameById(popularItems.mostPopularSize?.[0], sizes)} (
                    {popularItems.mostPopularSize?.[1]} orders)
                </p>
                {/* Most Popular Cheese */}
                <p
                    className={`clickable ${selectedItemDetail?.type === "cheese" && selectedItemDetail.id === Number(popularItems.mostPopularCheese?.[0])
                            ? "selected"
                            : ""
                        }`}
                    onClick={() =>
                        handleItemClick(
                            "cheese",
                            Number(popularItems.mostPopularCheese?.[0]),
                            getNameById(popularItems.mostPopularCheese?.[0], cheeses)
                        )
                    }
                >
                    Most Popular Cheese: {getNameById(popularItems.mostPopularCheese?.[0], cheeses)} (
                    {popularItems.mostPopularCheese?.[1]} orders)
                </p>
                {/* Most Popular Sauce */}
                <p
                    className={`clickable ${selectedItemDetail?.type === "sauce" && selectedItemDetail.id === Number(popularItems.mostPopularSauce?.[0])
                            ? "selected"
                            : ""
                        }`}
                    onClick={() =>
                        handleItemClick(
                            "sauce",
                            Number(popularItems.mostPopularSauce?.[0]),
                            getNameById(popularItems.mostPopularSauce?.[0], sauces)
                        )
                    }
                >
                    Most Popular Sauce: {getNameById(popularItems.mostPopularSauce?.[0], sauces)} (
                    {popularItems.mostPopularSauce?.[1]} orders)
                </p>
                {/* Top 3 Toppings */}
                <h4>Top 3 Toppings:</h4>
                <ul>
                    {popularItems.topToppings?.map(([toppingId, count]) => (
                        <li
                            key={toppingId}
                            className={`clickable ${selectedItemDetail?.type === "topping" && selectedItemDetail.id === Number(toppingId)
                                    ? "selected"
                                    : ""
                                }`}
                            onClick={() =>
                                handleItemClick("topping", Number(toppingId), getNameById(toppingId, toppings))
                            }
                        >
                            {getNameById(toppingId, toppings)}: {count} orders
                        </li>
                    ))}
                </ul>
            </div>
            {/* Breakdown box */}
            {selectedItemDetail && (
                <div className="breakdown-box">
                    <h4>Detail for: {selectedItemDetail.name}</h4>
                    {(() => {
                        const breakdown = getItemBreakdown();
                        if (!breakdown) return <p>Loading...</p>;
                        return (
                            <>
                                <p>Orders with this {selectedItemDetail.type}: {breakdown.matchCount}</p>
                                <p>Percentage of total orders: {breakdown.percentage}%</p>
                            </>
                        );
                    })()}
                </div>
            )}
        </div>
    );
}
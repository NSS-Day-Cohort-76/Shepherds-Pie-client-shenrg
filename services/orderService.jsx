
export const GetAllOrders = () => {
    return fetch(`http://localhost:8088/orders`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }
        return res.json();
      })
      .then((data) => {
        // Log the data structure to check if it contains an array
        // console.log("Fetched orders data:", data);
        return data; // Assuming the result is directly the orders array or an object containing it
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }
  

  export const createOrder = (order) => {
    return fetch(`http://localhost:8088/orders`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json"
       },
      body: JSON.stringify(order),
    });
  };

export const getPizzasByOrderId = (orderId) => {
    return fetch(`http://localhost:8088/orders/${orderId}?_embed=pizzas`)
        .then(res => res.json())
}

export async function fetchPizzasWithToppingsAndCosts() {
  const [pizzasRes, pizzaToppingsRes, toppingsRes] = await Promise.all([
    fetch("http://localhost:8088/pizzas?_embed=pizzaToppings&_expand=size"),
    fetch("http://localhost:8088/pizzaToppings"),
    fetch("http://localhost:8088/toppings")
  ]);

  const pizzas = await pizzasRes.json();
  const pizzaToppings = await pizzaToppingsRes.json();
  const toppings = await toppingsRes.json();

  const getToppingCost = (toppingId) =>
    toppings.find(t => t.id === toppingId)?.cost || 0;

  return pizzas.map(pizza => {
    const toppingIds = pizzaToppings
      .filter(pt => pt.pizzaId === pizza.id)
      .map(pt => pt.toppingId);

    const toppingDetails = toppingIds.map(id =>
      toppings.find(t => t.id === id)
    ).filter(Boolean);

    const toppingsCost = toppingDetails.reduce((sum, t) => sum + (t.cost || 0), 0);

    return {
      ...pizza,
      toppings: toppingDetails,
      totalCost: (pizza.size?.baseCost || 0) + toppingsCost
    };
  });
}

export const deletePizza = (pizzaId) => {
  return fetch(`http://localhost:8088/pizzas/${pizzaId}`, {
      method: "DELETE",
  })
}

export const saveTip = (orderId, tip) => {
  return fetch(`http://localhost:8088/orders/${orderId}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
          tip: tip, // Update the tip property in the database
          totalCost: totalCost
      }),
  });
};

// export const saveTotalCost = (orderId, totalCost) => {
//   return fetch(`http://localhost:8088/orders/${orderId}`, {
//       method: "PATCH",
//       headers: {
//           "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//           totalCost: totalCost, // Update the totalCost property in the database
//       }),
//   });
// };

export const cancelOrder = async (id) => {
  return await fetch(`http://localhost:8088/orders/${id}`, {
      method: "DELETE",
  })
      .then((response) => {
          if (!response.ok) {
              throw new Error("Failed to delete the order.");
          }
          return response.json();
      });
};

export const updateOrderTotalCost = async (orderId, totalCost, tip) => {
  return await fetch(`http://localhost:8088/orders/${orderId}`, {
    method: "PATCH", // Use PATCH to update only the totalCost field
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ totalCost, tip}),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to update order total cost");
    }
    return response.json();
  });
};
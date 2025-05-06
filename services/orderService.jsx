// export const GetAllOrders = () => {
//     return fetch(`http://localhost:8088/orders`)  
//   }


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
        console.log("Fetched orders data:", data);
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
      }),
  });
};

export const cancelOrder = (orderId) => {
  return fetch(`http://localhost:8088/orders/${orderId}`, {
      method: "DELETE",
  })
      .then((response) => {
          if (!response.ok) {
              throw new Error("Failed to delete the order.");
          }
          return response.json();
      });
};
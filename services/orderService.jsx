export const getAllOrders = () => {
    return fetch(`http://localhost:8088/orders`).then((res => res.json() ))
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
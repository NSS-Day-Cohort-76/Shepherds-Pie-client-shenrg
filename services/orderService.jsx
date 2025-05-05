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
  


export const CreateOrder = () => {
    return <></>
}

export const getPizzasByOrderId = (orderId) => {
    return fetch(`http://localhost:8088/orders/${orderId}?_embed=pizzas`)
        .then(res => res.json())
}
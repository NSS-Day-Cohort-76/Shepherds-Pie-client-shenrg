export const GetAllOrders = () => {
    return fetch(`http://localhost:8088/orders`).then((res => res.json() ))
} 

export const CreateOrder = () => {
    return <></>
}

export const getPizzasByOrderId = (orderId) => {
    return fetch(`http://localhost:8088/orders/${orderId}?_embed=pizzas`)
        .then(res => res.json())
}
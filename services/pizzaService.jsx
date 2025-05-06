export const getSizes = () => {
    return fetch("http://localhost:8088/sizes").then(res => res.json())
}
export const getSauces = () => {
    return fetch("http://localhost:8088/sauces").then(res => res.json())
}
export const getCheeses = () => {
    return fetch("http://localhost:8088/cheeses").then(res => res.json())
}
export const getToppings = () => {
    return fetch("http://localhost:8088/toppings").then(res => res.json())
}

export const addPizzas = (pizzaToSave) => {
    return fetch("http://localhost:8088/pizzas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(pizzaToSave),
    }) 
}

export const addPizzaTopping = (pizzaTopping) => {
    return fetch("http://localhost:8088/pizzaToppings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(pizzaTopping),
    })
}

export const GetPizzasWithToppings = async () => {
    try {
        // Fetch pizzas and pizzaToppings from the database
        const pizzasResponse = await fetch("http://localhost:8088/pizzas");
        const pizzaToppingsResponse = await fetch("http://localhost:8088/pizzaToppings");

        const pizzas = await pizzasResponse.json();
        const pizzaToppings = await pizzaToppingsResponse.json();

        // Embed toppings into each pizza
        const pizzasWithToppings = pizzas.map((pizza) => {
            const toppings = pizzaToppings
                .filter((topping) => topping.pizzaId === pizza.id)
                .map((topping) => topping.toppingId); // Extract topping IDs
            return { ...pizza, toppings }; // Add toppings array to the pizza
        });

        return pizzasWithToppings;
    } catch (error) {
        console.error("Error fetching pizzas with toppings:", error);
        return [];
    }
};
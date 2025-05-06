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

export const getPizzaById = (pizzaId) => {
    return fetch(`http://localhost:8088/pizzas/${pizzaId}?_embed=pizzaToppings&_expand=size&_expand=sauce&_expand=cheese`)
    .then(res => res.json())
}

export const updatePizza = (pizzaId, pizzaObj) => {
    return fetch(`http://localhost:8088/pizzas/${pizzaId}`,{
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(pizzaObj)  
    })
}

export const updatePizzaToppings = (pizzaId, toppingIds) => {
    return fetch(`http://localhost:8088/pizzaToppings?pizzaId=${pizzaId}`)
      .then(res => res.json())
      .then(existingToppings => {
        const deletePromises = existingToppings.map(t =>
          fetch(`http://localhost:8088/pizzaToppings/${t.id}`, { method: "DELETE" })
        )
        return Promise.all(deletePromises)
      })
      .then(() => {
        const addPromises = toppingIds.map(tid =>
          fetch(`http://localhost:8088/pizzaToppings`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ pizzaId, toppingId: tid })
          })
        )
        return Promise.all(addPromises)
      })
  }
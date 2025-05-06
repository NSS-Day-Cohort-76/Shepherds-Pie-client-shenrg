import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getCheeses, getPizzaById, getSauces, getSizes, getToppings, updatePizza, updatePizzaToppings } from "../../services/pizzaService"



export const EditPizza = () => {
    const { pizzaId, orderId } = useParams()
    const navigate = useNavigate()

    const [pizza, setPizza] = useState({
        sizeId: 0,
        sauceId: 0,
        cheeseId: 0,
        toppingIds: []
    })

    const [sizes, setSizes] = useState([])
    const [sauces, setSauces] = useState([])
    const [cheeses, setCheeses] = useState([])
    const [toppings, setToppings] = useState([])

    useEffect(() => {
        getPizzaById(pizzaId).then((pizzaData) => {
            setPizza({
                sizeId: pizzaData.sizeId,
                sauceId: pizzaData.sauceId,
                cheeseId: pizzaData.cheeseId,
                toppingIds: pizzaData.toppings.map(top => top.id)
            })
        })

        getSizes().then(setSizes)
        getSauces().then(setSauces)
        getCheeses().then(setCheeses)
        getToppings().then(setToppings)

    }, [pizzaId])

    const handleToppingChange = (toppingId) => {
        setPizza((prev) => {
            const alreadySelected = prev.toppingIds.includes(toppingId)
            const updated = alreadySelected
                ? prev.toppingIds.filter(id => id !== toppingId)
                : [...prev.toppingIds, toppingId]
            return { ...prev, toppingIds: updated }
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const updatedPizza = {
            id: pizzaId,
            orderId: parseInt(orderId),
            sizeId: pizza.sizeId,
            sauceId: pizza.sauceId,
            cheeseId: pizza.cheeseId
        }
        updatePizza(pizzaId, updatedPizza)
            .then(() => updatePizzaToppings(pizzaId, pizza.toppingIds))
            .then(() => {
                alert("Pizza updated!")
                navigate(`/list/${orderId}`)
            })
    }
    return (
        <form className="add-pizza-form" onSubmit={handleSubmit}>
            <h2>Edit Pizza</h2>
            <fieldset>
                <legend>Size</legend>
                {sizes.map(size => (
                    <label key={size.id}>
                        <input
                            type="radio"
                            name="size"
                            value={size.id}
                            checked={pizza.sizeId === size.id}
                            onChange={(e) => setPizza({ ...pizza, sizeId: parseInt(e.target.value) })}
                        />
                        {size.name} ({size.size}" - ${size.baseCost})
                    </label>
                ))}
            </fieldset>
            <fieldset>
                <label>Sauce:</label>
                <select
                    value={pizza.sauceId}
                    onChange={(e) => setPizza({ ...pizza, sauceId: parseInt(e.target.value) })}
                >
                    <option value={0}>Choose a sauce</option>
                    {sauces.map(sauce => (
                        <option key={sauce.id} value={sauce.id}>{sauce.name}</option>
                    ))}
                </select>
            </fieldset>

            <fieldset>
                <label>Cheese:</label>
                <select
                    value={pizza.cheeseId}
                    onChange={(e) => setPizza({ ...pizza, cheeseId: parseInt(e.target.value) })}
                >
                    <option value={0}>Choose a cheese</option>
                    {cheeses.map(cheese => (
                        <option key={cheese.id} value={cheese.id}>{cheese.name}</option>
                    ))}
                </select>
            </fieldset>

            <fieldset>
                <legend>Toppings</legend>
                {toppings.map(topping => (
                    <label key={topping.id}>
                        <input
                            type="checkbox"
                            value={topping.id}
                            checked={pizza.toppingIds.includes(topping.id)}
                            onChange={() => handleToppingChange(topping.id)}
                        />
                        {topping.name} (+${topping.cost.toFixed(2)})
                    </label>
                ))}
            </fieldset>

            <div className="button-group">
                <button type="submit">Update Pizza</button>
                <button type="button" onClick={() => navigate(`/list`)}>Cancel</button>
            </div>
        </form>
    )
}
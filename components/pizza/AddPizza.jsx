
// Looking at ticket #4 / frames #3, #5

import { useEffect, useState } from "react"
import { addPizzas, addPizzaTopping, getCheeses, getSauces, getSizes, getToppings } from "../../services/pizzaService"
import './AddPizza.css'
import { useNavigate, useParams } from "react-router-dom"

// The Add Pizza component will be reachable from frame #2 and frame #5. When a user is first creating their order, they will be directed here after filling out the 
// customer info. If they click on the 'add pizza' button from the order details page (frame 5) then they will also be directed back to this page. 

// Radio inputs for size, sauce, cheese, and toppings. Text input for any custom notes for that specific pizza. 
// Needs a window alert to ensure all fields have been filled out (none would also be a good option for a button). 

// Should be an "Add Pizza" button that adds completed pizza option to state, but does not finalize the order.

// For *Edit Pizza* -> they will be directed to frame #7 where they can modify all of the selections for their pizza. Also needs a window alert  
export const AddPizza = () => {

    const {orderId} = useParams()
    const navigate = useNavigate()

    const initialPizzaState = {
        sizeId: 0,
        sauceId: 0,
        cheeseId: 0,
        toppingIds: []
    }
    
    const [sizes, setSizes] = useState([])
    const [sauces, setSauces] = useState([])
    const [cheeses, setCheeses] = useState([])
    const [toppings, setToppings] = useState([])

    const [pizza, setPizza] = useState(initialPizzaState)

    useEffect(()=>{
        getSizes().then(setSizes)
    },[])
    
    useEffect(()=>{
        getSauces().then(setSauces)
    },[])
    
    useEffect(()=>{
        getCheeses().then(setCheeses)
    },[])

    useEffect(()=>{
        getToppings().then(setToppings)
    },[])

    const handleToppingChange = (toppingId) => {
        setPizza((prev) => {
            const alreadySelected = prev.toppingIds.includes(toppingId)

            const updatedToppings = alreadySelected 
                ? prev.toppingIds.filter(id => id !== toppingId)
                : [...prev.toppingIds, toppingId]
            return {...prev, toppingIds: updatedToppings} 
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const pizzaToSave = {
            orderId: parseInt(orderId),
            sizeId: pizza.sizeId,
            sauceId: pizza.sauceId,
            cheeseId: pizza.cheeseId,
        }

        addPizzas(pizzaToSave)
            .then(res => res.json())
            .then((savedPizza) => {
                const toppingPromises = pizza.toppingIds.map(tid =>
                addPizzaTopping({
                    pizzaId: savedPizza.id,
                    toppingId: tid
                })
            )
            return Promise.all(toppingPromises)
            })
            .then(()=>{
                alert('Pizza added!')
                setPizza(initialPizzaState)
            })
    }

    return (  
        <form className="add-pizza-form" onSubmit={handleSubmit}>
            <h2 className>Add Pizza</h2>

            <fieldset>
                <legend>Size</legend>
                {sizes.map(size => (
                <div key={size.id} className="form-group">
                        <input
                            type="radio"
                            name="size"
                            value={size.id}
                            className="form-control"
                            checked={pizza.sizeId === size.id}
                            onChange={(e) => setPizza({...pizza, sizeId: parseInt(e.target.value)})}
                        />
                     {size.name} ({size.size}" - ${size.baseCost}) 
                </div>
                ))}
            </fieldset>
            <fieldset>
                <label>Sauce:</label>
                    <select
                        
                        value={pizza.sauceId}
                        onChange={(e)=> setPizza({...pizza, sauceId: parseInt(e.target.value) })}
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
                        onChange={(e) => setPizza({...pizza, cheeseId: parseInt(e.target.value)})}
                        >
                        <option value={0}>Choose a cheese</option>
                        {cheeses.map(cheese => (
                            <option key={cheese.id} value={cheese.id}>{cheese.name}</option>
                        ))}    
                    </select>
            </fieldset>
            <fieldset>
                <legend>Toppings</legend>
                <div>
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
                </div>
            </fieldset>

            <div className="button-group">
                <button type="submit">
                    Add Pizza
                </button>
                <button type="button" onClick={() => navigate(`/list`)}>Back to Orders</button>
            </div>        
        </form>
    )
} 
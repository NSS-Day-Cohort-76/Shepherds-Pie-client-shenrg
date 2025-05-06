export const PizzaCard = ({ pizza, index, onEdit, onDelete }) => {

const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount)
    }

    return (
        <div key={pizza.id} className="orders">
            <div className="order-details">
                <p>Pizza #{index + 1}</p>
            </div>
            <div className="btn-container">
                <button 
                    onClick={() => onEdit(pizza.id)}
                    className="btn btn-edit"
                >
                    Edit
                </button>
                <button 
                    onClick={() => onDelete(pizza.id)}
                    className="btn btn-delete"
                >
                    Delete
                </button>
            </div>
        </div>
    )
}
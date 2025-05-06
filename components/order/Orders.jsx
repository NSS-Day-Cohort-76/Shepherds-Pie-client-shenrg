import { Link } from "react-router-dom"

export const Orders = ({ order }) => {
    return (
        <section className="order">
            <Link to={`/list/${order.id}`}>
                <header className="order-info">Order #{order.id}</header>
                <div>{order.orderStatus}</div>
                <footer>
                    <div>
                        <div className="order-info">Customer Name</div>
                        <div>{order.customerName}</div>
                    </div>
                </footer>
            </Link>
        </section>
    )
}
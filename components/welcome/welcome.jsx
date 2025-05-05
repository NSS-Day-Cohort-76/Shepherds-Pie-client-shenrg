import { useNavigate } from "react-router-dom";
import "./welcome.css";
// Frame #1

// Home page of the application, view you see as soon as you log in.
// Needs a button for starting the order.

export const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <h1>
        <span>Welcome to</span>
        <span>Shepherds Pie</span>
      </h1>
      <div>The best pizza in Nashville</div>
      <div>
        <button
          className="btn-primary"
          onClick={() => {
            navigate("/order/StartOrder");
          }}
        >
          Create Order
        </button>
      </div>
    </div>
  );
};

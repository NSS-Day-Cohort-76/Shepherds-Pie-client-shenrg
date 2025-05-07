import { useNavigate } from "react-router-dom";
import "./welcome.css";

export const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      <h1>
        <span>Welcome to</span>
        <span>Shepherds Pie</span>
      </h1>
      <div>The best pizza in the world</div>
      <div>
        <button
          className="btn-primary"
          onClick={() => {
            navigate("/StartOrder");
          }}
        >
          Start Order
        </button>
      </div>
      {/* Add the pizza image */}
      <div className="pizza-image-container">
        <img
          src="/https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'" // Replace with the actual path to your image
          alt="Delicious Pizza"
          className="pizza-image"
        />
      </div>
    </div>
  );
};

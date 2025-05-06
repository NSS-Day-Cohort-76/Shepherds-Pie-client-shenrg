import "./App.css";
import { Route, Routes, Outlet } from "react-router-dom";
import { Login } from "../components/auth/Login.jsx";
import { ApplicationViews } from "../components/views/ApplicationViews.jsx";


export const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<ApplicationViews />} />
    </Routes>
  );
};

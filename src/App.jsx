import { Route, Routes } from "react-router-dom"
import { EmployeeViews } from "../components/views/EmployeeViews.jsx"
import { Login } from "../components/auth/Login.jsx"

export const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/*" element={<EmployeeViews />} />
    </Routes>
  )
}
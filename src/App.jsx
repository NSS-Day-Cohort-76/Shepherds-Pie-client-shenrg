import { EmployeeNav } from "../components/nav/EmployeeNav.jsx";
//import { OrdersList } from "../components/order/OrderList.jsx";
import { Welcome } from "../components/welcome/welcome.jsx";
import "./App.css";
import { Route, Routes, Outlet } from "react-router-dom"
import { EmployeeViews } from "../components/views/EmployeeViews.jsx";
import { Login } from "../components/auth/Login.jsx";

// import { Authorized } from "./views/Authorized"
// import { ApplicationViews } from "./views/ApplicationViews"


export const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
    
      <Route path="*" 
      element={
          <EmployeeViews />
      }
      />
    </Routes>
  )

}


// export const App = () => {
//   return (
//     <div>
//     <EmployeeNav />
//     <Welcome />
//     </div>
    
//   )
// }
// <Routes>
//   <Route path="/login" element={<Login />} />

//   <Route path="*" element={
//     <Authorized>
//       <ApplicationViews />
//       <Application />
//     </Authorized>
//   }
//   />
// </Routes>
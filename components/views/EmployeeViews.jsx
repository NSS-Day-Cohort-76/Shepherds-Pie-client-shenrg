// Can see everything minus the other employee info pages. If a regular employee tries to navigate to that page, they should
// see an error code and be redirected back to the main page. This functionality will probably take place somewhere else.

import { Outlet, Route, Routes } from "react-router-dom";
import { EmployeeList } from "../employees/EmployeeList.jsx";
import { EmployeeNav } from "../nav/EmployeeNav.jsx";
import { Welcome } from "../welcome/welcome.jsx";
import { OrdersList } from "../order/OrdersList.jsx";
import { OrderForm } from "../order/OrderForm.jsx";
import { SalesReport } from "../sales/SalesReport.jsx";
import { OrderDetails } from "../order/OrderDetails.jsx";
import { EmployeeDetails } from "../employees/EmployeeDetails.jsx";

export const EmployeeViews = ({}) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <EmployeeNav />
            <Outlet />
          </>
        }
      >
        <Route index element={<Welcome />} />
        <Route path="list" element={<OrdersList />} />
        <Route path="/list/:orderId" element={<OrderDetails />} />
        <Route path="employees" element={<EmployeeList />} />
        <Route path="employees/:employeeId" element={<EmployeeDetails />} />
        <Route path="sales" element={<SalesReport />} />
        <Route path="StartOrder" element={<OrderForm />} />
      </Route>
    </Routes>
  );
};

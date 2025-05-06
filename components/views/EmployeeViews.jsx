
// Can see everything minus the other employee info pages. If a regular employee tries to navigate to that page, they should
// see an error code and be redirected back to the main page. This functionality will probably take place somewhere else.  

import { Outlet, Route, Routes } from "react-router-dom"
import { EmployeeNav } from "../nav/EmployeeNav"
import { Welcome } from "../welcome/welcome"
import { OrdersList } from "../order/OrdersList"
import { EmployeeList } from "../employees/EmployeeList"
import { OrderDetails } from "../order/OrderDetails.jsx"
import { EmployeeDetails } from "../employees/EmployeeDetails.jsx"
// import { StartOrder } from "../order/StartOrder"

export const EmployeeViews = () => {
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
                {/* <Route path="StartOrder" element={<StartOrder />} /> */}
                <Route path="list">
                    <Route index element={<OrdersList />} />
                    <Route path=":orderId" element={<OrderDetails />} />
                </Route>
                <Route path="employees">
                    <Route index element={<EmployeeList />} />
                    <Route path="/employees/:employeeId" element={<EmployeeDetails />} />
                </Route>
            </Route>
        </Routes>
    )
}

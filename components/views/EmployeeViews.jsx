
// Can see everything minus the other employee info pages. If a regular employee tries to navigate to that page, they should
// see an error code and be redirected back to the main page. This functionality will probably take place somewhere else.  

import { Outlet, Route, Routes } from "react-router-dom"
import { EmployeeNav } from "../nav/EmployeeNav.jsx"
import { Welcome } from "../welcome/welcome.jsx"
import { OrdersList } from "../order/OrdersList.jsx"
import { EmployeeList } from "../employees/EmployeeList.jsx"


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
                <Route 
                path="list"
                element={<OrdersList />} />
                <Route path="employees" element={<EmployeeList />} />
                </Route>
        </Routes>
    )
} 
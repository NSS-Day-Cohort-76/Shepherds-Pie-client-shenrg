// PROBABLY NOT GOING TO USE, NO NEED FOR MULTIPLE VIEWS.. USE TERNARY CONDITIONAL RENDERING FOR isAdmin LATER ON..

// Will hold all views and incorporate functionality to determine if user is admin or employee

// import { useEffect, useState } from "react"
// import { AdminViews } from "./AdminViews.jsx"
// import { EmployeeViews } from "./EmployeeViews.jsx"


// export const ApplicationViews = () => {
//     const [currentUser, setCurrentUser] = useState({})

//     useEffect(() => {
//         const localShepherdUser = localStorage.getItem("shepherd_user")
//         const shepherdUserObj = JSON.parse(localShepherdUser)

//         setCurrentUser(shepherdUserObj)
//     }, [])

//     return currentUser.isAdmin ? (
//         <AdminViews currentUser={currentUser} />
//     ) : (
//         <EmployeeViews currentUser={currentUser} />
//     )
// } 
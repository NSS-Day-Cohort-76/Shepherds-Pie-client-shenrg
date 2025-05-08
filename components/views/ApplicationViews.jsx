import { useEffect, useState } from "react";
import { EmployeeViews } from "./EmployeeViews.jsx";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState(null); 

  useEffect(() => {
    const localShepherdUser = localStorage.getItem("shepherd_user");
    if (localShepherdUser) {
      const shepherdUserObj = JSON.parse(localShepherdUser);
      setCurrentUser(shepherdUserObj);
    }
  }, []);

  if (!currentUser) {
    return <div>Loading user...</div>;
  }

  return <EmployeeViews currentUser={currentUser} />;
};

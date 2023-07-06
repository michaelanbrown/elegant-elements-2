import React, { useState } from "react"

const UserContext = React.createContext();

function UserProvider({ children }) {
    const [currentCustomer, setCurrentCustomer] = useState(false)

  return (
    <UserContext.Provider value={{ currentCustomer, setCurrentCustomer }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
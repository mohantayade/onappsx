"use client"
import React from "react";
import LoginContext from "./loginContext";
 
const UserContextProvider =
    ({ children }) => {
        const [user, setUser] =
            React.useState(null)
        return (
            <LoginContext.Provider
                value={{ user, setUser }}>
                {children}
            </LoginContext.Provider>
        )
    }
 
export default UserContextProvider;